import {combineReducers} from 'redux';
import currentUser from './currentUser';
import sideBar from './sideBar';
import eCart from './eCart';

const rootReducer = combineReducers({
    currentUser,
    sideBar,
    eCart,
})

export default rootReducer
