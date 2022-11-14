import {useState} from "react"
import {useSignup} from "../hooks/useSignup"


const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {loading, error, signup} = useSignup()

    const handleSubmit = async function (ev){
        ev.preventDefault()
        await signup(email, password)
    }

    return ( 
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={ev => setEmail(ev.target.value)} />

            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={ev => setPassword(ev.target.value)} />

            <button disabled={loading}>Sign Up</button>

            {error && <div className="error">{error}</div> }
        </form>
     );
}
 
export default Signup;