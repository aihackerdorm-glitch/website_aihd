import { Home, Users, Calendar, Lightbulb, Phone, Info } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Button } from "@/components/ui/button"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { Link } from 'react-router-dom'
import { COPY } from "@/content/copy"
import { useSiteVisibility } from "@/context/SiteVisibilityContext"

export function Navigation() {
  const { isLinkVisible } = useSiteVisibility();
  // Consolidated nav items with in-page anchors
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/#about', icon: Info },
    { name: 'Events', url: '/#events', icon: Calendar },
    { name: 'Projects', url: '/#projects', icon: Lightbulb },
    { name: 'Team', url: '/#team', icon: Users },
    { name: 'Contact', url: '/#contact', icon: Phone },
  ]
  const filteredItems = navItems.filter((i) => isLinkVisible(i.url))

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="grid grid-cols-3 items-center">
          {/* Logo */}
          <div className="justify-self-start">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity group">
              <div className="relative flex items-center h-full">
                <img 
                  src="/aihackerdorm-logo1.svg" 
                  alt="AI HackerDorm Logo" 
                  className="h-12 w-auto sm:h-14 transition-transform duration-200 hover:scale-105" 
                  style={{
                    minHeight: '48px',
                    maxHeight: '56px',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    padding: '6px 0',
                    marginRight: '8px' // Add some right margin for better spacing
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="justify-self-center">
            <NavBar items={filteredItems} className="relative" />
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
        </div>
      </div>
    </div>
  )
}