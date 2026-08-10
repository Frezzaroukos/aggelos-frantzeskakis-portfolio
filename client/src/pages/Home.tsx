import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

/**
 * Pegasus Portfolio - Minimalist Elegance with Motion
 * 
 * Design Philosophy: Ethereal Motion
 * - Negative space as design principle
 * - Smooth animations guide attention
 * - Refined typography with serif/sans-serif pairing
 * - Monochromatic elegance with soft gold accents
 */

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const pegasusRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">P</span>
            </div>
            <span className="font-serif font-semibold text-lg">Pegasus</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#work" className="text-sm hover:text-accent transition-colors duration-200">
              Work
            </a>
            <a href="#about" className="text-sm hover:text-accent transition-colors duration-200">
              About
            </a>
            <a href="#contact" className="text-sm hover:text-accent transition-colors duration-200">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
            {/* Text Content */}
            <div
              ref={heroTextRef}
              className="space-y-8 opacity-0 animate-in fade-in duration-1000"
              style={{
                transform: `translateY(${scrollY * 0.2}px)`,
              }}
            >
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-serif font-bold leading-tight">
                  Where Creativity
                  <span className="block text-accent">Takes Flight</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                  Crafted with precision, animated with purpose. Discover a digital sanctuary where elegance meets motion.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Explore My Work
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-foreground/20 hover:border-accent hover:text-accent transition-all duration-300"
                >
                  Let's Create
                </Button>
              </div>
            </div>

            {/* Pegasus Image */}
            <div
              ref={pegasusRef}
              className="relative h-96 lg:h-full flex items-center justify-center"
              style={{
                transform: `translateY(${scrollY * 0.15}px) rotateZ(${scrollY * 0.02}deg)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl" />
              <img
                src="/manus-storage/pegasus_4e36f0f3.png"
                alt="Pegasus"
                className="w-full h-full object-contain drop-shadow-2xl animate-in fade-in duration-1000 delay-300"
                style={{
                  animation: "float 6s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <svg
        className="w-full h-auto"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 Q300,10 600,50 T1200,50 L1200,120 L0,120 Z"
          fill="oklch(0.95 0.002 0)"
        />
      </svg>

      {/* Featured Work Section */}
      <section id="work" className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16 space-y-4 opacity-0 animate-in fade-in duration-1000" style={{ animationDelay: "200ms" }}>
            <h2 className="text-5xl font-serif font-bold">Featured Work</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A selection of projects that showcase the intersection of design, motion, and functionality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg bg-white border border-border hover:border-accent transition-all duration-300 hover:shadow-xl opacity-0 animate-in fade-in duration-1000"
                style={{ animationDelay: `${200 + i * 100}ms` }}
              >
                <div className="aspect-video bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-accent/20 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-accent font-bold">{i}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Project {i}</p>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-serif font-semibold text-lg group-hover:text-accent transition-colors">
                    Project Title
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    A brief description of this amazing project and the value it delivered.
                  </p>
                  <div className="pt-4">
                    <a href="#" className="text-sm font-medium text-accent hover:underline">
                      View Project →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 opacity-0 animate-in fade-in duration-1000">
              <h2 className="text-5xl font-serif font-bold">About Me</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm a creative professional passionate about crafting digital experiences that inspire and engage.
                </p>
                <p>
                  With a focus on minimalist design and smooth animations, I bring ideas to life through thoughtful design and precise execution.
                </p>
                <p>
                  Every project is an opportunity to create something meaningful and beautiful.
                </p>
              </div>
              <Button
                variant="outline"
                className="border-foreground/20 hover:border-accent hover:text-accent transition-all duration-300"
              >
                Download CV
              </Button>
            </div>

            <div className="relative h-96 opacity-0 animate-in fade-in duration-1000 delay-300">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl" />
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <p className="text-center">Profile Image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-foreground text-background">
        <div className="container text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-serif font-bold">Let's Work Together</h2>
            <p className="text-lg text-background/80 max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it. Get in touch and let's create something amazing.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Get In Touch
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-secondary/30">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2026 Pegasus Portfolio. Crafted with precision and animated with purpose.</p>
        </div>
      </footer>

      {/* Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
