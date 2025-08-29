import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  Users, 
  Trophy, 
  BookOpen, 
  Zap, 
  TrendingUp,
  Clock,
  Star
} from "lucide-react"
import { useUser } from '@clerk/clerk-react'
import { supabase } from "@/integrations/supabase/client"
import { Link } from 'react-router-dom'

interface DashboardData {
  upcomingEvents: any[]
  userRSVPs: any[]
  userProjects: any[]
  clubStats: {
    totalMembers: number
    totalEvents: number
    totalProjects: number
  }
}

export default function DashboardLanding() {
  const { user } = useUser()
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    upcomingEvents: [],
    userRSVPs: [],
    userProjects: [],
    clubStats: {
      totalMembers: 0,
      totalEvents: 0,
      totalProjects: 0
    }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      const { data: events } = await supabase
        .from('events')
        .select('*')
        .gte('starts_at', new Date().toISOString())
        .order('starts_at', { ascending: true })
        .limit(3)

      const { count: upcomingEventsCount } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true })
        .gte('starts_at', new Date().toISOString())

      const { data: rsvps } = await supabase
        .from('rsvps')
        .select(`
          *,
          events (
            id,
            title,
            starts_at,
            venue
          )
        `)
        .eq('user_id', user?.id)
        .limit(5)

      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .eq('owner_id', user?.id)
        .limit(5)

      const { count: membersCount } = await supabase
        .from('memberships')
        .select('*', { count: 'exact', head: true })

      setDashboardData(prev => ({
        ...prev,
        upcomingEvents: events || [],
        userRSVPs: rsvps || [],
        userProjects: projects || [],
        clubStats: {
          totalMembers: membersCount || 0,
          totalEvents: upcomingEventsCount || 0,
          totalProjects: (projects?.length ?? 0)
        }
      }))
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              Please sign in to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/">
              <Button className="w-full">Go Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, <span className="ai-text-gradient">{user?.firstName || 'Member'}</span>!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening in AI Hackerdorm today.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <Card className="ai-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Club Members</p>
                    <h3 className="text-2xl font-bold text-primary">{dashboardData.clubStats.totalMembers}</h3>
                  </div>
                  <Users className="h-8 w-8 text-primary/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="ai-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Events</p>
                    <h3 className="text-2xl font-bold text-accent">{dashboardData.clubStats.totalEvents}</h3>
                  </div>
                  <Calendar className="h-8 w-8 text-accent/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="ai-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Your Projects</p>
                    <h3 className="text-2xl font-bold text-primary">{dashboardData.userProjects.length}</h3>
                  </div>
                  <Trophy className="h-8 w-8 text-primary/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="ai-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Your RSVPs</p>
                    <h3 className="text-2xl font-bold text-accent">{dashboardData.userRSVPs.length}</h3>
                  </div>
                  <Clock className="h-8 w-8 text-accent/60" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="ai-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                  <CardDescription>
                    Don't miss out on these exciting events
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dashboardData.upcomingEvents.length > 0 ? (
                    dashboardData.upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(event.starts_at).toLocaleDateString()} • {event.venue}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">RSVP</Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      No upcoming events. Check back soon!
                    </p>
                  )}
                  <Link to="/events">
                    <Button variant="outline" className="w-full">
                      View All Events
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="ai-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Your Projects
                  </CardTitle>
                  <CardDescription>
                    Your ongoing and completed projects
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dashboardData.userProjects.length > 0 ? (
                    dashboardData.userProjects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{project.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={project.status === 'approved' ? 'default' : 'secondary'}>
                              {project.status}
                            </Badge>
                            {project.tags && project.tags.slice(0, 2).map((tag: string) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground mb-4">
                        No projects yet. Start building something amazing!
                      </p>
                      <Button size="sm">Create Project</Button>
                    </div>
                  )}
                  <Link to="/projects">
                    <Button variant="outline" className="w-full">
                      View All Projects
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card className="ai-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Common actions to get you started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link to="/join">
                    <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center space-y-2">
                      <Users className="h-6 w-6" />
                      <span>Complete Profile</span>
                    </Button>
                  </Link>
                  <Link to="/events">
                    <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center space-y-2">
                      <Calendar className="h-6 w-6" />
                      <span>Browse Events</span>
                    </Button>
                  </Link>
                  <Link to="/resources">
                    <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center space-y-2">
                      <BookOpen className="h-6 w-6" />
                      <span>Learning Resources</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
