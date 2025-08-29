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
            <SignInButton mode="modal" fallbackRedirectUrl="/join">
              <Button className="ai-button-primary" size="sm">
                Join Us
              </Button>
            </SignInButton>
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
              <a href="https://discord.gg/aihackerdorm" target="_blank" rel="noopener noreferrer">
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
                  <a href="https://discord.gg/aihackerdorm" target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.078-.01c3.928 1.8 8.18 1.8 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.008.128 12.3 12.3 0 01-1.873.892.077.077 0 00-.041.106c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418z" />
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