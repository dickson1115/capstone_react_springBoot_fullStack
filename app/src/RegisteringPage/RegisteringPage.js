import React from 'react'
import "./RegisteringPage.css"
import 'bootstrap/dist/css/bootstrap.css';
const RegisteringPage = () => {
    return (
        <html>
            <script
  src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin></script>
            <body>
                <div class="container">
                    <div class="inner_container">
                        <div class="row">
                            <div class="col-md-10 col-md-offset-1">
                                <div>
                                    <div class="alert alert-info">You've successfully registered
                                        to our awesome app!</div>
                                </div>
                                <h1>Registration</h1>
                                <form method="post">
                                    <p class="error-message" >Validation error</p>
                                    <div class="form-group">
                                        <label for="firstName" class="control-label">First name</label> <input
                                            id="firstName" class="form-control" />
                                        <p class="error-message">Validation error</p>
                                    </div>
                                    <div class="form-group"
                                    >
                                        <label for="lastName" class="control-label">Last name</label> <input
                                            id="lastName" class="form-control" />
                                        <p class="error-message">Validation error</p>
                                    </div>
                                    <div class="form-group">
                                        <label for="email" class="control-label">E-mail</label> <input
                                            id="email" class="form-control" />
                                        <p class="error-message">Validation
                                            error</p>
                                    </div>
                                    <div class="form-group">
                                        <label for="confirmEmail" class="control-label">Confirm
                                            e-mail</label> <input id="confirmEmail" class="form-control" />
                                        <p class="error-message">Validation error</p>
                                    </div>
                                    <div class="form-group">
                                        <label for="password" class="control-label">Password</label> <input
                                            id="password" class="form-control" type="password" />
                                        <p class="error-message">Validation error</p>
                                    </div>
                                    <div class="form-group">
                                        <label for="confirmPassword" class="control-label">Confirm
                                            password</label> <input id="confirmPassword" class="form-control"
                                                type="password" />
                                        <p class="error-message">Validation error</p>
                                    </div>
                                    <div class="form-group"
                                    >
                                        <input id="terms" type="checkbox" /> <label
                                            class="control-label" for="terms">&emsp;I agree with the <a
                                                href="#">terms and conditions</a> for Registration.
                                        </label>
                                        <p class="error-message">Validation
                                            error</p>
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-success">Register</button>
                                        <span>&emsp;Already registered?&emsp;<a href="/">Login
                                            here</a></span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}

export default RegisteringPage


