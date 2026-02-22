import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    id: string;
    customerName: string;
    status: BookingStatus;
    serviceType: ServiceType;
    preferredDate: string;
    address: string;
    preferredTime: string;
    contactNumber: string;
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export enum ServiceType {
    repair = "repair",
    cleaning = "cleaning",
    maintenance = "maintenance",
    installation = "installation"
}
export interface backendInterface {
    createBooking(id: string, customerName: string, contactNumber: string, serviceType: ServiceType, preferredDate: string, preferredTime: string, address: string): Promise<void>;
    deleteBooking(id: string): Promise<void>;
    getAllBookings(): Promise<Array<Booking>>;
    updateBookingStatus(id: string, newStatus: BookingStatus): Promise<void>;
}
