import { useState, useEffect } from 'react';
import { Home, Users, Calendar, Lightbulb, Phone, Info, Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Link, useLocation } from 'react-router-dom';
import { COPY } from "@/content/copy";
import { useSiteVisibility } from "@/context/SiteVisibilityContext";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLinkVisible } = useSiteVisibility();
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Consolidated nav items with in-page anchors
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/#about', icon: Info },
    { name: 'Events', url: '/#events', icon: Calendar },
    { name: 'Projects', url: '/#projects', icon: Lightbulb },
    { name: 'Team', url: '/#team', icon: Users },
    { name: 'Contact', url: '/#contact', icon: Phone },
  ];
  
  const filteredItems = navItems.filter((i) => isLinkVisible(i.url));
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity group">
              <div className="relative flex items-center h-full">
                <img 
                  src="/aihackerdorm-logo1.svg" 
                  alt="AI HackerDorm Logo" 
                  className="h-10 w-auto sm:h-14 transition-transform duration-200 hover:scale-105" 
                  style={{
                    minHeight: '40px',
                    maxHeight: '56px',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    padding: '6px 0',
                    marginRight: '8px'
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavBar items={filteredItems} className="relative" />
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-4 justify-self-end">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </SignInButton>
            <Button asChild className="ai-button-primary" size="sm">
              <a href="https://forms.gle/pbG4FWuLXUFnrmsb7" target="_blank" rel="noopener noreferrer">
                Join Us
              </a>
            </Button>
          </SignedOut>
          <SignedIn>
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Desktop Right-side actions */}
        <div className="hidden md:flex items-center space-x-4">
          <SignedOut>
            <Button asChild variant="outline">
              <SignInButton mode="modal" />
            </Button>
            <Button asChild>
              <a href="https://forms.gle/pbG4FWuLXUFnrmsb7" target="_blank" rel="noopener noreferrer">
                {COPY.hero.ctas.join}
              </a>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Right-side actions */}
        <div className="md:hidden flex items-center space-x-2">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile menu */}
        <div className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "max-h-screen py-4" : "max-h-0 py-0"
        )}>
          <div className="pt-2 pb-3 space-y-2">
            {filteredItems.map((item) => (
              <Link
                key={item.name}
                to={item.url}
                className="block px-3 py-2 text-base font-medium text-foreground/90 hover:text-primary hover:bg-accent/10 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
            
            <SignedOut>
              <div className="pt-2 border-t border-border mt-2">
                <Button asChild variant="outline" className="w-full justify-start mb-2">
                  <SignInButton mode="modal" />
                </Button>
                <Button asChild className="w-full justify-start">
                  <a href="https://forms.gle/pbG4FWuLXUFnrmsb7" target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                      </svg>
                      {COPY.hero.ctas.join}
                    </span>
                  </a>
                </Button>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  )
}