import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Booking, BookingStatus, ServiceType } from '../backend';
import { toast } from 'sonner';

export function useGetAllBookings() {
  const { actor, isFetching } = useActor();

  return useQuery<Booking[]>({
    queryKey: ['bookings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: string;
      customerName: string;
      contactNumber: string;
      serviceType: ServiceType;
      preferredDate: string;
      preferredTime: string;
      address: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.createBooking(
        data.id,
        data.customerName,
        data.contactNumber,
        data.serviceType,
        data.preferredDate,
        data.preferredTime,
        data.address
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking created successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to create booking: ${error.message}`);
    },
  });
}

export function useUpdateBookingStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; status: BookingStatus }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateBookingStatus(data.id, data.status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking status updated successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to update status: ${error.message}`);
    },
  });
}

export function useDeleteBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deleteBooking(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking deleted successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to delete booking: ${error.message}`);
    },
  });
}
