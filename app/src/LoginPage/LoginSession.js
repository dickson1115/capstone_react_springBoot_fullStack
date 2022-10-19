import React from "react";

const LoginSession = ({ Sessiontitle }) => {
    return (
        <div class="LoginSession">
            <h5>{Sessiontitle}</h5>
            <form th:action="@{/login}" method="post">
                <input
                    name="username"
                    onclick="invalid_style(this)"
                    type="email"
                    placeholder="Email"
                    pattern=".*@[a-z A-Z 0-9]*.[a-z A-Z 0-9]*"
                    required
                />
                <input
                    type="password"
                    name="password"
                    onclick="invalid_style(this)"
                    placeholder="Password"
                    required
                />
                <input
                    type="submit"
                    class="login"
                    value="LOGIN"
                ></input>
                <div class="forgot_password">
                    <a href="#">Forgot Password?</a>
                </div>
            </form>

            <div class="footer">
                <div class="guest_login">
                    <a href="/" th:href="@{/registration}">
                        Register
                    </a>
                </div>
                <div class="guest_login">
                    <a href="./builderPage.html">Guest Login</a>
                </div>
            </div>
        </div>
    );
};

export default LoginSession;
