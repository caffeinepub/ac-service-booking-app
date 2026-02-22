import { useState } from 'react';
import { useCreateBooking } from '../hooks/useQueries';
import { ServiceType } from '../backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Phone, User, Wrench, Loader2 } from 'lucide-react';

export function BookingForm() {
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType | ''>('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [address, setAddress] = useState('');

  const createBooking = useCreateBooking();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceType) {
      return;
    }

    const id = `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    createBooking.mutate(
      {
        id,
        customerName,
        contactNumber,
        serviceType,
        preferredDate,
        preferredTime,
        address,
      },
      {
        onSuccess: () => {
          setCustomerName('');
          setContactNumber('');
          setServiceType('');
          setPreferredDate('');
          setPreferredTime('');
          setAddress('');
        },
      }
    );
  };

  const isFormValid =
    customerName.trim() &&
    contactNumber.trim() &&
    serviceType &&
    preferredDate &&
    preferredTime &&
    address.trim();

  return (
    <Card className="shadow-lg border-border/50">
      <CardHeader className="space-y-1 bg-gradient-to-br from-primary/5 to-primary/10 border-b">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Wrench className="w-6 h-6 text-primary" />
          Book AC Service
        </CardTitle>
        <CardDescription>
          Schedule your air conditioning service appointment
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="customerName" className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Customer Name
              </Label>
              <Input
                id="customerName"
                placeholder="Enter your full name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                Contact Number
              </Label>
              <Input
                id="contactNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceType" className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-muted-foreground" />
                Service Type
              </Label>
              <Select value={serviceType} onValueChange={(value) => setServiceType(value as ServiceType)}>
                <SelectTrigger id="serviceType" className="transition-all focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ServiceType.installation}>Installation</SelectItem>
                  <SelectItem value={ServiceType.repair}>Repair</SelectItem>
                  <SelectItem value={ServiceType.maintenance}>Maintenance</SelectItem>
                  <SelectItem value={ServiceType.cleaning}>Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                Preferred Date
              </Label>
              <Input
                id="preferredDate"
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredTime" className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                Preferred Time
              </Label>
              <Input
                id="preferredTime"
                type="time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                required
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              Service Address
            </Label>
            <Textarea
              id="address"
              placeholder="Enter complete service address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={3}
              className="resize-none transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <Button
            type="submit"
            disabled={!isFormValid || createBooking.isPending}
            className="w-full md:w-auto px-8 shadow-md hover:shadow-lg transition-all"
            size="lg"
          >
            {createBooking.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Booking...
              </>
            ) : (
              'Create Booking'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
