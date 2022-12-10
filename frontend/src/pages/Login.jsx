import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )
    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const change = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    const submit = (e) => {
        e.preventDefault()

        if (email == "" || password == "") {
            toast.error("Please include the password and email.")
        }

        const userData = {
            email,
            password
        }

        const response = dispatch(login(userData))
        toast.error(response)
    }


    useEffect(() => {

        if (isSuccess || user) {
            navigate('/')
        }
    })

    return (
        <>
            <section className="heading">
                <h1><FaSignInAlt /> Log in</h1>
                <p>Please Log in</p>
            </section>

            <section className="form">
                <form onSubmit={submit}>

                    <div className="form-group">
                        <input className="form-control" id="email" name="email" value={email} placeholder="Your Email" onChange={change} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Your Password" onChange={change} />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Login</button>
                    </div>

                </form>
            </section>
        </>
    )
}

export default Login