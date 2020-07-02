import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

import './authPage.css'

export const AuthPage = () => {
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({email: '', password: ''})

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
            console.log('Data', data)
        } catch (e) {
            
        }
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
                        <button className="btn green darken-3">Log in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}