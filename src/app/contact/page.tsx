'use client'

import { Mail, MapPin, Linkedin, Github, Calendar, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/site.config'
import { Container } from '@/components/ui/container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/ui/section-heading'

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="py-20">
        <Container>
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <SectionHeading as="h1">Get In Touch</SectionHeading>
            <p className="text-xl text-muted-foreground leading-relaxed">
              I&apos;m always interested in new opportunities and exciting projects. 
              Whether you have a question, want to collaborate, or just want to say hello, 
              I&apos;d love to hear from you.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-muted/30">
        <Container>
          <div className="space-y-12">
            <div className="text-center">
              <SectionHeading>Contact Information</SectionHeading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Email</CardTitle>
                  <CardDescription>Let&apos;s start a conversation</CardDescription>
                </CardHeader>
                <CardContent>
                  <a 
                    href={`mailto:${siteConfig.email}`}
                    className="text-primary hover:underline font-medium"
                  >
                    {siteConfig.email}
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Location</CardTitle>
                  <CardDescription>Based in</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{siteConfig.location}</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Availability</CardTitle>
                  <CardDescription>Current status</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-green-600">Available for opportunities</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Social Links */}
      <section className="py-20">
        <Container>
          <div className="space-y-12">
            <div className="text-center">
              <SectionHeading>Connect With Me</SectionHeading>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Follow me on social media to stay updated with my latest work and insights.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Linkedin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>LinkedIn</CardTitle>
                        <CardDescription>Professional network</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <a 
                      href={siteConfig.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:scale-105"
                    >
                      Connect
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </a>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Github className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>GitHub</CardTitle>
                        <CardDescription>Code repositories</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <a 
                      href={siteConfig.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:scale-105"
                    >
                      View Profile
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Contact */}
      <section className="py-20 bg-muted/30">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ready to Start a Project?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I&apos;m currently available for freelance opportunities and full-time positions. 
                Let&apos;s discuss your project requirements and how I can help bring your vision to life.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`mailto:${siteConfig.email}?subject=Project Inquiry`}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:scale-105"
              >
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a 
                href={`mailto:${siteConfig.email}?subject=General Inquiry`}
                className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-8 py-3 text-base font-medium transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:scale-105"
              >
                Say Hello
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Response Time */}
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-center">What to Expect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-primary">24 Hours</div>
                    <div className="text-sm text-muted-foreground">Response Time</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-primary">Free</div>
                    <div className="text-sm text-muted-foreground">Initial Consultation</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-primary">Flexible</div>
                    <div className="text-sm text-muted-foreground">Project Timeline</div>
                  </div>
                </div>
                <div className="text-center text-sm text-muted-foreground pt-4 border-t">
                  I typically respond to all inquiries within 24 hours. For urgent matters, 
                  please mention it in your email subject line.
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </>
  )
}
