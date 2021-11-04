/**
 * File containing types for the state of the page "Booking"
 */

export interface IEvent {
    start: string;
    end: string;
    title: string;
    summary: string;
    color?: string;
}

export interface ITimePicker {
    visible: boolean;
    picking: string;
    value: Date;
}

export interface IBooking {
    date: string;
    startTime: string;
    endTime: string;
    disabled: boolean;
}

export interface IState {
    events: IEvent[];
    visible: boolean;
    timePicker: ITimePicker;
    booking: IBooking;
}
