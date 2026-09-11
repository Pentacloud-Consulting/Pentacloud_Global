import React, { useEffect } from 'react';
import { Calendar, Clock, User, MapPin, Phone, Mail, RefreshCw } from 'lucide-react';

export function BlogConvertedHTML({ blog }: { blog: any }) {

  // Robustly parses dd-mm-yyyy, yyyy-mm-dd, or ISO strings
  const parseDate = (raw: string | undefined | null, opts: Intl.DateTimeFormatOptions): string => {
    if (!raw) return '';
    let d: Date;
    // dd-mm-yyyy
    if (/^\d{2}-\d{2}-\d{4}$/.test(raw)) {
      const [dd, mm, yyyy] = raw.split('-');
      d = new Date(`${yyyy}-${mm}-${dd}`);
    } else {
      d = new Date(raw);
    }
    if (isNaN(d.getTime())) return raw; // fallback: show raw string
    return d.toLocaleDateString('en-US', opts);
  };
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const bar = document.getElementById('pc-pgbar');
      if (bar) { bar.style.width = scrolled + "%"; }
    };
    window.addEventListener('scroll', handleScroll);

    // Intercept links inside content to stay within Next.js
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      
      const href = target.getAttribute('href');
      if (href && (href.includes('pentacloud.in/') || href.includes('pentacloudconsulting.com/') || href.startsWith('/'))) {
        try {
          const urlObj = new URL(href, window.location.origin);
          const pathname = urlObj.pathname;
          
          // If it points to a post/blog slug, redirect inside Next.js
          if (pathname.length > 1 && !pathname.startsWith('/wp-') && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
            const parts = pathname.split('/').filter(Boolean);
            const slug = parts[parts.length - 1];
            if (slug) {
              e.preventDefault();
              window.location.href = `/blogs/${slug}`;
            }
          }
        } catch (err) {
          // ignore invalid URLs
        }
      }
    };

    const container = document.querySelector('.blog-rich-content');
    if (container) {
      container.addEventListener('click', handleLinkClick as any);

      // Dynamically group post card blocks (if Elementor inserted them as raw HTML)
      const postLinks = Array.from(container.querySelectorAll('a[href*="salesforce"], a[href*="blog"]'));
      const cards: HTMLElement[] = [];

      postLinks.forEach((a) => {
        const img = a.querySelector('img') || a.previousElementSibling?.querySelector('img') || a.parentElement?.querySelector('img');
        if (img) {
          // Identify card container
          let cardBox = (a.closest('figure') || a.parentElement) as HTMLElement;
          if (cardBox) {
            // Find corresponding title and learn more link below the image
            let nextEl = cardBox.nextElementSibling as HTMLElement;
            const titleEl = nextEl && (nextEl.tagName === 'H2' || nextEl.tagName === 'H3' || nextEl.tagName === 'H4' || nextEl.tagName === 'P' || nextEl.querySelector('a')) ? nextEl : null;
            let learnMoreEl = titleEl ? titleEl.nextElementSibling as HTMLElement : null;

            // Create unified clean card
            const newCard = document.createElement('div');
            newCard.className = 'pc-custom-blog-card';
            
            // Append image
            newCard.appendChild(cardBox.cloneNode(true));
            
            // Append title
            if (titleEl) {
              newCard.appendChild(titleEl.cloneNode(true));
              titleEl.style.display = 'none';
            }
            
            // Append learn more button
            if (learnMoreEl) {
              newCard.appendChild(learnMoreEl.cloneNode(true));
              learnMoreEl.style.display = 'none';
            }
            
            cardBox.style.display = 'none';
            cards.push(newCard);
          }
        }
      });

      if (cards.length > 0) {
        const gridWrapper = document.createElement('div');
        gridWrapper.className = 'elementor-grid-3cols-row';
        // Place the 3-card grid at the bottom of the article content, right above the CTA
        container.appendChild(gridWrapper);
        cards.forEach((c) => gridWrapper.appendChild(c));
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (container) {
        container.removeEventListener('click', handleLinkClick as any);
      }
    };
  }, []);

  const toggleFaq = (e: any) => {
    const btn = e.currentTarget;
    btn.classList.toggle('active');
    let content = btn.nextElementSibling;
    if (content.style.maxHeight) { 
        content.style.maxHeight = null; 
    } else { 
        content.style.maxHeight = content.scrollHeight + "px"; 
    }
  };

  return (
    <div className="pc-blog-wrapper-container font-sans" style={{ containerType: 'inline-size', containerName: 'pcblog' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Progress Bar Base Styling */
        #pc-pgbar-container {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 4px !important;
            background: transparent !important;
            z-index: 999999 !important;
        }
        #pc-pgbar {
            height: 100% !important;
            background: #0073e6 !important;
            width: 0%;
            transition: width 0.1s ease-out !important;
        }

        /* All-encompassing Reset & Variable Scope */
        .pc-blog-wrap {
            all: initial !important;
            display: block !important;
            font-family: 'Lora', Georgia, serif !important;
            background-color: #ffffff !important;
            color: #0f172a !important;
            line-height: 1.7 !important;
            font-size: 16px !important;
            -webkit-font-smoothing: antialiased !important;
            box-sizing: border-box !important;
            
            /* Custom Design System Tokens */
            --pc-blue-primary: #0073e6 !important;
            --pc-blue-dark: #0047b3 !important;
            --pc-blue-darker: #071530 !important;
            --pc-blue-light: #e6f2ff !important;
            --pc-blue-muted: #99c2ff !important;
            --pc-text-main: #0f172a !important;
            --pc-text-muted: #475569 !important;
            --pc-bg-white: #ffffff !important;
            --pc-bg-gray: #f8fafc !important;
            --pc-shadow-sm: 0 1px 3px rgba(0,0,0,0.05) !important;
            --pc-shadow-md: 0 4px 12px rgba(0, 115, 230, 0.08) !important;
            --pc-shadow-hover: 0 10px 24px rgba(0, 115, 230, 0.15) !important;
            --pc-radius: 12px !important;
        }

        .pc-blog-wrap *, .pc-blog-wrap *::before, .pc-blog-wrap *::after {
            box-sizing: border-box !important;
            transition: all 0.3s ease !important;
        }

        /* Typography Override Helpers */
        .pc-blog-wrap h1, .pc-blog-wrap h2, .pc-blog-wrap h3, .pc-blog-wrap h4, .pc-blog-wrap button, .pc-blog-wrap .pc-font-sans {
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        /* Hero Layout Module */
        .pc-hero {
            background: linear-gradient(135deg, var(--pc-blue-darker) 0%, var(--pc-blue-dark) 100%) !important;
            padding: 5rem 2rem 6rem 2rem !important;
            color: #ffffff !important;
            text-align: left !important;
            position: relative !important;
        }
        .pc-hero-inner {
            max-width: 1200px !important;
            margin: 0 auto !important;
        }
        .pc-breadcrumb {
            font-size: 0.85rem !important;
            color: rgba(255, 255, 255, 0.8) !important;
            margin-bottom: 1.5rem !important;
            font-weight: 500 !important;
        }
        .pc-category-pill {
            display: inline-block !important;
            background: #ffffff !important;
            color: var(--pc-blue-primary) !important;
            padding: 0.35rem 1rem !important;
            border-radius: 50px !important;
            font-size: 0.85rem !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            margin-bottom: 1.5rem !important;
            letter-spacing: 0.05em !important;
        }
        .pc-h1 {
            font-size: clamp(2rem, 4vw, 3.2rem) !important;
            font-weight: 800 !important;
            color: #ffffff !important;
            line-height: 1.2 !important;
            margin: 0 0 1.5rem 0 !important;
            letter-spacing: -0.02em !important;
        }
        .pc-meta-row {
            display: flex !important;
            flex-wrap: wrap !important;
            justify-content: space-between !important;
            gap: 1.5rem !important;
            font-size: 0.95rem !important;
            color: rgba(255, 255, 255, 0.85) !important;
            margin-bottom: 3rem !important;
        }
        .pc-meta-left {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 1.5rem !important;
            align-items: center !important;
        }
        .pc-meta-updated {
            display: flex !important;
            align-items: center !important;
            gap: 0.5rem !important;
            font-size: 0.85rem !important;
            color: rgba(255, 255, 255, 0.65) !important;
            border-left: 1px solid rgba(255,255,255,0.2) !important;
            padding-left: 1.5rem !important;
            white-space: nowrap !important;
        }
        .pc-meta-item {
            display: flex !important;
            align-items: center !important;
            gap: 0.5rem !important;
        }

        /* Image Upload Box Module */
        @keyframes imageReveal {
            0% { opacity: 0; transform: scale(0.97) translateY(10px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        .pc-img-box {
            position: relative !important;
            width: 100% !important;
            border-radius: var(--pc-radius) !important;
            overflow: hidden !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            min-height: 550px !important;
            background: rgba(255,255,255,0.05) !important;
            border: 2px dashed rgba(255,255,255,0.4) !important;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease !important;
            animation: imageReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
            will-change: transform, opacity !important;
        }
        .pc-img-box:hover {
            transform: translateY(-6px) !important;
            box-shadow: 0 20px 40px rgba(0,0,0,0.25) !important;
        }
        .pc-img-box.pc-light-box {
            background: var(--pc-bg-gray) !important;
            border: 2px dashed var(--pc-blue-muted) !important;
            margin: 2.5rem 0 !important;
        }
        .pc-uploaded {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .pc-img-box:hover .pc-uploaded {
            transform: scale(1.04) !important;
        }
        .pc-img-box.has-img {
            border: none !important;
        }

        /* Stats Strip Module (Light Theme, Compact 1-line Grid) */
        .pc-stats-strip {
            max-width: 1200px !important;
            margin: -2.5rem auto 0 auto !important;
            padding: 0 2rem !important;
            position: relative !important;
            z-index: 20 !important;
        }
        .pc-stats-grid {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-around !important;
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 16px !important;
            box-shadow: 0 4px 20px rgba(0, 115, 230, 0.08), 0 1px 3px rgba(0,0,0,0.05) !important;
            padding: 1rem 1.5rem !important;
            gap: 1rem !important;
        }
        .pc-stat-item {
            flex: 1 !important;
            text-align: center !important;
            border-right: 1px solid #e2e8f0 !important;
            padding: 0.25rem 0.5rem !important;
        }
        .pc-stat-item:last-child {
            border-right: none !important;
        }
        .pc-stat-num {
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            font-size: 1.35rem !important;
            font-weight: 800 !important;
            color: #0073e6 !important;
            margin-bottom: 0.15rem !important;
            line-height: 1.1 !important;
        }
        .pc-stat-label {
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            font-size: 0.78rem !important;
            color: #64748b !important;
            font-weight: 600 !important;
            line-height: 1.2 !important;
        }

        /* Core Layout Architecture */
        .pc-layout {
            max-width: 1200px !important;
            margin: 0 auto !important;
            padding: 4rem 2rem !important;
            display: grid !important;
            grid-template-columns: 1fr 340px !important;
            gap: 4rem !important;
        }

        /* Left Column Structure */
        .pc-content-col {
            min-width: 0 !important;
        }

        /* Table of Contents Setup */
        .pc-toc-card {
            background: var(--pc-bg-gray) !important;
            border-left: 4px solid var(--pc-blue-primary) !important;
            border-radius: 4px var(--pc-radius) var(--pc-radius) 4px !important;
            padding: 2rem !important;
            margin-bottom: 3rem !important;
        }
        .pc-toc-title {
            font-size: 1.25rem !important;
            font-weight: 700 !important;
            color: var(--pc-blue-darker) !important;
            margin: 0 0 1rem 0 !important;
        }
        .pc-toc-list {
            list-style: none !important;
            padding: 0 !important;
            margin: 0 !important;
        }
        .pc-toc-item {
            margin-bottom: 0.75rem !important;
        }
        .pc-toc-item:last-child {
            margin-bottom: 0 !important;
        }
        .pc-toc-link {
            color: var(--pc-blue-primary) !important;
            text-decoration: none !important;
            font-weight: 500 !important;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            font-size: 1rem !important;
        }
        .pc-toc-link:hover {
            color: var(--pc-blue-dark) !important;
            text-decoration: underline !important;
        }

        /* Body Formatting Directives */
        .pc-article-body h2 {
            font-size: 1.85rem !important;
            color: var(--pc-blue-darker) !important;
            font-weight: 800 !important;
            margin-top: 3rem !important;
            margin-bottom: 1.25rem !important;
            line-height: 1.3 !important;
            letter-spacing: -0.01em !important;
        }
        .pc-article-body h3 {
            font-size: 1.4rem !important;
            color: var(--pc-blue-dark) !important;
            font-weight: 700 !important;
            margin-top: 2.25rem !important;
            margin-bottom: 1rem !important;
            line-height: 1.3 !important;
        }
        .pc-article-body p {
            font-size: 1.1rem !important;
            color: var(--pc-text-main) !important;
            margin: 0 0 1.5rem 0 !important;
        }
        .pc-article-body ul {
            margin: 0 0 1.5rem 0 !important;
            padding-left: 1.5rem !important;
            list-style-type: disc !important;
        }
        .pc-article-body li {
            font-size: 1.1rem !important;
            color: var(--pc-text-main) !important;
            margin-bottom: 0.5rem !important;
        }

        /* Universal WordPress / Elementor Posts Grid (Forced 1 Horizontal Line, Small & Responsive) */
        .blog-rich-content .elementor-grid-3cols-row,
        .blog-rich-content .elementor-posts-container,
        .blog-rich-content .elementor-grid,
        .blog-rich-content .jnews_block_container,
        .blog-rich-content .jeg_posts,
        .blog-rich-content .wp-block-columns,
        .blog-rich-content .elementor-widget-posts .elementor-widget-container {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            justify-content: space-between !important;
            align-items: stretch !important;
            gap: 0.75rem !important;
            margin: 2rem 0 !important;
            width: 100% !important;
            overflow-x: auto !important;
            padding: 0.25rem 0 !important;
            -webkit-overflow-scrolling: touch !important;
        }

        .blog-rich-content .elementor-grid-3cols-row > *,
        .blog-rich-content .pc-custom-blog-card,
        .blog-rich-content .elementor-post,
        .blog-rich-content .jeg_post,
        .blog-rich-content .wp-block-column,
        .blog-rich-content .elementor-posts-container > article,
        .blog-rich-content .elementor-grid > article {
            flex: 1 1 0% !important;
            min-width: 140px !important;
            display: flex !important;
            flex-direction: column !important;
            background: #ffffff !important;
            border-radius: 12px !important;
            overflow: hidden !important;
            box-shadow: 0 3px 12px rgba(0, 115, 230, 0.06), 0 1px 3px rgba(0,0,0,0.03) !important;
            border: 1px solid #e2e8f0 !important;
            padding: 0 !important;
            margin: 0 !important;
            width: auto !important;
            transition: all 0.3s ease !important;
            align-self: stretch !important;
        }

        .blog-rich-content .pc-custom-blog-card * {
            box-sizing: border-box !important;
        }

        .blog-rich-content .pc-custom-blog-card:hover,
        .blog-rich-content .elementor-grid-3cols-row > *:hover {
            transform: translateY(-3px) !important;
            box-shadow: 0 8px 20px rgba(0, 115, 230, 0.12) !important;
            border-color: #0073e6 !important;
        }

        /* Compact Image Box */
        .blog-rich-content .pc-custom-blog-card figure,
        .blog-rich-content .pc-custom-blog-card > div:first-child,
        .blog-rich-content .pc-custom-blog-card > a:first-child,
        .blog-rich-content .elementor-post__thumbnail,
        .blog-rich-content .jeg_thumb,
        .blog-rich-content article figure,
        .blog-rich-content article a:first-child {
            width: 100% !important;
            height: 120px !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: hidden !important;
            background: #f8fafc !important;
        }

        .blog-rich-content .pc-custom-blog-card img,
        .blog-rich-content .elementor-post__thumbnail img,
        .blog-rich-content .jeg_thumb img,
        .blog-rich-content article img {
            width: 100% !important;
            height: 120px !important;
            object-fit: cover !important;
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            transition: transform 0.4s ease !important;
        }

        .blog-rich-content .pc-custom-blog-card:hover img,
        .blog-rich-content .elementor-grid-3cols-row > *:hover img {
            transform: scale(1.04) !important;
        }

        /* Fixed-Height Uniform Title Box (Ensures complete title text is 100% visible & line-aligned) */
        .blog-rich-content .pc-custom-blog-card h2,
        .blog-rich-content .pc-custom-blog-card h3,
        .blog-rich-content .pc-custom-blog-card h4,
        .blog-rich-content .pc-custom-blog-card p,
        .blog-rich-content .elementor-post__title,
        .blog-rich-content .jeg_post_title,
        .blog-rich-content article h3,
        .blog-rich-content article h4 {
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            font-size: 0.76rem !important;
            font-weight: 700 !important;
            color: #0073e6 !important;
            line-height: 1.25 !important;
            padding: 0.5rem 0.5rem 0.25rem 0.5rem !important;
            margin: 0 !important;
            text-decoration: none !important;
            height: 3.8rem !important;
            min-height: 3.8rem !important;
            max-height: 3.8rem !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 3 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            transition: color 0.2s ease !important;
        }

        /* Bottom "Learn More" Link - Fixed Straight Line across all cards */
        .blog-rich-content .pc-custom-blog-card a:last-child,
        .blog-rich-content .elementor-post__read-more,
        .blog-rich-content article a:last-child {
            display: flex !important;
            align-items: center !important;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            font-size: 0.78rem !important;
            font-weight: 700 !important;
            color: #0073e6 !important;
            padding: 0.5rem 0.5rem !important;
            margin-top: auto !important;
            border-top: 1px solid #f1f5f9 !important;
            text-decoration: none !important;
            background: #ffffff !important;
            transition: all 0.2s ease !important;
        }

        .blog-rich-content .pc-custom-blog-card a:last-child:hover,
        .blog-rich-content .elementor-post__read-more:hover,
        .blog-rich-content article a:last-child:hover {
            background: #f0f7ff !important;
            color: #0047b3 !important;
        }

        /* Dynamic Typography Blocks */
        .pc-callout {
            background: var(--pc-blue-light) !important;
            border-radius: var(--pc-radius) !important;
            padding: 1.75rem !important;
            margin: 2.5rem 0 !important;
        }
        .pc-callout-title {
            font-size: 1.15rem !important;
            font-weight: 700 !important;
            color: var(--pc-blue-primary) !important;
            margin: 0 0 0.5rem 0 !important;
        }
        .pc-callout-desc {
            font-size: 1.05rem !important;
            color: var(--pc-text-main) !important;
            margin: 0 !important;
            font-style: italic !important;
        }

        /* Integrated In-Content CTA Module */
        .pc-mid-cta {
            background: var(--pc-blue-primary) !important;
            border-radius: var(--pc-radius) !important;
            padding: 3rem 2.5rem !important;
            color: #ffffff !important;
            text-align: center !important;
            margin: 3.5rem 0 !important;
            box-shadow: var(--pc-shadow-md) !important;
        }
        .pc-mid-cta .pc-mid-cta-h3 {
            font-size: 1.75rem !important;
            font-weight: 800 !important;
            color: #ffffff !important;
            margin: 0 0 1rem 0 !important;
        }
        .pc-mid-cta .pc-mid-cta-p {
            font-size: 1.1rem !important;
            color: rgba(255, 255, 255, 0.9) !important;
            max-width: 650px !important;
            margin: 0 auto 2rem auto !important;
        }
        .pc-mid-cta .pc-mid-cta-btn {
            display: inline-block !important;
            background: #ffffff !important;
            color: var(--pc-blue-primary) !important;
            padding: 1rem 2.5rem !important;
            border-radius: 50px !important;
            font-weight: 700 !important;
            text-decoration: none !important;
            font-size: 1rem !important;
            box-shadow: 0 4px 14px rgba(0,0,0,0.1) !important;
        }
        .pc-mid-cta-btn:hover {
            transform: scale(1.05) !important;
            box-shadow: 0 6px 20px rgba(0,0,0,0.15) !important;
        }

        /* Structured FAQ Framework */
        .pc-faq-section {
            margin-top: 4rem !important;
            border-top: 1px solid var(--pc-blue-light) !important;
            padding-top: 3rem !important;
        }
        .pc-faq-header {
            font-size: 1.85rem !important;
            color: var(--pc-blue-darker) !important;
            font-weight: 800 !important;
            margin: 0 0 2rem 0 !important;
        }
        .pc-faq-item {
            background: #ffffff !important;
            border: 1px solid var(--pc-blue-light) !important;
            border-radius: var(--pc-radius) !important;
            margin-bottom: 1rem !important;
            overflow: hidden !important;
        }
        .pc-faq-btn {
            width: 100% !important;
            background: none !important;
            border: none !important;
            text-align: left !important;
            padding: 1.25rem 1.5rem !important;
            font-size: 1.1rem !important;
            font-weight: 700 !important;
            color: var(--pc-blue-dark) !important;
            cursor: pointer !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            gap: 1rem !important;
        }
        .pc-faq-btn::after {
            content: "＋" !important;
            font-size: 1.2rem !important;
            color: var(--pc-blue-primary) !important;
            flex-shrink: 0 !important;
        }
        .pc-faq-btn.active::after {
            content: "－" !important;
        }
        .pc-faq-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s cubic-bezier(0, 1, 0, 1) !important;
        }
        .pc-faq-inner {
            padding: 0 1.5rem 1.5rem 1.5rem !important;
            font-size: 1.05rem !important;
            color: var(--pc-text-muted) !important;
            line-height: 1.6 !important;
        }

        /* Right Column Framework (Sticky Sidebar) */
        .pc-sidebar-col {
            position: relative !important;
        }
        .pc-sidebar-sticky {
            position: -webkit-sticky !important;
            position: sticky !important;
            top: 2rem !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 2rem !important;
        }
        .pc-side-card {
            background: #ffffff !important;
            border: 1px solid var(--pc-blue-light) !important;
            border-radius: var(--pc-radius) !important;
            box-shadow: var(--pc-shadow-sm) !important;
            overflow: hidden !important;
        }
        
        /* Sidebar Variant One: Form / Lead Box */
        .pc-side-lead-header {
            background: var(--pc-blue-primary) !important;
            padding: 1.75rem 1.5rem !important;
            color: #ffffff !important;
        }
        .pc-side-lead-h4 {
            font-size: 1.3rem !important;
            font-weight: 700 !important;
            margin: 0 0 0.5rem 0 !important;
            color: #ffffff !important;
        }
        .pc-side-lead-tag {
            font-size: 0.9rem !important;
            opacity: 0.9 !important;
            margin: 0 !important;
        }
        .pc-side-lead-body {
            padding: 1.5rem !important;
        }
        .pc-contact-info-list {
            margin-bottom: 1.5rem !important;
        }
        .pc-contact-info-item {
            display: flex !important;
            align-items: flex-start !important;
            gap: 0.75rem !important;
            font-size: 0.95rem !important;
            color: var(--pc-text-main) !important;
            margin-bottom: 1rem !important;
        }
        .pc-contact-info-item:last-child {
            margin-bottom: 0 !important;
        }
        .pc-contact-icon {
            font-size: 1.1rem !important;
            flex-shrink: 0 !important;
        }
        .pc-side-btn {
            display: block !important;
            width: 100% !important;
            background: var(--pc-blue-primary) !important;
            color: #ffffff !important;
            text-align: center !important;
            padding: 0.85rem 1.2rem !important;
            border-radius: 8px !important;
            font-weight: 700 !important;
            text-decoration: none !important;
            font-size: 1rem !important;
            border: none !important;
            cursor: pointer !important;
            box-shadow: var(--pc-shadow-sm) !important;
        }
        .pc-side-btn:hover {
            background: var(--pc-blue-dark) !important;
            box-shadow: var(--pc-shadow-md) !important;
        }

        /* Sidebar Variant Two: Navigation Matrix */
        .pc-side-nav-header {
            padding: 1.5rem 1.5rem 1rem 1.5rem !important;
            border-bottom: 1px solid var(--pc-blue-light) !important;
        }
        .pc-side-nav-h4 {
            font-size: 1.15rem !important;
            font-weight: 700 !important;
            color: var(--pc-blue-darker) !important;
            margin: 0 !important;
        }
        .pc-side-nav-list {
            list-style: none !important;
            padding: 0 !important;
            margin: 0 !important;
        }
        .pc-side-nav-item a {
            display: block !important;
            padding: 1rem 1.5rem !important;
            color: var(--pc-text-main) !important;
            text-decoration: none !important;
            font-weight: 600 !important;
            font-size: 0.95rem !important;
            border-bottom: 1px solid var(--pc-bg-gray) !important;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }
        .pc-side-nav-item:last-child a {
            border-bottom: none !important;
        }
        .pc-side-nav-item a:hover {
            background: var(--pc-blue-light) !important;
            color: var(--pc-blue-primary) !important;
            transform: translateX(5px) !important;
        }

        /* Responsive Breakpoints Implementation */
        @container pcblog (max-width: 1024px) {
            .pc-layout {
                grid-template-columns: 1fr !important;
                gap: 3rem !important;
                padding: 3rem 1.5rem !important;
            }
            .pc-sidebar-sticky {
                position: static !important;
                display: grid !important;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
                gap: 2rem !important;
            }
        }

        @container pcblog (max-width: 767px) {
            .pc-h1 {
                font-size: clamp(1.75rem, 6vw, 2.25rem) !important;
            }
            .pc-hero {
                padding: 2.5rem 1rem 3.5rem 1rem !important;
            }
            .pc-breadcrumb, .pc-category-pill {
                font-size: 0.75rem !important;
            }
            .pc-meta-row {
                margin-bottom: 2rem !important;
                gap: 0.75rem !important;
                font-size: 0.85rem !important;
            }
            .pc-stats-strip {
                margin-top: -2rem !important;
                padding: 0 1rem !important;
            }
            .pc-stats-grid {
                grid-template-columns: repeat(3, 1fr) !important;
                gap: 0.5rem !important;
                padding: 1rem 0.5rem !important;
            }
            .pc-stat-num {
                font-size: 1.15rem !important;
            }
            .pc-stat-label {
                font-size: 0.6rem !important;
            }
            .pc-stat-item {
                border-right: 1px solid var(--pc-blue-light) !important;
                border-bottom: none !important;
                padding-bottom: 0 !important;
            }
            .pc-stat-item:last-child {
                border-right: none !important;
            }
            .pc-sidebar-sticky {
                grid-template-columns: 1fr !important;
            }
            .pc-img-box {
                min-height: 260px !important;
            }
            .pc-article-body p, .pc-article-body li {
                font-size: 0.95rem !important;
                line-height: 1.6 !important;
            }
            .pc-article-body h2 {
                font-size: 1.5rem !important;
            }
            .pc-article-body h3 {
                font-size: 1.25rem !important;
            }
            .blog-rich-content .elementor-grid-3cols-row {
                gap: 0.5rem !important;
            }
            .blog-rich-content .elementor-grid-3cols-row > *,
            .blog-rich-content .pc-custom-blog-card {
                min-width: 125px !important;
                border-radius: 10px !important;
            }
            .blog-rich-content .pc-custom-blog-card figure,
            .blog-rich-content .pc-custom-blog-card img {
                height: 100px !important;
            }
            .blog-rich-content .pc-custom-blog-card h2,
            .blog-rich-content .pc-custom-blog-card h3,
            .blog-rich-content .pc-custom-blog-card h4,
            .blog-rich-content .pc-custom-blog-card p {
                font-size: 0.72rem !important;
                height: 3.4rem !important;
                min-height: 3.4rem !important;
                max-height: 3.4rem !important;
                padding: 0.4rem 0.4rem 0.2rem 0.4rem !important;
            }
            .blog-rich-content .pc-custom-blog-card a:last-child {
                font-size: 0.72rem !important;
                padding: 0.4rem 0.4rem !important;
            }
        }

        @container pcblog (max-width: 480px) {
            .pc-hero {
                padding: 2rem 1rem 3rem 1rem !important;
            }
            .pc-h1 {
                font-size: 1.5rem !important;
            }
            .pc-article-body h2 {
                font-size: 1.35rem !important;
            }
            .pc-article-body h3 {
                font-size: 1.15rem !important;
            }
            .pc-mid-cta {
                padding: 1.5rem 1rem !important;
            }
            .pc-mid-cta .pc-mid-cta-h3 {
                font-size: 1.25rem !important;
            }
            .pc-mid-cta .pc-mid-cta-p {
                font-size: 0.9rem !important;
            }
            .pc-mid-cta .pc-mid-cta-btn {
                padding: 0.8rem 1.5rem !important;
                font-size: 0.9rem !important;
            }
            .pc-img-box {
                min-height: 200px !important;
            }
        }
      `}} />

      <div id="pc-pgbar-container"><div id="pc-pgbar"></div></div>

      <div className="pc-blog-wrap">
          <section className="pc-hero">
              <div className="pc-hero-inner">
                  <div className="pc-breadcrumb">Home › Blog › {blog.title || 'Untitled'}</div>
                  <div className="pc-category-pill">{blog.category || 'Category'}</div>
                  <h1 className="pc-h1">{blog.title || 'Blog Title'}</h1>
                  <div className="pc-meta-row">
                      <div className="pc-meta-left">
                        <div className="pc-meta-item"><Calendar size={16} /> {blog.publish_date ? parseDate(blog.publish_date, { month: 'long', day: 'numeric', year: 'numeric' }) : 'Draft'}</div>
                        <div className="pc-meta-item"><Clock size={16} /> {blog.read_time || '5 min read'}</div>
                        <div className="pc-meta-item"><User size={16} /> {blog.author || 'Pentacloud Team'}</div>
                      </div>
                      {blog.last_modified_date && blog.last_modified_date !== blog.publish_date && (
                        <div className="pc-meta-updated">
                          <RefreshCw size={14} /> Updated: {parseDate(blog.last_modified_date, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      )}
                  </div>
                  
                  {blog.cover_image_url && (
                    <div className="pc-img-box has-img">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="pc-uploaded" src={blog.cover_image_url} alt={blog.cover_image_alt || blog.title}/>
                    </div>
                  )}
              </div>
          </section>

          <div className="pc-stats-strip">
              <div className="pc-stats-grid">
                  <div className="pc-stat-item">
                      <div className="pc-stat-num">100%</div>
                      <div className="pc-stat-label">Cloud Deployment Success</div>
                  </div>
                  <div className="pc-stat-item">
                      <div className="pc-stat-num">10+</div>
                      <div className="pc-stat-label">Certified System Architects</div>
                  </div>
                  <div className="pc-stat-item">
                      <div className="pc-stat-num">24/7</div>
                      <div className="pc-stat-label">Global Operational Support</div>
                  </div>
              </div>
          </div>

          <main className="pc-layout">
              <article className="pc-content-col">
                  <div className="pc-article-body">
                      <div 
                        className="blog-rich-content"
                        dangerouslySetInnerHTML={{ __html: blog.content || '<p>Start writing to see your content preview here...</p>' }} 
                      />

                      <div className="pc-mid-cta">
                          <h3 className="pc-mid-cta-h3">{blog.cta_heading || 'Ready to Modernize Your Cloud Architecture?'}</h3>
                          <p className="pc-mid-cta-p">{blog.cta_description || 'Connect with Pentacloud Consulting’s certified systems engineering team to run an exhaustive, data-backed operational assessment of your CRM ecosystem.'}</p>
                          <a href={blog.cta_button_link || 'https://pentacloud.in/contact'} className="pc-mid-cta-btn">{blog.cta_button_text || 'Request Architecture Discovery Session'}</a>
                      </div>

                      {blog.faqs && blog.faqs.length > 0 && (
                        <section className="pc-faq-section">
                            <h3 className="pc-faq-header">Frequently Asked Questions</h3>
                            
                            {blog.faqs.map((faq: any, i: number) => (
                              <div className="pc-faq-item" key={i}>
                                  <button className="pc-faq-btn" onClick={toggleFaq}>{faq.question}</button>
                                  <div className="pc-faq-content">
                                      <div className="pc-faq-inner">
                                          {faq.answer}
                                      </div>
                                  </div>
                              </div>
                            ))}
                        </section>
                      )}
                  </div>
              </article>

              <aside className="pc-sidebar-col">
                  <div className="pc-sidebar-sticky">
                      <div className="pc-side-card">
                          <div className="pc-side-lead-header">
                              <h4 className="pc-side-lead-h4">{blog.sidebar_heading || 'Talk to an Expert'}</h4>
                              <p className="pc-side-lead-tag">{blog.sidebar_subheading || 'Pentacloud Consulting Pvt Ltd'}</p>
                          </div>
                          <div className="pc-side-lead-body">
                              <div className="pc-contact-info-list">
                                  <div className="pc-contact-info-item">
                                      <span className="pc-contact-icon text-blue-600"><MapPin size={18} /></span>
                                      <span>{blog.sidebar_address || 'Jagan Arcade, 4th Floor, 1st Main Road, Anandnagar, RT Nagar, Bengaluru, KA 560032'}</span>
                                  </div>
                                  <div className="pc-contact-info-item">
                                      <span className="pc-contact-icon text-blue-600"><Phone size={18} /></span>
                                      <span>{blog.sidebar_phone || '+971 545 132 807'}</span>
                                  </div>
                                  <div className="pc-contact-info-item">
                                      <span className="pc-contact-icon text-blue-600"><Mail size={18} /></span>
                                      <span>{blog.sidebar_email || 'contactus@pentacloudconsulting.com'}</span>
                                  </div>
                              </div>
                              <a href={blog.sidebar_button_link || 'https://pentacloud.in/contact'} className="pc-side-btn">{blog.sidebar_button_text || 'Visit Website Matrix'}</a>
                          </div>
                      </div>

                      <div className="pc-side-card">
                          <div className="pc-side-nav-header">
                              <h4 className="pc-side-nav-h4">Our Services</h4>
                          </div>
                          <ul className="pc-side-nav-list">
                              <li className="pc-side-nav-item"><a href="/services/salesforce">Salesforce Consulting</a></li>
                              <li className="pc-side-nav-item"><a href="/services/cloud">Cloud Solutions</a></li>
                              <li className="pc-side-nav-item"><a href="/services/web">Web Development</a></li>
                              <li className="pc-side-nav-item"><a href="/services/consulting">Consulting & Training</a></li>
                              <li className="pc-side-nav-item"><a href="/services/digital-marketing">Digital Marketing</a></li>
                              <li className="pc-side-nav-item"><a href="/services/app">App Development</a></li>
                              <li className="pc-side-nav-item"><a href="/services/data-migration">Data Migration</a></li>
                          </ul>
                      </div>
                  </div>
              </aside>
          </main>
      </div>
    </div>
  );
}
