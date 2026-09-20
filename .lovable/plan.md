# Young Creators Portfolio Redesign

## Goal
Transform `/gallery` into **Young Creators**: a premium, faceless digital exhibition centred on what ChoraNami learners make, while preserving the current site branding and navigation structure.

## Page experience
- Rename the navigation label from **Gallery** to **Young Creators** while keeping the existing `/gallery` URL so current links continue working.
- Replace the current generic gallery hero with the requested Young Creators title, exhibition copy, and a strong real ChoraNami work photograph with no visible face.
- Add three visual programme gateways for Art, Crochet, and Fashion, each linking to its relevant exhibition section and dedicated programme page.
- Add a restrained “From Idea to Creation” story using only photographs that genuinely support the stage shown; no manufactured learner sequence.
- Build dedicated Art, Crochet, and Fashion portfolio sections with programme-appropriate filters and large, image-led layouts.
- End with the requested “Every creation tells a story” call to action linking to each programme and Contact.

## Portfolio content and privacy
- Use only existing user-supplied ChoraNami, crochet, and fashion assets already in the project.
- Prioritize finished work, close-ups, materials, worktables, sketches, stitches, garments, and making details.
- Exclude images showing identifiable child faces; use only naturally faceless photographs rather than synthetic replacements.
- Do not add generic stock imagery or generate any new imagery.
- Do not add learner quotes because no verified reflections are currently available; omit “In Their Own Words” until authentic submissions exist.

## Project interaction
- Replace the basic lightbox with a polished project presentation opened from each portfolio item.
- Show project name, programme, “Creator: Learner,” concise factual description, and the available real project image(s).
- Show Idea, Making, or Finished Work labels only where the available image and known project information support them.
- Support keyboard navigation, Escape-to-close, focus-safe dialog behaviour, clear close/previous/next controls, and mobile-friendly presentation.

## Visual direction
- Use an editorial exhibition layout: generous whitespace, restrained brand accents, strong typography, varied image scale, and subtle motion.
- Keep cards compact and purposeful; let the learner work provide the visual colour.
- Use the existing ChoraNami design tokens and shared button/navigation patterns rather than introducing a new visual system.
- Respect reduced-motion preferences and keep image crops stable across phone and desktop sizes.

## Technical details
- Create a typed, curated portfolio data module that maps real assets to programmes, project titles, descriptions, categories, and supported presentation stages.
- Refactor the gallery page into focused exhibition sections and reusable project-card/project-view pieces.
- Preserve the existing backend gallery fetch without allowing uncategorized uploads to override the curated, faceless exhibition; compatible uploaded items can remain available only when they match the supported Art, Crochet, or Fashion categories.
- Update route metadata to unique Young Creators SEO and social text, including `og:type` and `twitter:card`; omit image metadata because project assets use relative managed URLs.
- Verify the page at desktop and mobile widths, including filtering, project opening/closing, keyboard navigation, all image requests, console errors, and the final build status.
