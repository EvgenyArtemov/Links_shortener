import React from 'react';
import './authPage.css'

export const AuthPage = () => {
    return (
        <div className="row">
            <div className="col s8 offset-s3">
                <h2>Link/URL Shortener</h2>
                <div className="card">
                    <div className="card-content blue-grey-text text-darken-3">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Email" id="email" type="text" className="validate"/>
                                <label htmlFor="email">Enter your Email</label>
                            </div>
                            <div className="input-field">
                                <input id="password" type="text" className="validate"/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn grey darken-3 margin-right-1">Sign up</button>
                        <button className="btn green darken-3">Log in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}