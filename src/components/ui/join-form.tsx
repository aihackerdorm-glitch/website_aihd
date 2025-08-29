"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AI_SKILLS = [
  "Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision",
  "Reinforcement Learning", "Neural Networks", "Data Science", "Python", "TensorFlow",
  "PyTorch", "Generative AI", "LLMs", "Computer Graphics", "Robotics", "Ethics in AI"
];

const AI_INTERESTS = [
  "Research", "Industry Applications", "Startups", "Academic Papers", "Open Source",
  "Competitions", "Hackathons", "Workshops", "Networking", "Mentoring"
];

export function JoinForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    program: "",
    gradYear: "",
    bio: "",
    skills: [] as string[],
    interests: [] as string[],
    github: "",
    linkedin: "",
    newsletter: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const addSkill = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const addInterest = (interest: string) => {
    if (!formData.interests.includes(interest)) {
      setFormData(prev => ({ ...prev, interests: [...prev.interests, interest] }));
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({ ...prev, interests: prev.interests.filter(i => i !== interest) }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Insert subscription if newsletter consent
      if (formData.newsletter) {
        await supabase.from('subscriptions').insert({
          email: formData.email,
          consent_newsletter: true
        });
      }

      toast({
        title: "Application Submitted!",
        description: "Welcome to AI HackerDorm! We'll be in touch soon.",
      });

      // Reset form
      setFormData({
        name: "", email: "", program: "", gradYear: "", bio: "",
        skills: [], interests: [], github: "", linkedin: "", newsletter: true
      });
      setStep(1);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl ai-text-gradient">Join AI HackerDorm</CardTitle>
            <CardDescription>
              Step {step} of 4 - Let's get you connected with our community
            </CardDescription>
            <div className="flex space-x-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full ${
                    i <= step ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@student.taylor.edu.my"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="program">Program</Label>
                    <Input
                      id="program"
                      value={formData.program}
                      onChange={(e) => setFormData(prev => ({ ...prev, program: e.target.value }))}
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gradYear">Graduation Year</Label>
                    <Input
                      id="gradYear"
                      value={formData.gradYear}
                      onChange={(e) => setFormData(prev => ({ ...prev, gradYear: e.target.value }))}
                      placeholder="e.g., 2025"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>AI Skills & Technologies</Label>
                  <p className="text-sm text-muted-foreground">Select your current skills or areas you're learning</p>
                  <div className="flex flex-wrap gap-2">
                    {AI_SKILLS.map((skill) => (
                      <Badge
                        key={skill}
                        variant={formData.skills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => formData.skills.includes(skill) ? removeSkill(skill) : addSkill(skill)}
                      >
                        {skill}
                        {formData.skills.includes(skill) && <X className="w-3 h-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Tell us about yourself</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="What brings you to AI? Any projects or experiences you'd like to share?"
                    rows={4}
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Interests & Goals</Label>
                  <p className="text-sm text-muted-foreground">What aspects of AI HackerDorm interest you most?</p>
                  <div className="flex flex-wrap gap-2">
                    {AI_INTERESTS.map((interest) => (
                      <Badge
                        key={interest}
                        variant={formData.interests.includes(interest) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => formData.interests.includes(interest) ? removeInterest(interest) : addInterest(interest)}
                      >
                        {interest}
                        {formData.interests.includes(interest) && <X className="w-3 h-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub (Optional)</Label>
                    <Input
                      id="github"
                      value={formData.github}
                      onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                      placeholder="github.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">Almost Done!</h3>
                  <p className="text-muted-foreground">
                    Review your information and join our community
                  </p>
                </div>
                
                <div className="ai-card space-y-4">
                  <div>
                    <h4 className="font-semibold">{formData.name}</h4>
                    <p className="text-sm text-muted-foreground">{formData.email}</p>
                    <p className="text-sm">{formData.program} • Class of {formData.gradYear}</p>
                  </div>
                  {formData.bio && (
                    <div>
                      <h5 className="font-medium text-sm">Bio</h5>
                      <p className="text-sm text-muted-foreground">{formData.bio}</p>
                    </div>
                  )}
                  {formData.skills.length > 0 && (
                    <div>
                      <h5 className="font-medium text-sm mb-2">Skills</h5>
                      <div className="flex flex-wrap gap-1">
                        {formData.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="newsletter"
                    checked={formData.newsletter}
                    onChange={(e) => setFormData(prev => ({ ...prev, newsletter: e.target.checked }))}
                    className="rounded border-border"
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    Subscribe to our newsletter for updates and events
                  </Label>
                </div>
              </motion.div>
            )}

            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                disabled={step === 1}
              >
                Previous
              </Button>
              
              {step < 4 ? (
                <Button 
                  onClick={nextStep}
                  disabled={
                    (step === 1 && (!formData.name || !formData.email)) ||
                    (step === 2 && formData.skills.length === 0) ||
                    (step === 3 && formData.interests.length === 0)
                  }
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="ai-button-primary"
                >
                  {isSubmitting ? "Submitting..." : "Join AI HackerDorm"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}