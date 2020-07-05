import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import './authPage.css'

export const AuthPage = () => {
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({email: '', password: ''})

    const auth = useContext(AuthContext)

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }
    
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h2>Link/URL Shortener</h2>
                <div className="card">
                    <div className="card-content blue-grey-text text-darken-3">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input 
                                placeholder="Email" 
                                id="email" 
                                type="text" 
                                name="email" 
                                onChange={changeHandler}
                                className="validate"/>
                                <label htmlFor="email">Enter your Email</label>
                            </div>
                            <div className="input-field">
                                <input 
                                id="password" 
                                type="password" 
                                name="password" 
                                onChange={changeHandler}
                                className="validate"/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                        className="btn grey darken-3 margin-right-1" 
                        onClick={registerHandler}
                        disabled={loading}
                        >
                            Sign up</button>
                        <button 
                        className="btn green darken-3"
                        onClick={loginHandler}
                        disabled={loading}
                        >
                            Log in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}