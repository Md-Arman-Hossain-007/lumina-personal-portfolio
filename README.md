# Lumina — Personal Portfolio

A single-page, ultra-polished personal portfolio built with shadcn/ui and Tailwind, designed for exceptional visual quality and responsive excellence. Lumina showcases skills, experience, projects, and contact information in a compact, elegant, and highly interactive one-page layout. It features smooth animations, responsive design, and seamless integration with Cloudflare Workers for contact form handling.

[cloudflarebutton]

## Features

- **Single-Page Layout**: Smooth-scrolling sections including Hero, About, Skills, Experience (timeline), Projects (card grid), Contact (form), and Footer.
- **Visual Excellence**: Gradient hero with subtle textures, refined typography, micro-interactions via Framer Motion, and loading skeletons.
- **Responsive Design**: Mobile-first approach with flawless layouts across all device sizes.
- **Interactive Elements**: Hover states, slide-up reveals, project detail sheets, and skill filtering.
- **Contact Form**: Submits data via POST to Cloudflare Workers endpoint with success/error toasts.
- **Mock Data Seeding**: Easy-to-replace placeholder content for personalization.
- **Accessibility**: High contrast, keyboard navigation, and screen reader support.

## Technology Stack

- **Frontend**: React 18, React Router DOM 6, TypeScript
- **UI Library**: shadcn/ui (with Radix UI primitives)
- **Styling**: Tailwind CSS 3, Tailwind Animate
- **Animations**: Framer Motion 12
- **Icons**: Lucide React
- **State Management**: Zustand 5 (minimal usage)
- **Forms & Validation**: React Hook Form 7, Zod 4
- **Toasts & Notifications**: Sonner 2
- **Charts (Optional)**: Recharts 2
- **Backend/Edge**: Cloudflare Workers (Hono 4), Wrangler 4
- **Build Tools**: Vite 6, Bun (package manager)
- **Other**: Immer 10, UUID 11, Date-fns 4

## Quick Start

To get started quickly, clone the repository and follow the installation steps below. For instant deployment to Cloudflare Workers, use the deploy button above.

## Installation

This project uses Bun as the package manager for faster performance. Ensure you have Bun installed (version 1.0+).

1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd lumina-portfolio
   ```

2. Install dependencies:
   ```
   bun install
   ```

3. (Optional) Generate TypeScript types for Cloudflare Workers:
   ```
   bun run cf-typegen
   ```

## Development

1. Start the development server:
   ```
   bun run dev
   ```
   The app will be available at `http://localhost:3000` (or the port specified in your environment).

2. Open your browser and navigate to the local URL. The single-page portfolio will load with mock data.

3. Make changes to `src/pages/HomePage.tsx` for customization:
   - Replace mock data arrays (e.g., `projects`, `experience`, `skills`).
   - Update content in sections like Hero, About, etc.
   - Personalize the contact form endpoint if needed (currently uses `/api/test`).

4. Lint the code:
   ```
   bun run lint
   ```

5. Build for production:
   ```
   bun run build
   ```
   Outputs to the `dist` directory.

**Notes**:
- The app is client-side rendered with static mock data. No backend setup is required for core functionality.
- Contact form submits to the existing `/api/test` endpoint in Cloudflare Workers.
- Use `src/index.css` for custom Tailwind utilities and `tailwind.config.js` for theme extensions.
- Avoid modifying forbidden files (e.g., `worker/index.ts`, `wrangler.jsonc`) to prevent deployment issues.

## Usage Examples

### Customizing Content
Edit `src/pages/HomePage.tsx` to replace mock data:

```tsx
// Example: Update projects array
const projects = [
  {
    id: '1',
    title: 'My Project',
    description: 'A brief description...',
    image: 'https://via.placeholder.com/400x300',
    tags: ['React', 'Tailwind'],
    link: 'https://example.com',
  },
  // Add more projects...
];
```

### Adding Animations
Leverage Framer Motion for section reveals:

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  {/* Section content */}
</motion.div>
```

### Form Submission
The contact form uses React Hook Form and submits to `/api/test`. Extend in `worker/userRoutes.ts` for custom handling:

```ts
// In worker/userRoutes.ts
app.post('/api/contact', async (c) => {
  const data = await c.req.json();
  // Process form data (e.g., email, log, etc.)
  return c.json({ success: true, message: 'Message sent!' });
});
```

### Responsive Testing
Use browser dev tools to test mobile layouts. The design stacks sections vertically on small screens.

## Deployment

This project is optimized for Cloudflare Workers. Deployment bundles the frontend as static assets and runs the backend on the edge.

1. Ensure Wrangler is installed globally (via Bun):
   ```
   bun add -g wrangler
   ```

2. Login to Cloudflare:
   ```
   wrangler login
   ```

3. Deploy to Cloudflare Workers:
   ```
   bun run deploy
   ```
   This builds the app and deploys via Wrangler. Your site will be live at `https://<project-name>.<your-subdomain>.workers.dev`.

[cloudflarebutton]

**Custom Domain**:
- In the Cloudflare dashboard, add a custom domain under Workers > Your Worker > Settings > Triggers.
- Update `wrangler.jsonc` for environment variables if needed (e.g., API keys).

**Production Notes**:
- The build process handles static asset optimization.
- Monitor logs via `wrangler tail`.
- For CI/CD, integrate with GitHub Actions using Wrangler actions.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

Please ensure code follows the existing patterns: use shadcn/ui components, Tailwind utilities, and avoid new dependencies.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.