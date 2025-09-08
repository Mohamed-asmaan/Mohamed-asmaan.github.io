# Technical Specifications - Portfolio Website

## 🏗️ Architecture Overview

### Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3.4.17
- **Icons**: Lucide React
- **Build Tool**: Turbopack
- **Package Manager**: npm

### Project Structure
```
my-portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Home page (/)
│   │   ├── projects/          # Projects section
│   │   │   ├── page.tsx       # Projects listing (/projects)
│   │   │   └── [slug]/        # Dynamic project pages
│   │   │       └── page.tsx   # Individual project (/projects/[slug])
│   │   ├── about/             # About section
│   │   │   └── page.tsx       # About page (/about)
│   │   ├── contact/           # Contact section
│   │   │   └── page.tsx       # Contact page (/contact)
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   └── not-found.tsx      # 404 page
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI components
│   │   │   ├── button.tsx    # Button component
│   │   │   ├── badge.tsx     # Badge component
│   │   │   ├── card.tsx      # Card components
│   │   │   ├── container.tsx # Container component
│   │   │   └── section-heading.tsx # Heading component
│   │   └── layout/           # Layout components
│   │       ├── navbar.tsx    # Navigation bar
│   │       ├── footer.tsx    # Footer
│   │       └── scroll-to-top.tsx # Scroll button
│   └── site.config.ts        # Site configuration
├── content/                   # Project content
│   └── projects/             # MDX project files
├── public/                    # Static assets
│   └── projects/             # Project images
├── next-sitemap.config.js    # SEO configuration
├── tailwind.config.ts        # Tailwind configuration
├── postcss.config.mjs        # PostCSS configuration
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript configuration
├── README.md                 # Documentation
├── LICENSE                   # MIT License
├── DEVELOPMENT_LOG.md        # Development history
├── GITHUB_COMMITS_LOG.md     # Commit history
└── TECHNICAL_SPECIFICATIONS.md # This file
```

---

## 🎨 Design System

### Color Palette
```css
:root {
  /* Light Mode */
  --background: 0 0% 100%;           /* White */
  --foreground: 222.2 84% 4.9%;     /* Dark Gray */
  --primary: 221.2 83.2% 53.3%;     /* Blue */
  --primary-foreground: 210 40% 98%; /* White */
  --secondary: 210 40% 96%;          /* Light Gray */
  --secondary-foreground: 222.2 84% 4.9%; /* Dark Gray */
  --muted: 210 40% 96%;              /* Light Gray */
  --muted-foreground: 215.4 16.3% 46.9%; /* Medium Gray */
  --accent: 210 40% 96%;             /* Light Gray */
  --accent-foreground: 222.2 84% 4.9%; /* Dark Gray */
  --border: 214.3 31.8% 91.4%;      /* Light Border */
  --input: 214.3 31.8% 91.4%;       /* Input Border */
  --ring: 221.2 83.2% 53.3%;        /* Focus Ring */
}

.dark {
  /* Dark Mode */
  --background: 222.2 84% 4.9%;     /* Dark */
  --foreground: 210 40% 98%;         /* Light */
  --primary: 217.2 91.2% 59.8%;     /* Light Blue */
  --primary-foreground: 222.2 84% 4.9%; /* Dark */
  --secondary: 217.2 32.6% 17.5%;   /* Dark Gray */
  --secondary-foreground: 210 40% 98%; /* Light */
  --muted: 217.2 32.6% 17.5%;        /* Dark Gray */
  --muted-foreground: 215 20.2% 65.1%; /* Medium Gray */
  --accent: 217.2 32.6% 17.5%;       /* Dark Gray */
  --accent-foreground: 210 40% 98%;  /* Light */
  --border: 217.2 32.6% 17.5%;      /* Dark Border */
  --input: 217.2 32.6% 17.5%;        /* Input Border */
  --ring: 224.3 76.3% 94.1%;        /* Focus Ring */
}
```

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Font Sizes**: 
  - Hero: 4xl-6xl (responsive)
  - Headings: 2xl-4xl
  - Body: base-lg
  - Small: sm-xs

### Spacing System
- **Container**: max-width 7xl (1280px)
- **Padding**: 4, 6, 8, 12, 16, 20, 24, 32
- **Margins**: 4, 6, 8, 12, 16, 20, 24, 32
- **Gaps**: 2, 4, 6, 8, 12, 16, 20, 24

