import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShaderAnimation } from "@/components/ui/shader-animation";

export default function DashboardComingSoon() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <ShaderAnimation />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background/70" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex items-center justify-center p-6 min-h-screen">
        <div className="max-w-xl w-full">
          <Card className="ai-card backdrop-blur-md bg-background/70">
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>Coming Soon</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The AI HackerDorm dashboard is coming soon with more features. Stay tuned!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
