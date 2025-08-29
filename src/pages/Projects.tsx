import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, ExternalLink, Search, Filter } from "lucide-react"
import { Navigation } from "@/components/Navigation"
import { supabase } from "@/integrations/supabase/client"
import Footer from "@/components/ui/animated-footer"
import { VoteButtons } from "@/components/VoteButtons"

interface Project {
  id: string
  title: string
  summary: string
  description: string
  repo_url: string
  demo_url: string
  image_url: string
  tags: string[]
  owner_id: string
  owner_name?: string
}

const SAMPLE_PROJECTS = [
  {
    id: "1",
    title: "AI Chatbot for Student Support",
    summary: "Intelligent chatbot to help students with academic queries",
    description: "A comprehensive AI-powered chatbot built with Python and OpenAI's GPT API. Features include course recommendations, study planning, and 24/7 academic support.",
    repo_url: "https://github.com/sample/ai-chatbot",
    demo_url: "https://chatbot-demo.vercel.app",
    image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
    tags: ["NLP", "Python", "OpenAI", "React"],
    owner_id: "1",
    owner_name: "Alex Chen"
  },
  {
    id: "2", 
    title: "Computer Vision Food Recognition",
    summary: "Mobile app that identifies food and tracks nutrition",
    description: "Using TensorFlow and CNN models to identify food items from photos and provide nutritional information. Includes calorie tracking and meal planning features.",
    repo_url: "https://github.com/sample/food-vision",
    demo_url: "https://food-app-demo.netlify.app",
    image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    tags: ["Computer Vision", "TensorFlow", "Mobile", "Health"],
    owner_id: "2",
    owner_name: "Sarah Kim"
  },
  {
    id: "3",
    title: "Smart Campus Navigation",
    summary: "AR-powered navigation system for university campus",
    description: "Augmented reality navigation app that helps students and visitors navigate the campus. Features include indoor mapping, class scheduling integration, and crowd density visualization.",
    repo_url: "https://github.com/sample/campus-nav",
    demo_url: "https://campus-nav.vercel.app",
    image_url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400",
    tags: ["AR", "Unity", "Machine Learning", "Mobile"],
    owner_id: "3",
    owner_name: "Jordan Lee"
  }
]

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [projects, searchTerm, selectedTags])

  const fetchProjects = async () => {
    // First try to fetch projects with owner names
    const { data: projectsData, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'approved')

    if (projectsError) {
      console.error('Error fetching projects:', projectsError)
      // Use sample data as fallback
      setProjects(SAMPLE_PROJECTS)
      const tags = Array.from(new Set(SAMPLE_PROJECTS.flatMap(p => p.tags)))
      setAllTags(tags)
      return
    }

    // If we have projects, fetch the owner names separately
    if (projectsData && projectsData.length > 0) {
      const ownerIds = [...new Set(projectsData.map(p => p.owner_id))]
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, name')
        .in('user_id', ownerIds)

      // Create a map of owner_id to name
      const ownerMap = new Map()
      if (profilesData) {
        profilesData.forEach(profile => {
          ownerMap.set(profile.user_id, profile.name)
        })
      }

      // Transform the data to include owner names
      const transformedData = projectsData.map(project => ({
        ...project,
        owner_name: ownerMap.get(project.owner_id) || 'Anonymous'
      }))

      setProjects(transformedData)
      const tags = Array.from(new Set(transformedData.flatMap(p => p.tags)))
      setAllTags(tags)
    } else {
      // No projects found, use sample data
      setProjects(SAMPLE_PROJECTS)
      const tags = Array.from(new Set(SAMPLE_PROJECTS.flatMap(p => p.tags)))
      setAllTags(tags)
    }
  }

  const filterProjects = () => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(project =>
        selectedTags.every(tag => project.tags.includes(tag))
      )
    }

    setFilteredProjects(filtered)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="ai-text-gradient">Student Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover amazing AI projects built by our community members. From machine learning models to computer vision apps, explore the innovation happening at AI Hackerdorm.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 space-y-4"
          >
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {allTags.length > 0 && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">Filter by tags:</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {allTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="ai-card h-full flex flex-col">
                  {project.image_url && (
                    <div className="aspect-video relative overflow-hidden rounded-t-xl">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription>{project.summary}</CardDescription>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>by {project.owner_name || 'Anonymous'}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground mb-4 flex-1">
                      {project.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <VoteButtons id={project.id} />
                      </div>

                      <div className="flex gap-2">
                        {project.repo_url && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" />
                              Code
                            </a>
                          </Button>
                        )}
                        {project.demo_url && (
                          <Button size="sm" asChild>
                            <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <h3 className="text-2xl font-semibold mb-4">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters
              </p>
              <Button onClick={() => {
                setSearchTerm("")
                setSelectedTags([])
              }}>
                Clear Filters
              </Button>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="ai-card max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Share Your Project</h3>
              <p className="text-muted-foreground mb-6">
                Built something amazing? We'd love to feature your AI project in our gallery!
              </p>
              <Button className="ai-button-primary">
                Submit Project
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer
        leftLinks={[
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/terms", label: "Terms of Service" },
        ]}
        rightLinks={[
          { href: "/about", label: "About" },
          { href: "/team", label: "Team" },
          { href: "/contact", label: "Contact" },
          { href: "https://github.com/taylors-ai-club", label: "GitHub" },
        ]}
        copyrightText="AI Hackerdorm 2024. All Rights Reserved"
      />
    </div>
  )
}