### Border Radius
- **Small**: sm (4px)
- **Medium**: md (6px)
- **Large**: lg (8px)
- **Extra Large**: xl (12px)
- **Cards**: 2xl (16px)

---

## 🧩 Component Architecture

### UI Components

#### Button Component
```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}
```

**Variants**:
- `primary`: Blue background, white text
- `secondary`: Light gray background, dark text
- `outline`: Transparent background, border
- `ghost`: Transparent background, hover effects

**Sizes**:
- `sm`: Height 9, padding 3
- `md`: Height 10, padding 4
- `lg`: Height 11, padding 8

#### Badge Component
```typescript
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'secondary' | 'outline'
  className?: string
}
```

**Usage**: Skills, technology tags, status indicators

#### Card Component System
```typescript
// Main Card
interface CardProps {
  children: React.ReactNode
  className?: string
}

// Sub-components
- CardHeader: Top section with title/description
- CardTitle: Main heading
- CardDescription: Subtitle/description
- CardContent: Main content area
- CardFooter: Bottom section with actions
```

#### Container Component
```typescript
interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: keyof React.JSX.IntrinsicElements
}
```

**Features**:
- Max-width: 7xl (1280px)
- Responsive padding
- Centered layout
- Semantic HTML support

#### Section Heading Component
```typescript
interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
```

**Features**:
- Responsive typography
- Semantic HTML support
- Consistent styling

### Layout Components

#### Navbar Component
**Features**:
- Sticky positioning
- Dark/light mode toggle
- Mobile responsive menu
- Active link highlighting
- Theme persistence (localStorage)

**State Management**:
```typescript
const [isDark, setIsDark] = useState(false)
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
```

#### Footer Component
**Features**:
- Social media links
- Copyright information
- Responsive design
- Branding consistency

#### ScrollToTop Component
**Features**:
- Appears after 500px scroll
- Smooth scroll behavior
- Fixed positioning
- Accessibility support

---

## 📄 Page Specifications

### Home Page (`/`)
**Sections**:
1. **Hero Section**
   - Name and role display
   - Professional bio
   - Location and contact info
   - Call-to-action buttons

2. **Skills Highlights**
   - Languages section
   - Frameworks & Libraries
   - Platforms & Tools
   - Badge-based display

3. **Featured Projects**
   - Grid layout (3 columns)
   - Project cards with images
   - Technology badges
   - View project links

4. **Now Widget**
   - Current activities
   - Learning updates
   - Last updated timestamp

### Projects Page (`/projects`)
**Features**:
- Grid layout (responsive: 1-3 columns)
- Project cards with:
  - Cover image placeholder
  - Title and description
  - Technology stack badges
  - Demo and detail links
- Filtering capability (future enhancement)

### Project Detail Pages (`/projects/[slug]`)
**Features**:
- Dynamic routing
- Project metadata display
- Detailed content
- Back navigation
- Demo and repository links
- Error handling for missing projects

### About Page (`/about`)
**Sections**:
1. **Professional Bio**
2. **Experience Timeline**
   - Company, role, period
   - Description and projects
3. **Education**
   - Degree, institution, period
4. **Certifications**
5. **Skills Breakdown**
   - Organized by category
6. **Key Strengths**

### Contact Page (`/contact`)
**Features**:
- Email contact with copy-to-clipboard
- Social media links
- Contact form (UI only)
- Location information
- Form validation

### 404 Page (`/not-found`)
**Features**:
- Custom error message
- Navigation back to home
- Consistent branding

---

## ⚙️ Configuration Files

### Site Configuration (`src/site.config.ts`)
```typescript
export const siteConfig = {
  // Personal Information
  name: string
  role: string
  location: string
  email: string
  shortBio: string
  longBio: string
  
  // Social Media
  social: {
    linkedin: string
    github: string
    twitter?: string
    instagram?: string
  }
  
  // Skills Organization
  skills: {
    languages: string[]
    frameworks: string[]
    platforms: string[]
    tools: string[]
  }
  
  // Professional Experience
  experience: Array<{
    company: string
    role: string
    period: string
    location: string
    description: string
    projects?: string[]
  }>
  
  // Education
  education: Array<{
    degree: string
    institution: string
    period: string
    type?: string
  }>
  
  // Certifications
  certifications: Array<{
    name: string
    institution: string
    period: string
  }>
  
  // Personal Strengths
  strengths: string[]
}
```

### Tailwind Configuration (`tailwind.config.ts`)
```typescript
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // CSS variable-based colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... other color definitions
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}
```

