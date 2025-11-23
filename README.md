This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# For reviewers:
## Future Enhancements

## Code
- Replace local storage with server api and use all advantages of SSR ( Server actions, server requests with server components )
- Add support for multi pages for quiz
- Add field validations for quiz builder
- use more advanced structure for quiz builder ( separate store property for each block entity instead of common array )
- Add support for choosing correct answer for quiz's that need this feature
- Send quiz summary to email
- Add more options for quiz builder property section ( button redirect/action settings, button variant, footer text size/color etc )

## Performance
- Virtualization for long quiz lists to improve performance.
- Optimistic UI updates and loading states for a smoother user experience.

## Architecture & Rendering
- Migration of components from client-side only to server-side rendering after backend integration (localStorage can be removed).

## UI / UX
- Mobile-friendly responsive layout enhancements.
- Accessibility improvements (ARIA labels, keyboard navigation, focus management).

## Testing & CI/CD
- CI/CD setup for automated tests, linting, and deployments.
- Unit and integration tests for editor and render components.

## Data & Features
- Support for quiz versioning / history (track changes for each quiz).

## Monitoring
- Add sentry/datadog support
