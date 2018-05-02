/**
 * Auth Actions
 */
import { NotificationManager } from "react-notifications";
import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGOUT_USER } from "../actions/types";

/**
 * Redux Action To Signin User
 */
export const signinUser = (user, history) => dispatch => {
  dispatch({ type: LOGIN_USER });
  setTimeout(() => {
    if (user.email !== "" && user.password !== "") {
      localStorage.setItem("user_id", user);
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: localStorage.getItem("user_id")
      });
      history.push("/");
      NotificationManager.success("User Login Successfully!");
    } else {
      NotificationManager.error("Invalid username or password!");
    }
  }, 500);
};

/**
 * Redux Action To Signout User
 */
export const signoutUser = () => dispatch => {
  dispatch({ type: LOGOUT_USER });
  localStorage.removeItem("user_id");
  NotificationManager.success("User Logout Successfully");
};
