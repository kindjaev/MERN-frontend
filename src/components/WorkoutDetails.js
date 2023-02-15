import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
// data-fns package
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutDetails = ({workout}) => {

    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext() //added

    const handleDelete = async () => {
        if (!user){ //added
            return //stop the function if we dont have value for user
        }

        const res = await fetch("/api/workouts/" + workout._id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}` //added
            }
        })
        const json = await res.json()

        if (res.ok){
            console.log("deleted", json)
            dispatch({type: "DELETE_WORKOUT", payload: json})
        }

    }
    return ( 
        <div className="workout-details">
            <h3>{workout.title}</h3>
            <p><strong>Load (kg):</strong> {workout.load}</p>
            <p><strong>Reps:</strong> {workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p> {/* added date-fns*/}
            <span onClick={handleDelete} className="material-icons md-light">delete</span>
        </div> 
     );
}
 
export default WorkoutDetails;

