import React from 'react'
import './LoginPage.css'
import imageTitle from "../img/name3.png";
import video from "../img/tutorial.mp4";

const LoginPage = () => {
  return (
    <div class="outter_container">
	<div class="main_container">
		<div class="title">
			<img src={imageTitle} />
		</div>
		<div class="container">
			<video muted autoplay loop>
				<source src={video} type="video/mp4"/>
			</video>
			<div class="inner_container">
				<h5>User Login</h5>
				<form  method="post">
					<input class="input" name="username" id="username" onclick="invalid_style(this)" type="email"
						placeholder="Email" pattern=".*@[a-z A-Z 0-9]*.[a-z A-Z 0-9]*"
						required /> <input class="input" type="password" id="password" name="password" onclick="invalid_style(this)"
						 placeholder="Password" required /> <input id="login-submit"
						type="submit" class="login input" value="LOGIN"></input>
				</form>
				<div class="forgot_password">
					<a href="#">Forgot Password?</a>
				</div>

				<div class="footer">
					<div class="guest_login">
						<a href="/" >Register</a>
					</div>
					<div class="guest_login">
						<a href="/build">Guest Login</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
  )
}

export default LoginPage