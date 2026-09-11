# Blog CMS Integration Plan

## Current State (As of Last Check)
- **CMS Status:** No CMS (Sanity, Strapi, Contentful) is currently integrated.
- **Data Source:** Blog data is statically hardcoded in an array named `BLOGS` inside `src/Web-Page/Blogs/Blogs.tsx`.
- **Dynamic Routing:** The dynamic route for individual blog pages (`src/app/blogs/[slug]/page.tsx`) does **not** exist yet. The "Read More" buttons on blog cards do not lead anywhere.
- **Publishing Workflow:** To add a new blog right now, a developer must manually update the `BLOGS` array in the code and redeploy the website.

## Objective
Transition the blog system from a static, code-based setup to a dynamic, headless CMS integration. This will allow content writers to write and publish blogs from a CMS dashboard, which will automatically reflect on the website without needing a developer or redeployment.

## Proposed Implementation Steps

1. **Select and Initialize CMS**
   - Choose a Headless CMS (Sanity is highly recommended for Next.js due to excellent App Router support).
   - Setup a new CMS project and configure the schema (e.g., `Post` with fields: title, slug, author, image, publishedAt, excerpt, body).

2. **Connect Next.js to CMS**
   - Install necessary CMS client libraries in the Next.js project.
   - Configure environment variables (e.g., Project ID, API keys).
   - Create utility functions to fetch blog data from the CMS API.

3. **Refactor the Main Blog Page (`/blogs`)**
   - Update `src/Web-Page/Blogs/Blogs.tsx` to remove the hardcoded `BLOGS` array.
   - Refactor the component to fetch the list of blogs dynamically from the CMS using Next.js Server Components or Client Components as appropriate.

4. **Implement Dynamic Blog Pages (`/blogs/[slug]`)**
   - Create the `src/app/blogs/[slug]/page.tsx` file.
   - Fetch the individual blog post content based on the URL slug.
   - Build the UI to render the rich text/portable text content returned by the CMS.
   - Update the "Read More" buttons in `Blogs.tsx` to link to their respective `[slug]` pages.

5. **Test and Verify Workflow**
   - Write a test blog in the CMS dashboard and publish it.
   - Verify it appears on the main blogs list and the individual blog page works correctly on the live/preview site.
