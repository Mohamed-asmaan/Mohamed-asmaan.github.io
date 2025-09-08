'use client'

import Link from 'next/link'
import { ArrowRight, Calendar, MapPin, Mail, Linkedin, Github, ExternalLink, Code, Globe, Database, Zap, ChevronRight } from 'lucide-react'
import { siteConfig } from '@/site.config'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/ui/section-heading'
import { useGsapAnimations, useStaggerAnimation, useParallaxAnimation } from '@/hooks/use-gsap-animations'

export default function HomePage() {
  const heroRef = useGsapAnimations()
  const expertiseRef = useStaggerAnimation()
  const skillsRef = useStaggerAnimation()
  const projectsRef = useStaggerAnimation()
  const freelanceRef = useStaggerAnimation()
  const independentRef = useStaggerAnimation()
  const statusRef = useGsapAnimations()
  const parallaxRef = useParallaxAnimation()

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
        <div ref={parallaxRef} className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <Container>
          <div className="text-center space-y-8 max-w-4xl mx-auto relative z-10">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                Available for opportunities
              </div>
              
              <h1 className="text-6xl font-bold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block text-foreground">M. Mohamed</span>
                <span className="block text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Asmaan</span>
              </h1>
              
              <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                {siteConfig.role}
              </p>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {siteConfig.shortBio}
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{siteConfig.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{siteConfig.email}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/projects"
                className="group inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:scale-105"
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contact"
                className="group inline-flex items-center justify-center rounded-lg border border-input bg-background px-8 py-4 text-base font-medium transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:scale-105"
              >
                Get In Touch
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-4 pt-8">
              <Link 
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:scale-105"
              >
                <Linkedin className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                LinkedIn
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Expertise Section */}
      <section ref={expertiseRef} className="py-32 bg-muted/30">
        <Container>
          <div className="flex flex-col items-center space-y-16">
            <div data-animate>
              <SectionHeading>What I Do</SectionHeading>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {siteConfig.expertise.map((expertise, index) => (
                <Card key={index} data-animate className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-white/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                        {index === 0 && <Code className="h-6 w-6 text-primary" />}
                        {index === 1 && <Zap className="h-6 w-6 text-primary" />}
                        {index === 2 && <Globe className="h-6 w-6 text-primary" />}
                        {index === 3 && <Code className="h-6 w-6 text-primary" />}
                        {index === 4 && <Database className="h-6 w-6 text-primary" />}
                        {index === 5 && <Globe className="h-6 w-6 text-primary" />}
                        {index === 6 && <Zap className="h-6 w-6 text-primary" />}
                      </div>
                      <CardTitle className="text-xl">{expertise.split('(')[0].trim()}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {expertise.includes('(') ? expertise.split('(')[1].replace(')', '') : expertise}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-32">
        <Container>
          <div className="flex flex-col items-center space-y-16">
            <div data-animate>
              <SectionHeading>Skills & Technologies</SectionHeading>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="space-y-6" data-animate>
                <h3 className="text-xl font-semibold">Languages</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {siteConfig.skills.languages.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm px-4 py-2 hover:scale-110 transition-transform">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6" data-animate>
                <h3 className="text-xl font-semibold">Frameworks</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {siteConfig.skills.frameworks.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm px-4 py-2 hover:scale-110 transition-transform">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6" data-animate>
                <h3 className="text-xl font-semibold">Platforms</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {siteConfig.skills.platforms.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm px-4 py-2 hover:scale-110 transition-transform">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-6" data-animate>
                <h3 className="text-xl font-semibold">Tools</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {siteConfig.skills.tools.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm px-4 py-2 hover:scale-110 transition-transform">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Projects */}
      <section ref={projectsRef} className="py-32 bg-muted/30">
        <Container>
          <div className="flex flex-col items-center space-y-16">
            <div className="text-center" data-animate>
              <SectionHeading>Featured Projects</SectionHeading>
              <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg">
                Here are some of my recent projects showcasing my expertise in low-code development, 
                React frontend development, and AI integration.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {siteConfig.experience[0].projects.map((project, index) => (
                <Card key={index} data-animate className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-white/50 backdrop-blur-sm">
                  <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                          <Code className="h-10 w-10 text-primary" />
                        </div>
                        <p className="text-lg font-medium text-primary">{project.name}</p>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors text-xl">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="leading-relaxed text-base">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Alspark.solutions • {siteConfig.experience[0].period}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center" data-animate>
              <Link 
                href="/projects"
                className="group inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:scale-105"
              >
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Freelance Projects */}
      <section ref={freelanceRef} className="py-32">
        <Container>
          <div className="flex flex-col items-center space-y-16">
            <div className="text-center" data-animate>
              <SectionHeading>Freelance Work</SectionHeading>
              <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg">
                End-to-end website delivery including design, CMS setup, SEO configuration, 
                DNS/domain mapping, and performance optimization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {siteConfig.freelanceProjects.map((project, index) => (
                <Card key={index} data-animate className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-white/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="text-sm">{project.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Independent Projects */}
      <section ref={independentRef} className="py-32 bg-muted/30">
        <Container>
          <div className="flex flex-col items-center space-y-16">
            <div className="text-center" data-animate>
              <SectionHeading>Independent Projects</SectionHeading>
              <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg">
                Personal projects exploring AI integration, machine learning, and innovative solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {siteConfig.independentProjects.map((project, index) => (
                <Card key={index} data-animate className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-white/50 backdrop-blur-sm">
                  <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                          {index === 0 ? <Zap className="h-10 w-10 text-primary" /> : <Database className="h-10 w-10 text-primary" />}
                        </div>
                        <p className="text-lg font-medium text-primary">{project.name}</p>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="group-hover:text-primary transition-colors text-xl">
                        {project.name}
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="leading-relaxed text-base">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Current Status */}
      <section ref={statusRef} className="py-32">
        <Container>
          <div className="flex justify-center">
            <div className="max-w-3xl">
            <Card className="border-primary/20 bg-white/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">What I&apos;m Up To Now</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Currently working on an AI-powered Chrome extension for intelligent task management 
                  and calendar integration. Also actively contributing to web development projects 
                  at Alspark.solutions.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Learning and exploring new low-code platforms and AI integration techniques 
                  to enhance my development capabilities.
                </p>
                <div className="text-sm text-muted-foreground pt-6 border-t">
                  Last updated: {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </CardContent>
            </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
