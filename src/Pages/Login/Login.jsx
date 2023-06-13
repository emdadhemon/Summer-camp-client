import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../Providers/AuthProvider';
import login from "../../assets/login.jpg"
import Cover from '../../Components/Cover';
import img from "../../assets/logincover.jpg"

const Login = () => {
    const { signIn, signInWithGoogle, signInWithGithub } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                setSuccess('successfully logged in')
                navigate(from, { replace: true })
            })
            .catch(error => {
                setError(error.message);
            })
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const loggedUser = result.user;
                navigate(from, { replace: true })
            })
            .catch(error => {
                setError(error.message)
            })
    }

    return (
        <>
            <Cover img={img}></Cover>
            <div className='w-[80%] mx-auto mb-12'>
                <div className='card rounded-xl lg:grid grid-cols-2 shadow '>
                    <img className='lg:rounded-s-xl h-full w-full' src={login} alt="" />
                    <div className=''>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input required type="email" placeholder="Your Email" name='email' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input required type="password" placeholder="Your Password" name='password' className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover ms-1">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-success">Login</button>
                            </div>
                            <p className='text-red-600'><small>{error}</small></p>
                            <p className='text-green-600 text-sm my-1 ms-2'>{success}</p>
                            <p className='text-sm font-semibold mt-4'>New Here? <Link className='link text-green-700 ' to="/signup">Register Here</Link></p>
                        </form>
                        <div className='w-[85%] mx-auto mb-4'>
                            <button onClick={handleGoogleSignIn} className="w-[100%] btn btn-outline text-black hover:bg-red-400 hover:border-red-400  font-semibold mb-2"><FaGoogle style={{ color: 'skyblue' }}></FaGoogle><span className='ms-2'>Log in with Google</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Login;