import Login from '../Containers/Login';
import Signup from '../Containers/Signup';
import GlobalMap from '../Containers/GlobalMap';
import Facility from '../Containers/Facility';
import News from '../Containers/News';
import Booking from '../Containers/Booking/Booking';

const Routes = [
    {
        name: 'Login',
        component: Login
    },
    {
        name: 'Signup',
        component: Signup
    },
    {
        name: 'GlobalMap',
        component: GlobalMap
    },
    {
        name: 'Facility',
        component: Facility
    },
    {
        name: 'News',
        component: News
    },
    {
        name: "Booking",
        component: Booking
    }
];

export default Routes;