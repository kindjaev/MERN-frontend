import {useState} from "react"
import { useLogin } from "../hooks/useLogin"


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, loading} = useLogin()

    const handleSubmit = async function(ev){
        ev.preventDefault()
        // console.log(email, password)
       await login(email, password)
    }

    return ( 
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={ev => setEmail(ev.target.value)} />

            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={ev => setPassword(ev.target.value)} />

            <button disabled={loading}>Log In</button>

            {error && <div className="error">{error}</div> }
        </form>
     );
}
 
export default Login;