# Blogs — End-to-End WordPress Integration & Dual-Domain UI

> Complete technical documentation of everything built for the Pentacloud Blogs system and WordPress API integration.

---

## 📌 Overview & Architecture

The objective was to build a single Next.js dynamic blog system that automatically adapts UI branding, colors, logos, titles, and WordPress posts based on the hostname (`pentacloud.in` vs `pentacloudconsulting.com` vs `localhost`).

```
                              [ User Browser ]
                                     |
                -------------------------------------------
               |                                           |
    Host: pentacloud.in                       Host: pentacloudconsulting.com
   (or preview toggle)                       (or preview toggle)
               |                                           |
               v                                           v
      [ DomainConfig: .in ]                       [ DomainConfig: .com ]
  - Brand: Pentacloud.in                     - Brand: Pentacloud Consulting
  - Primary Color: Blue                      - Primary Color: Teal/Emerald
  - WP Backend:                              - WP Backend:
    blog.pentacloud.in                         pentacloudconsulting.com/blog
               |                                           |
                -------------------------------------------
                                     |
                                     v
                       [ Next.js API Proxy Router ]
                      `/api/wp-proxy?endpoint=...`
                                     |
                                     v
                    [ WordPress REST API Backend ]
```

---

## 📂 Key Files Created & Modified

### 1. `src/Web-Page/Blogs/Dynamic Change Blog.tsx` (Main Blog UI Component)
- **Role**: Core client-side blog catalog and layout manager.
- **Key Features**:
  - **Dynamic Domain Config**: Switches brand name, logo, accent colors, and API endpoint automatically.
  - **Environment-Aware Domain Detection**: Checks `window.location.hostname` (or host headers) to detect whether it's running on `.in` or `.com`.
  - **Localhost Fallback**: When running locally (`localhost` or `127.0.0.1`), defaults to `pentacloud.in` configuration, while enabling interactive domain switching controls.
  - **Live Testing Toggle**: Floating control bar allowing instant switching between `.in` and `.com` UI modes during development/testing.
  - **Search & Filter**: Client-side interactive search filtering posts by title, excerpt, or content.
  - **Anchor & Relative Link Interception**: Captures clicks on WordPress links (like `/blog/post-slug` or full URLs) and routes them seamlessly inside Next.js using `router.push('/blogs/' + slug)`.

### 2. `src/app/api/wp-proxy/route.ts` (WordPress REST API Proxy)
- **Role**: Edge/Server Route Handler to prevent CORS issues when fetching posts from external WordPress servers.
- **Key Features**:
  - Forwards requests to WordPress REST API endpoints (`/wp-json/wp/v2/posts`, `/wp-json/wp/v2/categories`, etc.).
  - Extracts parameters like `endpoint`, `per_page`, `page`, `slug`, `search`, and passes them upstream.
  - Returns structured JSON response with error fallback handling.

### 3. `src/app/blogs/[slug]/page.tsx` (Single Blog Post Detail Page)
- **Role**: Server Component for rendering individual blog post content.
- **Key Features**:
  - Fetches individual post content dynamically based on the URL `slug` parameter via the proxy.
  - Formats post HTML content securely.
  - Includes full responsive sidebar, related posts, category tags, back button, and author meta info.

### 4. `src/app/blogs/page.tsx` (Blogs Root Page)
- **Role**: Entry point page for `/blogs` route rendering `Dynamic Change Blog`.

### 5. `src/app/api/contact/submit-lead/route.ts` & `src/app/api/contact/submit-career/route.ts`
- **Role**: API handlers processing lead forms and career resume submissions.

---

## 🛠️ Detailed Implementation Breakdown

### A. Dynamic Domain Configuration Setup

