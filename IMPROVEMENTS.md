# Future Enhancements

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
