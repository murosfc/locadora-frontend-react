import React, { useState } from "react";
import axios from "axios";
import './style.css';
import Menu from "../../Components/Menu.js";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        const loginData = { email, password };

        axios.post("your_login_endpoint", loginData)
            .then(response => {
                // Assuming the server returns a token in response.data.token
                const token = response.data.token;

                // Store the token in local storage
                localStorage.setItem("token", token);

                // Redirect or update UI for successful login
            })
            .catch(error => {
                // Handle login error
            });
    };

    return (
        <>
            <Menu />
            <div className={"wrapper fadeInDown"}>
                <div id="formContent">
                    <div className="fadeIn first">
                        <img src="https://ongameinteractive.com/wp-content/uploads/2021/04/ongame-interactive-mobile-logo-orange-2.png" id="icon" alt="User Icon" />
                    </div>
                    <form>
                        <input type="text" id="login" class="fadeIn second" name="login" placeholder="e-mail" />
                        <input type="text" id="password" class="fadeIn third" name="login" placeholder="senha" />
                        <input type="submit" class="fadeIn fourth" value="Log In" />
                    </form>
                    <div id="formFooter">
                        <a class="underlineHover" href="#">Forgot Password?</a>
                    </div>
                </div>
            </div>
           
        </>
    );
}

export default Login;