```typescript
export interface DomainConfig {
  domainName: string;
  brandTitle: string;
  wpApiBaseUrl: string;
  themeColor: string;
  badgeBg: string;
  badgeText: string;
  heroTagline: string;
}

export const DOMAIN_CONFIGS: Record<string, DomainConfig> = {
  "pentacloud.in": {
    domainName: "pentacloud.in",
    brandTitle: "Pentacloud.in",
    wpApiBaseUrl: "https://blog.pentacloud.in",
    themeColor: "from-blue-600 to-indigo-600",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-400 border-blue-500/20",
    heroTagline: "Cloud Solutions & Infrastructure Insights for India",
  },
  "pentacloudconsulting.com": {
    domainName: "pentacloudconsulting.com",
    brandTitle: "Pentacloud Consulting",
    wpApiBaseUrl: "https://pentacloudconsulting.com",
    themeColor: "from-emerald-500 to-teal-600",
    badgeBg: "bg-teal-500/10",
    badgeText: "text-teal-400 border-teal-500/20",
    heroTagline: "Global Cloud Strategy & Enterprise Consulting",
  },
};
```

### B. Auto-Detection Flow (Localhost vs Production)

```typescript
// Detect active domain from window location with fallback logic
useEffect(() => {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host.includes("pentacloudconsulting.com")) {
      setActiveDomain("pentacloudconsulting.com");
    } else {
      // Default to pentacloud.in on localhost or pentacloud.in domain
      setActiveDomain("pentacloud.in");
    }
  }
}, []);
```

### C. WordPress Post Fetching Logic

```typescript
const fetchPosts = async (domain: string) => {
  setLoading(true);
  try {
    const config = DOMAIN_CONFIGS[domain];
    const res = await fetch(
      `/api/wp-proxy?endpoint=${encodeURIComponent(config.wpApiBaseUrl + '/wp-json/wp/v2/posts?_embed=true&per_page=12')}`
    );
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    setPosts([]);
  } finally {
    setLoading(false);
  }
};
```

---

## 🧪 Verification & Testing Controls

1. **Local Domain Testing Toggle**:
   - Includes UI buttons (`Pentacloud.in` vs `Pentacloud Consulting (.com)`) at the top of `/blogs` page when running in development mode.
   - Click toggling instantly changes post API calls, header branding, accent gradients, and metadata.

2. **Link Navigation Safety**:
   - Ensures that clicking any blog card opens `/blogs/[slug]` without hard-redirecting to external deployed WordPress instances.

3. **Fallback Handling**:
   - If a domain's WordPress REST API is unavailable, the UI gracefully renders a clean "No posts found" state with a refresh option rather than crashing.

---

## 🚀 Summary

The blog platform now operates dynamically across environments:
- On **`pentacloud.in`**: Displays `Pentacloud.in` branding and fetches posts from `blog.pentacloud.in`.
- On **`pentacloudconsulting.com`**: Displays `Pentacloud Consulting` branding and fetches posts from `pentacloudconsulting.com`.
- On **`localhost`**: Defaults to `pentacloud.in` while allowing manual domain switching via the interactive test bar.

---

## 🗣️ Key Talking Points for Boss / Stakeholders

> *Use these exact concise bullet points when explaining the solution to your boss or team:*

1. **Dual-Domain Automation**:
   > *"I engineered a single Next.js codebase that serves two separate brand domains (`pentacloud.in` & `pentacloudconsulting.com`). The app auto-detects the incoming hostname in real-time and dynamically adapts branding, logos, color schemes, and target APIs without needing separate deployments."*

2. **WordPress API Integration via Proxy**:
   > *"Instead of hardcoding blogs or running into CORS issues, I built a server-side proxy route `/api/wp-proxy`. It securely fetches live posts from WordPress backends (`blog.pentacloud.in` & `pentacloudconsulting.com/wp-json`) and streams them seamlessly into our Next.js frontend."*

3. **Seamless Single-Page Navigation**:
   > *"I intercepted external WordPress links so when a user clicks on any post or internal link, they stay within our modern Next.js site (`/blogs/[slug]`) rather than getting kicked out to the old WordPress layout."*

4. **Developer & Testing Controls**:
   > *"I added a real-time domain switcher bar for local testing, allowing us to preview exactly how the site will look and behave on both `.in` and `.com` domains right from our localhost before deploying to production."*

5. **Search & Fallback Resilience**:
   > *"The blog UI features instant client-side search filtering and graceful error handling. If a backend WordPress server goes down or responds slowly, the UI displays a clean fallback rather than breaking the page."*