### PostCSS Configuration (`postcss.config.mjs`)
```javascript
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Next.js Sitemap Configuration (`next-sitemap.config.js`)
```javascript
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://asmaan-portfolio.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}
```

---

## 🚀 Build & Deployment

### Build Configuration
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint",
    "postbuild": "next-sitemap"
  }
}
```

### Build Output
```
Route (app)                         Size  First Load JS
┌ ○ /                                0 B         121 kB
├ ○ /_not-found                      0 B         121 kB
├ ○ /about                           0 B         121 kB
├ ○ /contact                     2.51 kB         123 kB
├ ○ /projects                        0 B         121 kB
└ ƒ /projects/[slug]                 0 B         121 kB
+ First Load JS shared by all     125 kB
```

### Performance Metrics
- **Build Time**: ~11.6 seconds
- **Bundle Size**: 121-125 kB (First Load JS)
- **Static Pages**: 5 pages
- **Dynamic Routes**: 1 route
- **SEO**: Sitemap + robots.txt generated

### Deployment Targets
1. **Vercel** (Recommended)
   - Automatic deployments
   - Edge functions support
   - Built-in analytics

2. **GitHub Pages**
   - Static hosting
   - Free tier available
   - Custom domain support

3. **Netlify**
   - JAMstack hosting
   - Form handling
   - Edge functions

4. **Any Static Host**
   - Universal compatibility
   - CDN support
   - Custom configuration

---

## 🔧 Development Environment

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

### Environment Variables
```bash
# Optional: Set site URL for sitemap
SITE_URL=https://asmaan-portfolio.vercel.app
```

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly interactions
- Optimized images and fonts

### Responsive Features
- Flexible grid layouts
- Responsive typography
- Mobile navigation menu
- Touch-optimized buttons
- Responsive images

---

## ♿ Accessibility Features

### Semantic HTML
- Proper heading hierarchy (h1-h6)
- Semantic elements (nav, main, section, article)
- ARIA labels where needed
- Screen reader friendly

### Keyboard Navigation
- Tab order management
- Focus indicators
- Keyboard shortcuts
- Skip links

### Visual Accessibility
- High contrast ratios
- Scalable fonts
- Color-blind friendly palette
- Focus rings

---

## 🔍 SEO Optimization

### Meta Tags
```typescript
export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.shortBio,
  keywords: ['portfolio', 'web developer', 'frontend engineer', 'low-code', 'webflow', 'react'],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://asmaan-portfolio.vercel.app',
    title: `${siteConfig.name} - ${siteConfig.role}`,
    description: siteConfig.shortBio,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - ${siteConfig.role}`,
    description: siteConfig.shortBio,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

### Structured Data
- JSON-LD schema markup
- OpenGraph tags
- Twitter Cards
- Sitemap generation
- Robots.txt

---

## 🛡️ Security Considerations

### Content Security
- No sensitive data in client-side code
- Environment variables for configuration
- Secure headers (Next.js defaults)

### Performance Security
- Optimized bundle sizes
- No unnecessary dependencies
- Clean dependency tree
- Regular updates

---

## 📊 Monitoring & Analytics

### Performance Monitoring
- Core Web Vitals optimization
- Bundle size monitoring
- Build time tracking
- Lighthouse scores

### Analytics Integration
```typescript
// Add to layout.tsx for Google Analytics
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

---

## 🔄 Future Enhancements

### Immediate (Easy Implementation)
- [ ] Real project images
- [ ] Contact form backend integration
- [ ] Google Analytics
- [ ] Custom favicon
- [ ] Loading states

### Medium Term
- [ ] Blog section with MDX
- [ ] Project filtering/tagging
- [ ] Advanced animations
- [ ] Performance monitoring
- [ ] A/B testing

### Long Term
- [ ] CMS integration
- [ ] Multi-language support
- [ ] Progressive Web App features
- [ ] Advanced SEO features
- [ ] Real-time updates

---

## 📋 Maintenance Checklist

### Regular Updates
- [ ] Dependencies updates
- [ ] Security patches
- [ ] Performance monitoring
- [ ] Content updates
- [ ] SEO optimization

### Monitoring
- [ ] Build success/failure
- [ ] Performance metrics
- [ ] User analytics
- [ ] Error tracking
- [ ] Accessibility audits

---

*Technical Specifications Document*  
*Created: September 2024*  
*Version: 1.0*  
*Status: Production Ready*

