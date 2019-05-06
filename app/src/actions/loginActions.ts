import * as actionTypes from './actionTypes';
import UserService from '../services/userService';

export const userLogin = (user: any) => ({ type:actionTypes.USER_LOGIN, userDetails: user})

export function getUserDetailsAPI(sapId: string) {
    return function(dispatch: any) {
        return UserService.getUserDetails({sapId:sapId}).then(data => {
            dispatch(userLogin(data));
        });
    }
}
