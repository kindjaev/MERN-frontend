import { useAuthContext } from "./useAuthContext";
import {useWorkoutsContext} from "./useWorkoutsContext" // added 

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: workoutsDispatch} = useWorkoutsContext()

    const logout = () => {
        // remove user from localStorage:
        localStorage.removeItem("user")
        // dispatch logout action:
        dispatch({type: "LOGOUT"})
        // added to clear global workout state(we shouldn't see the old data when we login with another user): 
        workoutsDispatch({type: "SET_WORKOUTS", payload: null}) 
    }

    return {logout};
}
 