import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Briefcase,
  Code,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ContactForm } from "@/components/ContactForm";
import { cn } from "@/lib/utils";
// Mock Data
const SKILLS = [
  "React", "TypeScript", "Node.js", "Cloudflare Workers", "Tailwind CSS",
  "Framer Motion", "Next.js", "GraphQL", "PostgreSQL", "Docker", "Kubernetes", "CI/CD"
];
const PROJECTS = [
  {
    id: 1,
    title: "Edge-Native Analytics",
    description: "A high-performance analytics platform built on Cloudflare Workers, delivering real-time insights with zero latency.",
    tags: ["Cloudflare Workers", "React", "Durable Objects", "Recharts"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
    details: "This project leverages the power of edge computing to process and visualize data directly at the network edge. By using Durable Objects for stateful coordination and Workers for computation, we achieved sub-millisecond query responses. The frontend is a highly interactive dashboard built with React and Recharts, providing users with a seamless experience."
  },
  {
    id: 2,
    title: "Serverless E-commerce",
    description: "A scalable and resilient e-commerce backend using a serverless architecture, ensuring high availability and low cost.",
    tags: ["Node.js", "Serverless", "GraphQL", "Stripe"],
    image: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=800",
    details: "Built a complete e-commerce platform from the ground up on a serverless stack. The architecture is designed for massive scale and cost-efficiency, only paying for what is used. Integrated Stripe for payments and used GraphQL to provide a flexible API for the frontend client."
  },
  {
    id: 3,
    title: "Interactive Design System",
    description: "A comprehensive design system and component library for a large-scale enterprise application, built with React and Storybook.",
    tags: ["React", "TypeScript", "shadcn/ui", "Storybook"],
    image: "https://images.unsplash.com/photo-1611175752227-41d70facf0f1?q=80&w=800",
    details: "Developed a robust and accessible component library to unify UI/UX across multiple product teams. Each component was meticulously crafted, tested, and documented in Storybook. This initiative significantly improved development velocity and design consistency."
  },
];
const EXPERIENCE = [
  {
    role: "Senior Full-Stack Engineer",
    company: "Cloudflare",
    period: "2021 - Present",
    description: "Building mission-critical infrastructure and user-facing products on the Cloudflare stack. Leading projects from conception to deployment, focusing on performance, security, and developer experience.",
  },
  {
    role: "Software Engineer",
    company: "Vercel",
    period: "2019 - 2021",
    description: "Contributed to the Next.js framework and the Vercel platform. Worked on improving build performance, developer tooling, and creating delightful user experiences for millions of developers.",
  },
  {
    role: "Frontend Developer",
    company: "Stripe",
    period: "2017 - 2019",
    description: "Developed and maintained user interfaces for Stripe's core products, including the Dashboard and Checkout. Focused on creating pixel-perfect, accessible, and performant web applications.",
  },
];
const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];
const MotionCard = motion(Card);
const Section = React.forwardRef<
  HTMLElement,
  { children: React.ReactNode; className?: string; id: string }
