import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/ui/section-heading'

// Project data (in a real app, this would come from MDX files)
const projects = [
  {
    title: "Bangla Health Connect",
    slug: "bangla-health-connect",
    description: "A comprehensive healthcare platform built with Webflow CMS, featuring SEO optimization and performance tuning.",
    stack: ["Webflow", "CMS", "SEO", "DNS/CDN"],
    cover: "/projects/bangla-health-connect.jpg",
    demo: "https://banglahealthconnect.com",
    repo: "",
    content: `
# Bangla Health Connect

A comprehensive healthcare platform that connects patients with healthcare providers in Bangladesh. Built using Webflow's powerful CMS capabilities with a focus on performance, SEO, and user experience.

## Key Features

- **CMS Management**: Structured content management system for healthcare providers and services
- **SEO Optimization**: Comprehensive meta tags, sitemaps, and indexing for better search visibility
- **Performance Tuning**: Optimized load times through CDN configuration and image optimization
- **Responsive Design**: Mobile-first approach ensuring accessibility across all devices
- **Domain Configuration**: Proper DNS setup and reverse proxy for secure delivery

## Technical Implementation

The project utilized Webflow's CMS capabilities to create a scalable platform that could handle dynamic content updates while maintaining performance standards. Key technical achievements include:

- Configured Cloudflare CDN for global content delivery
- Implemented structured data for better search engine understanding
- Optimized images and assets for faster loading
- Set up proper redirects and URL structure
- Integrated analytics and tracking systems

## Results

- Improved page load times by 40%
- Enhanced search engine visibility with proper SEO implementation
- Increased user engagement through improved accessibility
- Streamlined content management workflow for the client
    `
  },
  {
    title: "NumberLink - Chat to Bio Link Tool",
    slug: "numberlink-chat",
    description: "A React-based chat-to-bio-link tool with optimized state management and reusable UI components.",
    stack: ["React", "JavaScript", "API Integration", "UI/UX"],
    cover: "/projects/numberlink.jpg",
    demo: "https://numberlink.app",
    repo: "",
    content: `
# NumberLink - Chat to Bio Link Tool

A modern React application that transforms chat conversations into shareable bio links. Built with performance and user experience in mind, featuring reusable components and optimized state management.

## Key Features

- **Chat Interface**: Intuitive chat UI with real-time message handling
- **Bio Link Generation**: Automatic conversion of conversations to shareable links
- **Responsive Design**: Mobile-first approach with seamless cross-device experience
- **State Management**: Optimized React state handling for smooth interactions
- **API Integration**: Seamless backend communication for data persistence

## Technical Implementation

The project showcases modern React development practices with a focus on component reusability and performance optimization:

- **Component Architecture**: Built modular, reusable UI components
- **State Optimization**: Implemented efficient state management patterns
- **API Integration**: Seamless integration with backend services
- **Performance**: Optimized rendering and data flow
- **Accessibility**: Ensured keyboard navigation and screen reader support

## Development Highlights

- Designed and implemented custom UI components library
- Integrated RESTful APIs for data fetching and updates
- Implemented error handling and loading states
- Optimized bundle size and loading performance
- Added comprehensive form validation and user feedback

## Results

- Improved application performance by 35%
- Enhanced user experience through intuitive interface design
- Reduced component re-renders through optimized state management
- Streamlined development workflow with reusable components
    `
  },
  {
    title: "AI-Powered Chrome Extension",
    slug: "ai-chrome-extension",
    description: "An AI-driven event and task management Chrome extension integrated with Google Calendar for intelligent scheduling.",
    stack: ["JavaScript", "Chrome Extensions", "AI Integration", "Google Calendar API"],
    cover: "/projects/ai-chrome-extension.jpg",
    demo: "",
    repo: "",
    content: `
# AI-Powered Chrome Extension

A sophisticated Chrome extension that leverages artificial intelligence to streamline event and task management through seamless Google Calendar integration. Currently in active development, this project demonstrates advanced AI integration with browser extensions.

## Key Features

- **AI-Assisted Scheduling**: Intelligent event creation and task management
- **Google Calendar Integration**: Seamless sync with Google Calendar API
- **Prompt-Based Workflows**: Natural language processing for task creation
- **Intuitive UI**: User-friendly interface for managing events and tasks
- **Browser Integration**: Native Chrome extension functionality

## Technical Implementation

The extension utilizes modern web technologies and AI capabilities to provide intelligent task management:

- **Chrome Extension API**: Leverages Chrome's extension framework for seamless browser integration
- **Google Calendar API**: OAuth 2.0 integration for secure calendar access
- **AI Integration**: Natural language processing for intelligent task interpretation
- **State Management**: Efficient data handling and synchronization
- **Security**: Secure API key management and user data protection

## Development Progress

Currently in active development with the following milestones achieved:

- ✅ Chrome extension manifest and basic structure
- ✅ Google Calendar API integration setup
- ✅ AI prompt processing framework
- ✅ Basic UI components and user interface
- 🔄 Advanced AI workflow implementation
- 🔄 Enhanced scheduling algorithms
- 🔄 Performance optimization and testing

## Technical Challenges

- **API Rate Limiting**: Managing Google Calendar API quotas efficiently
- **AI Integration**: Balancing AI capabilities with extension performance
- **Cross-Platform Compatibility**: Ensuring consistent behavior across different Chrome versions
- **Data Synchronization**: Real-time sync between extension and Google Calendar

## Future Enhancements

- Advanced AI scheduling recommendations
- Multi-calendar support
- Team collaboration features
- Mobile companion app
- Integration with other productivity tools
    `
  }
]

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug)

  if (!project) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Container>
          <div className="text-center space-y-8">
            <h1 className="text-2xl font-semibold">Project Not Found</h1>
                          <p className="text-muted-foreground">
                The project you&apos;re looking for doesn&apos;t exist.
              </p>
            <Link 
              href="/projects"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <section className="py-20">
        <Container>
          <div className="space-y-8">
            <Link 
              href="/projects"
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
            
            <div className="space-y-4">
              <SectionHeading as="h1">{project.title}</SectionHeading>
              <p className="text-xl text-muted-foreground max-w-3xl">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {project.demo && (
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Demo
                </a>
              )}
              {project.repo && (
                <a 
                  href={project.repo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Source Code
                </a>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Project Image */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center">
              <span className="text-muted-foreground text-lg">Project Screenshot</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Project Content */}
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: project.content.replace(/\n/g, '<br/>') }} />
          </div>
        </Container>
      </section>
    </>
  )
}
