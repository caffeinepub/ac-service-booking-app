import { Wind, Phone } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'ac-service-app'
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                <img
                  src="/assets/generated/ac-service-logo.dim_200x200.png"
                  alt="AC Service"
                  className="w-8 h-8"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AC Service Pro</h1>
                <p className="text-sm text-muted-foreground">Professional Air Conditioning Services</p>
              </div>
            </div>
            
            <a 
              href="tel:+919876543210" 
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
            >
              <Phone className="w-5 h-5" />
              <div className="flex flex-col items-start">
                <span className="text-xs opacity-90">Contact Us</span>
                <span className="text-base font-semibold">+91 98765 43210</span>
              </div>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4" />
              <span>© {currentYear} AC Service Pro. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Built with</span>
              <span className="text-destructive">♥</span>
              <span>using</span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary transition-colors"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
