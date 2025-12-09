import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_RSVPS, MOCK_EVENTS } from '@/data/mock';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, QrCode, MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import QRCode from 'react-qr-code';

export function Dashboard() {
  const allRsvps = MOCK_RSVPS.map(rsvp => {
    const event = MOCK_EVENTS.find(e => e.id === rsvp.eventId);
    return { ...rsvp, event };
  }).filter(item => item.event);

  const upcomingRsvps = allRsvps.filter(item => new Date(item.event!.date) > new Date());
  const pastRsvps = allRsvps.filter(item => new Date(item.event!.date) <= new Date());

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
            <p className="text-muted-foreground">Manage your tickets and view your event history.</p>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingRsvps.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingRsvps.map((item) => (
                <Card key={item.id} className="overflow-hidden border-l-4 border-l-primary">
                    <CardHeader className="pb-3 bg-muted/20">
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg line-clamp-1">{item.event?.title}</CardTitle>
                        <Badge variant={item.status === 'confirmed' ? 'default' : 'secondary'}>
                        {item.status}
                        </Badge>
                    </div>
                    <CardDescription>{new Date(item.event!.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                    <div className="flex flex-col gap-4">
                        <div className="text-sm text-muted-foreground space-y-2">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            {new Date(item.event!.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            {item.event?.location}
                        </div>
                        </div>
                        
                        <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full gap-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                            <QrCode className="h-4 w-4" /> View Ticket
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                            <DialogTitle>Event Ticket</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col items-center justify-center p-6 space-y-4">
                            <div className="bg-white p-4 rounded-lg border shadow-sm">
                                <QRCode value={item.ticketCode} />
                            </div>
                            <div className="text-center">
                                <p className="font-mono text-sm font-bold tracking-wider">{item.ticketCode}</p>
                                <p className="text-sm text-muted-foreground mt-1">Show this at the entrance</p>
                            </div>
                            </div>
                        </DialogContent>
                        </Dialog>
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>
          ) : (
             <div className="text-center py-12 border rounded-lg bg-muted/10">
                <p className="text-muted-foreground">No upcoming events.</p>
                <Button variant="link" asChild><a href="/events">Browse Events</a></Button>
             </div>
          )}
        </TabsContent>

        <TabsContent value="history">
            {pastRsvps.length > 0 ? (
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 {pastRsvps.map((item) => (
                   <Card key={item.id} className="opacity-80 hover:opacity-100 transition-opacity">
                     <CardHeader className="pb-3">
                       <div className="flex justify-between items-start">
                         <CardTitle className="text-lg line-clamp-1">{item.event?.title}</CardTitle>
                         <Badge variant="outline">Past</Badge>
                       </div>
                       <CardDescription>{new Date(item.event!.date).toLocaleDateString()}</CardDescription>
                     </CardHeader>
                     <CardContent>
                       <div className="text-sm text-muted-foreground">
                         <div className="flex items-center gap-2 mb-1">
                           <MapPin className="h-4 w-4" />
                           {item.event?.location}
                         </div>
                         <p className="mt-2 text-xs">Attended</p>
                       </div>
                     </CardContent>
                   </Card>
                 ))}
               </div>
            ) : (
                <Card>
                    <CardHeader>
                    <CardTitle>Past Events</CardTitle>
                    <CardDescription>Events you attended in the past.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        No past events found.
                    </div>
                    </CardContent>
                </Card>
            )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