>(({ children, className, id }, ref) => (
  <motion.section
    ref={ref}
    id={id}
    className={cn("py-16 md:py-24", className)}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.section>
));
Section.displayName = "Section";
export function HomePage() {
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingProjects(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);
  const headerRef = useRef<HTMLElement>(null);
  return (
    <div className="bg-background text-foreground">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F38020] to-[#4F46E5] origin-left z-50"
        style={{ scaleX }}
      />
      <ThemeToggle className="fixed top-4 right-4 z-50" />
      <header ref={headerRef} className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F38020] to-[#4F46E5] flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-lg">L</span>
            </div>
            <span className="font-display text-xl font-bold">Lumina</span>
          </a>
          <nav className="hidden md:flex items-center space-x-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-8">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <a
                        href={link.href}
                        className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main>
        {/* Hero Section */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
          >
            <div className="blur-[106px] h-56 bg-gradient-to-br from-[#F38020] to-[#4F46E5]"></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-[#4F46E5] to-[#F38020]"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-24 md:py-32 lg:py-40 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Avatar className="w-24 h-24 mx-auto mb-6 border-4 border-background shadow-lg">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Lumina" />
                  <AvatarFallback>L</AvatarFallback>
                </Avatar>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter">
                  Lumina Portfolio
                </h1>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  A passionate Full-Stack Engineer crafting high-performance, visually stunning web applications.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <Button asChild size="lg" className="btn-gradient">
                    <a href="#projects">
                      <Briefcase className="mr-2 h-4 w-4" /> View Projects
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href="/resume.pdf" download>
                      <Download className="mr-2 h-4 w-4" /> Download CV
                    </a>
                  </Button>
                </div>
                <div className="mt-8 flex justify-center gap-6">
                  <a href="#" className="text-muted-foreground hover:text-foreground"><Github /></a>
                  <a href="#" className="text-muted-foreground hover:text-foreground"><Linkedin /></a>
                  <a href="mailto:hello@lumina.dev" className="text-muted-foreground hover:text-foreground"><Mail /></a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* About Section */}
          <Section id="about">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-display font-bold">About Me</h2>
                <p className="text-muted-foreground text-lg">
                  I'm a seasoned engineer with a passion for building beautiful, functional, and scalable web applications. My expertise lies in the modern web stack, from crafting pixel-perfect user interfaces with React and Tailwind CSS to architecting robust backend systems on serverless platforms like Cloudflare Workers.
                </p>
                <p className="text-muted-foreground text-lg">
                  I thrive in fast-paced environments and enjoy tackling complex challenges. I'm always learning and exploring new technologies to push the boundaries of what's possible on the web.
                </p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-soft">
                <img src="https://images.unsplash.com/photo-1521185496955-15097b20c5fe?q=80&w=800" alt="Workspace" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
              </div>
            </div>
          </Section>
          {/* Skills Section */}
          <Section id="skills">
            <h2 className="text-3xl font-display font-bold text-center">My Tech Stack</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {SKILLS.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm px-4 py-2 rounded-lg">
                  {skill}
                </Badge>
              ))}
            </div>
          </Section>
          {/* Experience Section */}
          <Section id="experience">
            <h2 className="text-3xl font-display font-bold text-center">Work Experience</h2>
            <div className="mt-12 relative">
              <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-border" aria-hidden="true"></div>
              <div className="space-y-12">
                {EXPERIENCE.map((job, index) => (
                  <div key={index} className="relative flex items-center md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 border-primary shrink-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div className="w-[calc(50%-2.5rem)] md:w-0 shrink-0"></div>
                    <Card className="w-full md:w-[calc(50%-2.5rem)] shadow-soft">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{job.role}</CardTitle>
                            <CardDescription>{job.company}</CardDescription>
                          </div>
                          <Badge variant="outline">{job.period}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">{job.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </Section>
          {/* Projects Section */}
          <Section id="projects">
            <h2 className="text-3xl font-display font-bold text-center">Featured Projects</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoadingProjects
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="h-48 w-full rounded-2xl" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))
                : PROJECTS.map((project) => (
                    <MotionCard
                      key={project.id}
                      className="overflow-hidden rounded-2xl shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                      layoutId={`card-container-${project.id}`}
                    >
                      <div className="aspect-video overflow-hidden">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      </div>
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </MotionCard>
                  ))}
            </div>
          </Section>
          {/* Contact Section */}
          <Section id="contact">
            <Card className="max-w-2xl mx-auto shadow-soft">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-display font-bold">Get In Touch</CardTitle>
                <CardDescription>Have a project in mind or just want to say hi? Drop me a line.</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </Section>
        </div>
      </main>
      <footer className="py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Lumina Portfolio. Built with ❤️ at Cloudflare.</p>
        </div>
      </footer>
      <Sheet open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <SheetContent className="w-full sm:max-w-2xl p-0">
          {selectedProject && (
            <div className="h-full flex flex-col">
              <SheetHeader className="p-6 border-b">
                <SheetTitle className="text-2xl font-display">{selectedProject.title}</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">{selectedProject.details}</p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
      <Toaster richColors closeButton />
    </div>
  );
}