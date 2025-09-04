import { Calendar, MapPin, GraduationCap, Award, Star, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/site.config'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/ui/section-heading'

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="py-20">
        <Container>
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <SectionHeading as="h1">About Me</SectionHeading>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {siteConfig.longBio}
            </p>
          </div>
        </Container>
      </section>

      {/* Experience */}
      <section className="py-20 bg-muted/30">
        <Container>
          <div className="space-y-12">
            <div className="text-center">
              <SectionHeading>Work Experience</SectionHeading>
            </div>

            <div className="max-w-4xl mx-auto">
              {siteConfig.experience.map((exp, index) => (
                <Card key={index} className="mb-8 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">{exp.role}</CardTitle>
                        <CardDescription className="text-lg font-medium text-primary">
                          {exp.company}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Key Projects:</h4>
                      <div className="space-y-4">
                        {exp.projects.map((project, projectIndex) => (
                          <div key={projectIndex} className="border-l-2 border-primary/20 pl-4">
                            <h5 className="font-medium text-primary mb-1">{project.name}</h5>
                            <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {project.tech.map((tech) => (
                                <Badge key={tech} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Education */}
      <section className="py-20">
        <Container>
          <div className="space-y-12">
            <div className="text-center">
              <SectionHeading>Education</SectionHeading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {siteConfig.education.map((edu, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{edu.degree}</CardTitle>
                        <CardDescription className="text-base font-medium">
                          {edu.institution}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{edu.period}</span>
                      {edu.type && (
                        <Badge variant="secondary" className="text-xs">
                          {edu.type}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-muted/30">
        <Container>
          <div className="space-y-12">
            <div className="text-center">
              <SectionHeading>Certifications</SectionHeading>
            </div>

            <div className="max-w-2xl mx-auto">
              {siteConfig.certifications.map((cert, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{cert.name}</CardTitle>
                        <CardDescription className="text-base font-medium">
                          {cert.institution}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      {cert.period}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Strengths */}
      <section className="py-20">
        <Container>
          <div className="space-y-12">
            <div className="text-center">
              <SectionHeading>Key Strengths</SectionHeading>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Core competencies that drive my success in delivering high-quality solutions and collaborating effectively with teams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {siteConfig.strengths.map((strength, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Star className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Strength {index + 1}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {strength}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Skills Overview */}
      <section className="py-20 bg-muted/30">
        <Container>
          <div className="space-y-12">
            <div className="text-center">
              <SectionHeading>Technical Skills</SectionHeading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center">Languages</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {siteConfig.skills.languages.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center">Frameworks</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {siteConfig.skills.frameworks.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center">Platforms</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {siteConfig.skills.platforms.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center">Tools</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {siteConfig.skills.tools.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <Container>
          <div className="text-center space-y-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">Ready to Work Together?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I&apos;m always interested in new opportunities and exciting projects. 
              Let&apos;s discuss how we can bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:scale-105"
              >
                Get In Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a 
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-8 py-3 text-base font-medium transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:scale-105"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
