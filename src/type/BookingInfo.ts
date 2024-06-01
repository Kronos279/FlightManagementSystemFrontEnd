import { flightdetails } from "./flightdetails";

export interface BookingInfo{
    booking_id: string;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    phoneNumber: number;
    flight_id: number | undefined;
    pnrNumber: string;
    seat_number: string | null;
    seat_id: number;
    flightdetails: flightdetails;
}
