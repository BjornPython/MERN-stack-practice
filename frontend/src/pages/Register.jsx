import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";


function Register() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })


    const { name, email, password, cpassword } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const change = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const submit = (e) => {
        e.preventDefault()

        if (password !== cpassword) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password,
            }
            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }


    return (
        <>
            <section className="heading">
                <h1><FaUser /> Register</h1>
                <p>Please create an Account!</p>
            </section>

            <section className="form">
                <form onSubmit={submit}>
                    <div className="form-group">
                        <input className="form-control" id="name" name="name" value={name} placeholder="Your Name" onChange={change} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" id="email" name="email" value={email} placeholder="Your Email" onChange={change} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Your Password" onChange={change} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="cpassword" name="cpassword" value={cpassword} placeholder="Confirm Your Password" onChange={change} />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Register</button>
                    </div>

                </form>
            </section>
        </>
    )
}

export default Register