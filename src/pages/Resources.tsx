import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BookOpen, Video, Code, Brain, ExternalLink, Download } from "lucide-react"
import { Navigation } from "@/components/Navigation"
import { supabase } from "@/integrations/supabase/client"
import Footer from "@/components/ui/animated-footer"
import { MagnetLines } from "@/components/ui/magnet-lines"

interface Resource {
  id: string
  title: string
  description: string
  type: string
  url: string
  storage_path: string
  tags: string[]
}

const SAMPLE_RESOURCES = [
  {
    id: "1",
    title: "Machine Learning Fundamentals",
    description: "Complete course covering basics of ML algorithms, supervised and unsupervised learning.",
    type: "Course",
    url: "https://coursera.org/learn/machine-learning",
    storage_path: "",
    tags: ["Beginner", "Machine Learning", "Theory"]
  },
  {
    id: "2",
    title: "PyTorch Tutorial Series",
    description: "Hands-on tutorials for building neural networks with PyTorch framework.",
    type: "Tutorial",
    url: "https://pytorch.org/tutorials/",
    storage_path: "",
    tags: ["PyTorch", "Deep Learning", "Practical"]
  },
  {
    id: "3",
    title: "AI Ethics Guidelines",
    description: "Essential reading on responsible AI development and ethical considerations.",
    type: "Document",
    url: "",
    storage_path: "/documents/ai-ethics-guide.pdf",
    tags: ["Ethics", "Guidelines", "Policy"]
  },
  {
    id: "4",
    title: "Computer Vision with OpenCV",
    description: "Workshop materials covering image processing and computer vision basics.",
    type: "Workshop",
    url: "",
    storage_path: "/materials/cv-workshop.zip",
    tags: ["Computer Vision", "OpenCV", "Workshop"]
  }
]

const LEARNING_TRACKS = [
  {
    title: "Beginner Track",
    description: "Start your AI journey with foundational concepts",
    courses: [
      "Introduction to AI and Machine Learning",
      "Python for Data Science", 
      "Statistics and Probability",
      "Linear Algebra Basics",
      "First ML Project"
    ]
  },
  {
    title: "Build Track", 
    description: "Create real-world AI applications",
    courses: [
      "Deep Learning with TensorFlow",
      "Natural Language Processing",
      "Computer Vision Projects",
      "MLOps and Deployment",
      "Capstone Project"
    ]
  },
  {
    title: "Research Track",
    description: "Dive deep into AI research and innovation",
    courses: [
      "Advanced Neural Networks",
      "Research Methodology",
      "Paper Reading Seminars",
      "Thesis Preparation",
      "Conference Presentations"
    ]
  }
]

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([])
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching resources:', error)
      setResources(SAMPLE_RESOURCES)
    } else {
      setResources(data || [])
    }
  }

  const filteredResources = resources.filter(resource => {
    if (activeTab === "all") return true
    return resource.type.toLowerCase() === activeTab
  })

  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "course": return BookOpen
      case "tutorial": return Video  
      case "document": return Code
      case "workshop": return Brain
      default: return BookOpen
    }
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
              <span className="ai-text-gradient">Learning Resources</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Curated collection of courses, tutorials, and materials to accelerate your AI learning journey. From beginner-friendly content to advanced research papers.
            </p>
          </motion.div>

          {/* Interactive lines accent */}
          <div className="flex justify-center mb-16">
            <MagnetLines rows={7} columns={11} containerSize="70vmin" lineColor="#4f46e5" lineWidth="0.6vmin" lineHeight="4.5vmin" baseAngle={-8} />
          </div>

          {/* Learning Tracks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-8">Learning Tracks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {LEARNING_TRACKS.map((track, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="ai-card h-full">
                    <CardHeader>
                      <CardTitle className="text-xl">{track.title}</CardTitle>
                      <CardDescription>{track.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible>
                        <AccordionItem value={`track-${index}`}>
                          <AccordionTrigger>View Curriculum</AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2">
                              {track.courses.map((course, courseIndex) => (
                                <li key={courseIndex} className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-primary" />
                                  <span className="text-sm">{course}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-center mb-8">Resource Library</h2>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="course">Courses</TabsTrigger>
                <TabsTrigger value="tutorial">Tutorials</TabsTrigger>
                <TabsTrigger value="document">Documents</TabsTrigger>
                <TabsTrigger value="workshop">Workshops</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource, index) => {
                    const Icon = getResourceIcon(resource.type)
                    return (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Card className="ai-card h-full flex flex-col">
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{resource.title}</CardTitle>
                                <Badge variant="secondary" className="text-xs">
                                  {resource.type}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="flex-1 flex flex-col">
                            <p className="text-muted-foreground mb-4 flex-1">
                              {resource.description}
                            </p>
                            
                            <div className="space-y-4">
                              <div className="flex flex-wrap gap-2">
                                {resource.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex gap-2">
                                {resource.url && (
                                  <Button variant="outline" size="sm" asChild>
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4 mr-2" />
                                      Open
                                    </a>
                                  </Button>
                                )}
                                {resource.storage_path && (
                                  <Button size="sm" asChild>
                                    <a href={resource.storage_path} download>
                                      <Download className="h-4 w-4 mr-2" />
                                      Download
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Tool Credits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-center mb-8">Tool Credits & Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Perplexity Pro",
                  description: "AI-powered research assistant with unlimited searches",
                  status: "Available",
                  action: "Apply for Access"
                },
                {
                  name: "Claude Pro",
                  description: "Advanced AI assistant for coding and analysis",
                  status: "Limited",
                  action: "Join Waitlist"
                },
                {
                  name: "Codeium",
                  description: "AI code completion and generation tool",
                  status: "Available",
                  action: "Get Free Access"
                }
              ].map((tool, index) => (
                <Card key={index} className="ai-card">
                  <CardHeader>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant={tool.status === "Available" ? "default" : "secondary"}>
                        {tool.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        {tool.action}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
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