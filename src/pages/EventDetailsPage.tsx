import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_EVENTS } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Mail, Phone, Share2, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QRCode from 'react-qr-code';
import { useToast } from '@/hooks/use-toast';

export function EventDetailsPage() {
  const { id } = useParams();
  const event = MOCK_EVENTS.find(e => e.id === id);
  const [isRsvping, setIsRsvping] = useState(false);
  const [rsvpConfirmed, setRsvpConfirmed] = useState(false);
  const { toast } = useToast();

  if (!event) {
    return <div className="container py-20 text-center">Event not found</div>;
  }

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRsvping(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRsvping(false);
      setRsvpConfirmed(true);
      toast({
        title: "RSVP Confirmed!",
        description: "Check your email for the ticket.",
      });
    }, 1500);
  };

  return (
    <div className="container py-10 max-w-5xl">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          <div className="rounded-xl overflow-hidden aspect-video w-full border shadow-sm">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          </div>
          
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{event.category}</Badge>
              {event.price === 0 ? (
                <Badge variant="outline" className="text-green-600 border-green-600">Free Entry</Badge>
              ) : (
                <Badge variant="outline" className="text-primary border-primary">Ticket: ${event.price}</Badge>
              )}
              {event.prizeMoney && (
                <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white border-none">
                   <Trophy className="w-3 h-3 mr-1" /> Prize Pool: ${event.prizeMoney.toLocaleString()}
                </Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg border">
            <h3 className="font-semibold text-lg mb-4">Event Coordinators</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {event.coordinators.map((coord, idx) => (
                <div key={idx} className="flex flex-col space-y-1 p-4 bg-background rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                  <span className="font-medium text-lg">{coord.name}</span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" /> 
                    <a href={`mailto:${coord.email}`} className="hover:text-primary">{coord.email}</a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" /> 
                    <a href={`tel:${coord.phone}`} className="hover:text-primary">{coord.phone}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="border rounded-xl p-6 shadow-md bg-card sticky top-24">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-muted-foreground font-medium">Ticket Price</span>
                <span className="text-3xl font-bold text-primary">{event.price === 0 ? 'Free' : `$${event.price}`}</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Date & Time</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-sm text-muted-foreground">{event.location}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Capacity</div>
                    <div className="text-sm text-muted-foreground">{event.attendees} / {event.capacity} attending</div>
                    <div className="w-full bg-secondary h-2 rounded-full mt-2 overflow-hidden">
                        <div 
                            className="bg-primary h-full rounded-full" 
                            style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                        />
                    </div>
                  </div>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full text-lg py-6 font-semibold shadow-lg hover:shadow-xl transition-all">RSVP Now</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  {!rsvpConfirmed ? (
                    <form onSubmit={handleRSVP}>
                      <DialogHeader>
                        <DialogTitle>RSVP for {event.title}</DialogTitle>
                        <DialogDescription>
                          Confirm your attendance. You will receive an email confirmation.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input id="name" defaultValue="Alice Johnson" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input id="email" defaultValue="alice@example.com" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="ticket-type" className="text-right">
                            Ticket
                          </Label>
                          <div className="col-span-3">
                            <Select defaultValue="standard">
                              <SelectTrigger id="ticket-type">
                                <SelectValue placeholder="Select ticket" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="standard">Standard Entry</SelectItem>
                                <SelectItem value="vip">VIP Access (+$50)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" disabled={isRsvping} className="w-full">
                          {isRsvping ? "Processing..." : "Confirm RSVP"}
                        </Button>
                      </DialogFooter>
                    </form>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 space-y-4">
                      <div className="p-3 bg-green-100 text-green-600 rounded-full animate-in zoom-in duration-300">
                        <Share2 className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold text-center">You're In!</h3>
                      <p className="text-center text-muted-foreground">
                        Your ticket has been generated. Show this QR code at the entrance.
                      </p>
                      <div className="p-4 bg-white border rounded-lg shadow-sm">
                        <QRCode value={`TICKET-${event.id}-USER-1`} size={150} />
                      </div>
                      <Button variant="outline" onClick={() => setRsvpConfirmed(false)}>Close</Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
