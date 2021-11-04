import  { INFO_TYPES } from '../Store/Reducers/userReducer';
import BookingService from '../Services/Booking/BookingService';

export const bookFacility = (name: string, from: string, to: string, token: string) => {
    return async (dispatch: any) => {
        let service = new BookingService();
        let retValue = service.bookFacility(name, from, to, token)
        .then((value: any) => {
            return (0);
        }).catch((error: any) => {
            return (1);
        })

        return (retValue);
    }
}
