import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { signInWithGoogle, setLoading, user } = useContext(AuthContext);
    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(() => {
            if (location?.state?.to) {
                navigate(location.state.to);
            } else {
                alert('You have successfully logged in');
                navigate('/');
            }
        })
        .catch(error => {
            setLoading(false);
            console.error(error);
            alert('Log in failed');
        })
    };
    return (
        <div className="hero min-h-screen bg-base-200 rounded-2xl">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login here to get all access!</h1>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <button onClick={handleGoogleSignIn} className="btn bg-gray-400 mx-8 -mt-6 mb-2" disabled={user}><FaGoogle />Log in with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;