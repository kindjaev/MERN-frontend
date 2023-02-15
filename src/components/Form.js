import { useState } from "react";
import {useWorkoutsContext} from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext";

const Form = () => {
    const {dispatch} = useWorkoutsContext() //added new feature
    const [title, setTitle] = useState("");
    const [reps, setReps ] = useState("");
    const [load, setLoad ] = useState("");
    const [error, setError ] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]) //added 
    const {user} = useAuthContext() //added 

    const handleSubmit = async (ev) => {
        ev.preventDefault(); 

        if (!user){ //added 
            setError("You must be logged in")
            return
        }

        const workout = { title, load, reps };

        const res = await fetch("https://mern-backend-server.vercel.app/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}` //added
            }
        })
        const json = await res.json();

        if (!res.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields) //added error handler 
        }
        if (res.ok){
            setTitle("");
            setReps("");
            setLoad("");
            setError(null);
            setEmptyFields([]) //added
            console.log("New workout added", json )
            dispatch({type: "CREATE_WORKOUT", payload: json}) //added new feature
        }
    }
    return ( 
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create a New Workout</h3>
            <label>Exercise Type:</label>
            <input 
                type="text" 
                onChange={(ev) => setTitle(ev.target.value)} 
                value={title} 
                // required 
                className={emptyFields.includes("title") ? "error" : ""} //aded instead required 
            />
            <label>Load (in kg):</label>
            <input 
                type="number" 
                onChange={(ev) => setLoad(ev.target.value)} 
                value={load} 
                // required 
                className={emptyFields.includes("load") ? "error" : ""} //aded instead required 
            />
            <label>Reps:</label>
            <input 
                type="number" 
                onChange={(ev) => setReps(ev.target.value)} 
                value={reps} 
                // required 
                className={emptyFields.includes("reps") ? "error" : ""} //aded instead required 
            />

            <button>Add Workout</button>

            {error && <div className="error">{error}</div>}
         </form>
    )
}

 
export default Form;
