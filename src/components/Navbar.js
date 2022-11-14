import { Link } from "react-router-dom"
import {useLogout} from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

const Navbar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()
    console.log(user)

    function handleLogout(){
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/"><h2>Workout Buddy</h2></Link>
                <nav>
                    {user ? 
                        (<div className="logout">
                            <span>{user.email}</span>
                            <button onClick={handleLogout}>Log out</button>
                        </div>) 
                        : 
                        (<div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>)
                    }
                </nav>
            </div>  
        </header>
    )
}

export default Navbar;