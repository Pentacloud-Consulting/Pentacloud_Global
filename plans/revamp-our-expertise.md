# Plan: Revamp OurExpertise Section

Revamp the `OurExpertise` section in the Salesforce service page to improve UI/UX, fill empty space on the right side, and make it more interactive.

## Objective
- Eliminate excessive empty space on the right side of the `OurExpertise` component.
- Enhance the interactive experience by adding more detailed content and visuals for each Salesforce Cloud.
- Align the UI with a "Command Center" or "Dashboard" feel, consistent with other service pages like `CloudServiceHub`.

## Key Files & Context
- `src/Web-Page/Services/SalesforceForce/OurExpertise.tsx`: The main component to be revamped.
- `public/Images/Salesforce/`: Existing images (mostly for WhyPentacloud and Questions).

## Proposed Changes

### 1. Enrich `clouds` Data
Update the `clouds` array in `OurExpertise.tsx` to include:
- `features`: An array of 4 key features/benefits for each cloud.
- `secondaryMetric`: An additional data point (e.g., "Industry Adoption", "ROI %").

### 2. Redesign Right Content Area
Refactor the right content area into a more structured layout:
- **Header Section:** Retain the Icon, Title, and Primary Metric but refine the typography and spacing.
- **Body Section:** 
    - **Left Column (within the right area):** Detailed description and a new "Key Capabilities" list (using the new `features` data).
    - **Right Column (within the right area):** A "Visual Stage" or "Interactive Mockup" specific to the cloud. Since we don't have unique images for all, we can use abstract Lucide icon-based animations or mini-charts.
- **Footer Section:** A Call-to-Action button (e.g., "Schedule a Demo" or "Download Case Study").

### 3. Interactive Visuals
Implement a `VisualStage` component for each cloud that uses Lucide icons and Framer Motion to create a "live" feel:
- **Sales Cloud:** Animated pipeline/funnel.
- **Service Cloud:** Pulsing support nodes.
- **Marketing Cloud:** Animated "journey" path.
- **Experience Cloud:** Interconnected user nodes.
- **Commerce Cloud:** Floating cart/product icons.
- **Analytics Cloud:** Rising bar charts or spinning data orbits.
- **Financial/Health Cloud:** Secure shield and data lock animations.

### 4. Animation & UX
- Use `AnimatePresence` for smooth transitions between tabs.
- Add hover effects to features to make them feel "interactive".
- Improve the mobile/tablet layout to ensure the "Folder Tab" navigation works well on smaller screens.

## Verification & Testing
- **Visual Check:** Verify the layout on desktop (1440px), laptop (1024px), tablet (768px), and mobile (375px).
- **Interactivity Check:** Ensure all tabs are clickable and content updates correctly with animations.
- **Responsiveness:** Check if the horizontal tab scroll on mobile is smooth.
