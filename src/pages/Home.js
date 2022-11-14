import { useEffect } from "react" 
import WorkoutDetails from "../components/WorkoutDetails"
import Form from "../components/Form"
import {useWorkoutsContext} from "../hooks/useWorkoutsContext"
import {useAuthContext} from "../hooks/useAuthContext"


const Home = () => {
    // const [workouts, setWorkouts] = useState(null); // switched: insted this we gonna use custom hook 
    const {workouts, dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()
 
    useEffect(() => {
        const fetchWorkout = async () => {
            const res = await fetch("/api/workouts", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            }); 
            //fetch endpoint was chnaged as we ADD PROXY INTO PACHAGE.JSON
            // it is pretty important to add a proxy while we devoloping a website and use two serveres on one machine
            const json = await res.json();

            if (res.ok) {
                dispatch({type: "SET_WORKOUTS", payload: json}) 
            }
        }
        if (user){
            fetchWorkout()
        }
    }, [dispatch, user])

    return ( 
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <Form />
        </div>
     );
}
 
export default Home;