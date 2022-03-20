import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
export default combineReducers({
       // posts:posts,//key and value are same so keep one
    posts,
    auth
});