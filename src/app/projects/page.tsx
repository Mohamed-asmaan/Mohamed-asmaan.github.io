import Link from 'next/link'
import { ArrowRight, ExternalLink, Code, Globe, Database, Zap } from 'lucide-react'
import { siteConfig } from '@/site.config'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/ui/section-heading'

export default function ProjectsPage() {
  return (
    <>
      {/* Header */}
      <section className="py-20">
        <Container>
          <div className="text-center space-y-8">
            <SectionHeading as="h1">Projects</SectionHeading>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A collection of my work showcasing expertise in low-code development, 
              React frontend development, and AI integration. Each project represents 
              a unique challenge and solution.
            </p>
          </div>
        </Container>
      </section>

      {/* Company Projects */}
      <section className="py-20 bg-muted/30">
        <Container>
          <div className="space-y-12">
            <div className="text-center">
              <SectionHeading>Company Projects</SectionHeading>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Professional work at Alspark.solutions focusing on CMS management, 
                React development, and performance optimization.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {siteConfig.experience[0].projects.map((project, index) => (
                <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                          <Code className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-sm font-medium text-primary">{project.name}</p>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Alspark.solutions • {siteConfig.experience[0].period}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Freelance Projects */}
      <section className="py-20">
        <Container>
          <div className="space-y-12">
            <div className="text-center">
              <SectionHeading>Freelance Work</SectionHeading>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                End-to-end website delivery including design, CMS setup, SEO configuration, 
                DNS/domain mapping, and performance optimization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {siteConfig.freelanceProjects.map((project, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="text-xs">{project.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
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
      <section className="py-20 bg-muted/30">
        <Container>
          <div className="space-y-12">
            <div className="text-center">
              <SectionHeading>Independent Projects</SectionHeading>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Personal projects exploring AI integration, machine learning, and innovative solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {siteConfig.independentProjects.map((project, index) => (
                <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                          {index === 0 ? <Zap className="h-8 w-8 text-primary" /> : <Database className="h-8 w-8 text-primary" />}
                        </div>
                        <p className="text-sm font-medium text-primary">{project.name}</p>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {project.name}
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="leading-relaxed">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
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

      {/* Project Statistics */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {siteConfig.experience[0].projects.length + siteConfig.freelanceProjects.length + siteConfig.independentProjects.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {siteConfig.experience[0].period.split('–')[1] === 'Present' ? '1+' : '1'}
              </div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {siteConfig.freelanceProjects.length}
              </div>
              <div className="text-sm text-muted-foreground">Freelance Clients</div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
