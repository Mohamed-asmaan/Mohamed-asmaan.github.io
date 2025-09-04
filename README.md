# Mohamed Asmaan - Portfolio Website

A modern, responsive portfolio website built with Next.js 14, Tailwind CSS, and TypeScript. Features dark/light mode, SEO optimization, and a clean, professional design.

## 🚀 Features

- **Modern Design**: Clean, professional layout with dark/light mode toggle
- **Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Meta tags, OpenGraph, sitemap, and robots.txt
- **Fast Performance**: Optimized images, lazy loading, and efficient bundling
- **Accessible**: Semantic HTML and keyboard navigation support
- **Easy Content Management**: All content configurable through `site.config.ts`

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Content**: MDX files for projects
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── page.tsx           # Home page
│   │   ├── projects/          # Projects pages
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI components (Button, Card, etc.)
│   │   └── layout/           # Layout components (Navbar, Footer)
│   └── site.config.ts        # Site configuration
├── content/
│   └── projects/             # MDX project files
├── public/                   # Static assets
└── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Content Management

### Personal Information

Edit `src/site.config.ts` to update your personal information:

```typescript
export const siteConfig = {
  name: "Your Name",
  role: "Your Role",
  location: "Your Location",
  email: "your.email@example.com",
  shortBio: "Your short bio",
  longBio: "Your detailed bio",
  
  social: {
    linkedin: "https://linkedin.com/in/your-profile",
    github: "https://github.com/your-username",
    // Add other social links
  },
  
  skills: {
    languages: ["JavaScript", "TypeScript", "Python"],
    frameworks: ["React", "Next.js", "Tailwind CSS"],
    platforms: ["Webflow", "WordPress"],
    tools: ["Git", "Figma", "Postman"],
  },
  
  experience: [
    {
      company: "Company Name",
      role: "Your Role",
      period: "2023 - Present",
      location: "Remote",
      description: "Your job description",
      projects: ["Project 1", "Project 2"]
    }
  ],
  
  education: [
    {
      degree: "Your Degree",
      institution: "Institution Name",
      period: "2020 - 2024",
      type: "Full-time" // optional
    }
  ],
  
  certifications: [
    {
      name: "Certification Name",
      institution: "Issuing Institution",
      period: "2023"
    }
  ],
  
  strengths: [
    "Your strength 1",
    "Your strength 2",
    // Add more strengths
  ]
}
```

### Adding Projects

1. **Create MDX files** in `content/projects/` directory
2. **Use frontmatter** for project metadata:

```mdx
---
title: "Project Title"
slug: "project-slug"
stack: ["React", "TypeScript", "Tailwind"]
links:
  demo: "https://demo-link.com"
  repo: "https://github.com/username/repo"
cover: "/projects/project-image.jpg"
summary: "Brief project description"
description: "Detailed project description"
---

# Project Content

Your project content goes here...
```

3. **Add project images** to `public/projects/` directory

### Customizing Styles

- **Colors**: Modify CSS variables in `src/app/globals.css`
- **Components**: Edit component files in `src/components/ui/`
- **Layout**: Customize layout components in `src/components/layout/`

## 🎨 Customization

### Theme Colors

Update the CSS variables in `src/app/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;    /* Blue */
  --secondary: 210 40% 96%;        /* Light gray */
  /* Add more custom colors */
}
```

### Fonts

Replace the Inter font in `src/app/layout.tsx`:

```typescript
import { YourFont } from 'next/font/google'

const yourFont = YourFont({ subsets: ['latin'] })
```

### Components

All UI components are in `src/components/ui/` and can be customized to match your design preferences.

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository
   - Vercel will automatically detect Next.js
   - Deploy with default settings

3. **Environment Variables** (if needed)
   - Add `SITE_URL` in Vercel dashboard
   - Set to your production URL

### GitHub Pages

1. **Update next.config.ts**
   ```typescript
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   ```

2. **Build and deploy**
   ```bash
   npm run build
   # Upload the 'out' folder to GitHub Pages
   ```

### Other Platforms

The site can be deployed to any static hosting platform:
- Netlify
- AWS S3
- DigitalOcean App Platform
- Any VPS with nginx

## 📊 Performance Optimization

- **Images**: Use `next/image` for optimized images
- **Fonts**: System fonts with Google Fonts fallback
- **Bundling**: Automatic code splitting
- **Caching**: Static generation for better performance

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Adding New Pages

1. Create a new directory in `src/app/`
2. Add `page.tsx` file
3. Update navigation in `src/components/layout/navbar.tsx`

### Adding New Components

1. Create component file in `src/components/ui/` or `src/components/layout/`
2. Export the component
3. Import and use in your pages

## 📱 Mobile Optimization

The site is built with a mobile-first approach:
- Responsive grid layouts
- Touch-friendly navigation
- Optimized images for mobile
- Fast loading on slow connections

## 🔍 SEO Features

- Meta tags for all pages
- OpenGraph tags for social sharing
- Structured data for search engines
- Sitemap generation
- Robots.txt file
- Semantic HTML structure

## 🎯 Analytics

Add your analytics script to `src/app/layout.tsx`:

```typescript
// Add before closing </head>
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
/>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    `,
  }}
/>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icons
- The open-source community for inspiration

---

**Built with ❤️ by Mohamed Asmaan**

For questions or support, reach out at asmaan011@gmail.com
