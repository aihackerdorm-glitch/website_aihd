import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useErrorRedirect } from "@/hooks/use-error-redirect";

export function FeaturedEvent() {
  const [event, setEvent] = useState<Tables<'events'> | null>(null);
  const [loading, setLoading] = useState(true);
  const redirectToError = useErrorRedirect();

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      // Try upcoming soonest
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .in('status', ['upcoming', 'ongoing'])
        .order('starts_at', { ascending: true })
        .limit(1);

      if (error) {
        console.error('Error fetching featured event', error);
        redirectToError({
          message: 'Failed to load featured event',
          from: 'FeaturedEvent',
          data: { error }
        });
        return;
      }

      if (data && data.length > 0) {
        setEvent(data[0]);
      }
      setLoading(false);
    };

    fetchEvent();
  }, []);

  if (loading) return null;
  if (!event) return null;

  const startsDate = new Date(event.starts_at);
  const dateStr = startsDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = startsDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

  return (
    <section className="container mx-auto px-6 mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Featured Event</h2>
        <Link to="/events">
          <Button variant="outline" size="sm">View all</Button>
        </Link>
      </div>

      <Card className="overflow-hidden">
        {event.image_url && (
          <div className="h-56 w-full overflow-hidden">
            <img src={event.image_url} alt={event.title} className="h-full w-full object-cover" />
          </div>
        )}
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="secondary" className="inline-flex items-center gap-1">
              <CalendarDays className="w-3.5 h-3.5" /> {dateStr}
            </Badge>
            <Badge variant="secondary" className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {timeStr}
            </Badge>
            {event.venue && (
              <Badge variant="outline" className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {event.is_online ? 'Online' : event.venue}
              </Badge>
            )}
            {typeof event.capacity === 'number' && (
              <Badge variant="outline" className="inline-flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Capacity {event.capacity}
              </Badge>
            )}
          </div>
          <CardTitle className="text-2xl">{event.title}</CardTitle>
          {event.description && (
            <CardDescription className="line-clamp-2">{event.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {(event.tags || []).map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
          <div className="flex gap-3">
            <Link to={`/events`}>
              <Button className="ai-button-primary">View details</Button>
            </Link>
            <Link to={`/events`}>
              <Button variant="outline">RSVP</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
