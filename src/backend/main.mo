import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Array "mo:core/Array";
import Order "mo:core/Order";

actor {
  type ServiceType = {
    #installation;
    #repair;
    #maintenance;
    #cleaning;
  };

  type BookingStatus = {
    #pending;
    #confirmed;
    #completed;
    #cancelled;
  };

  type Booking = {
    id : Text;
    customerName : Text;
    contactNumber : Text;
    serviceType : ServiceType;
    preferredDate : Text;
    preferredTime : Text;
    address : Text;
    status : BookingStatus;
  };

  module Booking {
    public func compare(booking1 : Booking, booking2 : Booking) : Order.Order {
      Text.compare(booking1.id, booking2.id);
    };
  };

  let bookings = Map.empty<Text, Booking>();

  public shared ({ caller }) func createBooking(
    id : Text,
    customerName : Text,
    contactNumber : Text,
    serviceType : ServiceType,
    preferredDate : Text,
    preferredTime : Text,
    address : Text,
  ) : async () {
    let newBooking : Booking = {
      id;
      customerName;
      contactNumber;
      serviceType;
      preferredDate;
      preferredTime;
      address;
      status = #pending;
    };
    bookings.add(id, newBooking);
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookings.values().toArray().sort();
  };

  public shared ({ caller }) func updateBookingStatus(id : Text, newStatus : BookingStatus) : async () {
    switch (bookings.get(id)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?booking) {
        let updatedBooking = { booking with status = newStatus };
        bookings.add(id, updatedBooking);
      };
    };
  };

  public shared ({ caller }) func deleteBooking(id : Text) : async () {
    if (not bookings.containsKey(id)) {
      Runtime.trap("Booking not found");
    };
    bookings.remove(id);
  };
};
