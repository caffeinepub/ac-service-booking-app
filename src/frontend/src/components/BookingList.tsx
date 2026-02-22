import { useGetAllBookings, useUpdateBookingStatus, useDeleteBooking } from '../hooks/useQueries';
import { BookingStatus } from '../backend';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Calendar, Clock, MapPin, Phone, User, Trash2, Loader2, ClipboardList } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function BookingList() {
  const { data: bookings, isLoading } = useGetAllBookings();
  const updateStatus = useUpdateBookingStatus();
  const deleteBooking = useDeleteBooking();

  const getStatusVariant = (status: BookingStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case BookingStatus.pending:
        return 'secondary';
      case BookingStatus.confirmed:
        return 'default';
      case BookingStatus.completed:
        return 'outline';
      case BookingStatus.cancelled:
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: BookingStatus): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getServiceTypeLabel = (serviceType: string): string => {
    return serviceType.charAt(0).toUpperCase() + serviceType.slice(1);
  };

  if (isLoading) {
    return (
      <Card className="shadow-lg border-border/50">
        <CardHeader className="bg-gradient-to-br from-primary/5 to-primary/10 border-b">
          <CardTitle className="text-2xl flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-primary" />
            All Bookings
          </CardTitle>
          <CardDescription>Manage your service appointments</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <Card className="shadow-lg border-border/50">
        <CardHeader className="bg-gradient-to-br from-primary/5 to-primary/10 border-b">
          <CardTitle className="text-2xl flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-primary" />
            All Bookings
          </CardTitle>
          <CardDescription>Manage your service appointments</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <ClipboardList className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-lg font-medium text-muted-foreground">No bookings yet</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Create your first booking using the form above
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-border/50">
      <CardHeader className="bg-gradient-to-br from-primary/5 to-primary/10 border-b">
        <CardTitle className="text-2xl flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-primary" />
          All Bookings
        </CardTitle>
        <CardDescription>
          Manage your service appointments ({bookings.length} total)
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">Service</TableHead>
                  <TableHead className="font-semibold">Schedule</TableHead>
                  <TableHead className="font-semibold">Address</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-medium">
                          <User className="w-4 h-4 text-muted-foreground" />
                          {booking.customerName}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          {booking.contactNumber}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium">
                        {getServiceTypeLabel(booking.serviceType)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          {booking.preferredDate}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {booking.preferredTime}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start gap-2 max-w-xs">
                        <MapPin className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-sm line-clamp-2">{booking.address}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={booking.status}
                        onValueChange={(value) =>
                          updateStatus.mutate({ id: booking.id, status: value as BookingStatus })
                        }
                        disabled={updateStatus.isPending}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue>
                            <Badge variant={getStatusVariant(booking.status)}>
                              {getStatusLabel(booking.status)}
                            </Badge>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={BookingStatus.pending}>
                            <Badge variant="secondary">Pending</Badge>
                          </SelectItem>
                          <SelectItem value={BookingStatus.confirmed}>
                            <Badge variant="default">Confirmed</Badge>
                          </SelectItem>
                          <SelectItem value={BookingStatus.completed}>
                            <Badge variant="outline">Completed</Badge>
                          </SelectItem>
                          <SelectItem value={BookingStatus.cancelled}>
                            <Badge variant="destructive">Cancelled</Badge>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            disabled={deleteBooking.isPending}
                          >
                            {deleteBooking.isPending ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Booking</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this booking for {booking.customerName}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteBooking.mutate(booking.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
