import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_EVENTS } from '@/data/mock';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Search, Filter } from 'lucide-react';

export function EventsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filteredEvents = MOCK_EVENTS.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) || 
                          event.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || event.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Explore Events</h1>
          <p className="text-muted-foreground">Find the perfect event for you.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="flex flex-col hover:shadow-md transition-shadow">
             <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <span className="font-semibold text-primary">
                  {event.price === 0 ? 'Free' : `$${event.price}`}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-2">
              <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
              <div className="flex items-center gap-2 text-sm pt-2">
                <Calendar className="h-4 w-4 opacity-70" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 opacity-70" />
                <span>{event.location}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link to={`/events/${event.id}`}>View Details & RSVP</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredEvents.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No events found matching your criteria.</p>
          <Button variant="link" onClick={() => {setSearch(''); setCategory('all')}}>Clear filters</Button>
        </div>
      )}
    </div>
  );
}
