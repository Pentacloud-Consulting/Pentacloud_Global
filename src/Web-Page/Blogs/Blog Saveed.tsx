import { fetchBlogsForDomain } from './Dynamic Change Blog';

export interface PublicBlog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tag: string;
  tagColor: string;
  date: string;
  author: string;
  readTime: string;
  gradient: string;
  accent: string;
  featured: boolean;
  image: string;
  content?: string;
}

// Category → color map for visual variety
const CATEGORY_STYLES: Record<string, { tagColor: string; accent: string; gradient: string }> = {
  'Salesforce Consulting':     { tagColor: '#0070d2', accent: '#0070d2', gradient: 'from-[#EEF3FF] to-[#D4EEFF]' },
  'Salesforce Integration':    { tagColor: '#0284c7', accent: '#0284c7', gradient: 'from-[#E0F2FE] to-[#BAE6FD]' },
  'Salesforce Customization':  { tagColor: '#2563eb', accent: '#2563eb', gradient: 'from-[#EFF6FF] to-[#DBEAFE]' },
  'Salesforce Implementation': { tagColor: '#4f46e5', accent: '#4f46e5', gradient: 'from-[#EEF2FF] to-[#E0E7FF]' },
  'Salesforce Support':        { tagColor: '#0d9488', accent: '#0d9488', gradient: 'from-[#CCFBF1] to-[#99F6E4]' },
  'Salesforce Training':       { tagColor: '#059669', accent: '#059669', gradient: 'from-[#D1FAE5] to-[#A7F3D0]' },
  'Salesforce Marketing':      { tagColor: '#d97706', accent: '#d97706', gradient: 'from-[#FEF3C7] to-[#FDE68A]' },
  'Cloud Solution':            { tagColor: '#1A7FD4', accent: '#1A7FD4', gradient: 'from-[#E8F4FD] to-[#C8E6FA]' },
  'Web Development':           { tagColor: '#7c3aed', accent: '#7c3aed', gradient: 'from-[#F3F0FF] to-[#E0D4FF]' },
};

const DEFAULT_STYLE = { tagColor: '#1A7FD4', accent: '#1A7FD4', gradient: 'from-[#EEF3FF] to-[#D4EEFF]' };

export function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&#(\d+);/g, (_, dec) => {
      try { return String.fromCharCode(parseInt(dec, 10)); } catch { return _; }
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      try { return String.fromCharCode(parseInt(hex, 16)); } catch { return _; }
    })
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rdquo;/g, '”')
    .replace(/&ldquo;/g, '“')
    .replace(/&hellip;/g, '…');
}

function stripHtml(html: string): string {
  if (!html) return '';
  const text = html.replace(/<[^>]*>?/gm, '').trim();
  return decodeHtmlEntities(text);
}

function resolveCategory(wpCategories: any[], title: string): string {
  if (wpCategories.length > 0) {
    const name = wpCategories[0]?.name;
    if (name && name !== 'Blog' && name !== 'Uncategorized') {
      return name;
    }
  }

  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('integration')) return 'Salesforce Integration';
  if (lowerTitle.includes('customization')) return 'Salesforce Customization';
  if (lowerTitle.includes('implementation')) return 'Salesforce Implementation';
  if (lowerTitle.includes('support')) return 'Salesforce Support';
  if (lowerTitle.includes('training')) return 'Salesforce Training';
  if (lowerTitle.includes('marketing')) return 'Salesforce Marketing';
  if (lowerTitle.includes('cloud')) return 'Cloud Solution';

  return 'Salesforce Consulting';
}

function normalizeWpPost(post: any, index: number): PublicBlog {
  const title = post.title?.rendered ? stripHtml(post.title.rendered) : 'Untitled';
  const rawExcerpt = post.excerpt?.rendered ? stripHtml(post.excerpt.rendered) : '';
  const excerpt = rawExcerpt.slice(0, 160) + (rawExcerpt.length > 160 ? '...' : '');

  // Extract featured image from _embedded if present
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const image = featuredMedia?.source_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800';

  // Extract category dynamically
  const wpCategories = post._embedded?.['wp:term']?.[0] || [];
  const categoryName = resolveCategory(wpCategories, title);
  const style = CATEGORY_STYLES[categoryName] || DEFAULT_STYLE;

  // Extract author
  const authorName = post._embedded?.['author']?.[0]?.name || 'Pentacloud Team';

  // Format date
  let date = 'Recently';
  if (post.date) {
    const d = new Date(post.date);
    if (!isNaN(d.getTime())) {
      date = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
  }

  // Estimate read time based on content length
  const wordCount = post.content?.rendered ? stripHtml(post.content.rendered).split(/\s+/).length : 200;
  const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  return {
    id: String(post.id),
    slug: post.slug,
    title,
    excerpt,
    category: categoryName,
    tag: categoryName.toUpperCase(),
    tagColor: style.tagColor,
    date,
    author: authorName,
    readTime,
    gradient: style.gradient,
    accent: style.accent,
    featured: index === 0,
    image,
    content: post.content?.rendered || '',
  };
}

export async function fetchPublishedBlogs(customHost?: string): Promise<PublicBlog[]> {
  try {
    const posts = await fetchBlogsForDomain(customHost);
    if (!Array.isArray(posts)) return [];
    return posts.map((post, i) => normalizeWpPost(post, i));
  } catch (err) {
    console.error('Error fetching blogs dynamically:', err);
    return [];
  }
}
