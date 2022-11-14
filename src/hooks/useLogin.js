import {useState} from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setLoading(true)
        setError(null)

        const res = await fetch("https://mern-backend-server.vercel.app/api/user/login", {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
                "Content-Type": "application/json" 
            }
        })
        const json = await res.json()
        if(!res.ok){
            setLoading(false)
            setError(json.error)
        }
        if(res.ok){
            // save the user to the local storage:
            localStorage.setItem('user', JSON.stringify(json))
            // update auth context:
            dispatch({type: "LOGIN", payload: json})
            // update local states:
            setLoading(false)
        }

    }

    return {login, loading, error}
}