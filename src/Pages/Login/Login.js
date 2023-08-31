import React, { useState } from "react";
import axios from "axios";
import './style.css';
import Menu from "../../Components/Menu.js";
import Home from '../../Pages/Home/index.js'
import { endpoint, userLogin } from "../../API/RotasAPIExterna.js";


function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Add state for error message

    const handleLogin = (email, senha) => {
        const loginData = { email, senha };
        const loginUrl = endpoint + userLogin     

        axios.post(loginUrl, loginData)
            .then(response => {                
                const token = response.data.token;
                console.log(token);
                // Store the token in local storage
                localStorage.setItem("token", token);

                // Redirect or update UI for successful login
                window.location.replace('/');
            })
            .catch(error => {
                console.log(error);
                setErrorMessage(error.response.data.mensagem); // Set error message
            });
    };

    axios.interceptors.request.use(
        config => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    return (
        <>
            <Menu />
            <div className={"wrapper fadeInDown"}>
                <div id="formContent">
                    <div className="fadeIn first">
                        <img src="https://ongameinteractive.com/wp-content/uploads/2021/04/ongame-interactive-mobile-logo-orange-2.png" id="icon" alt="User Icon" />
                    </div>
                    <form>
                        <input type="text" id="email" className="fadeIn second" name="login" placeholder="e-mail" value={email}  onChange={(e) => setEmail(e.target.value)}/>
                        <input type="text" id="senha" className="fadeIn third" name="login" placeholder="senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                        <input type="submit" className="fadeIn fourth" value="Log In"  onClick={(e) => {e.preventDefault(); handleLogin(email, senha);}}/>
                        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
                    </form>
                    <div id="formFooter">
                        <a className="underlineHover" href="#">Esqueceu a senha? Chora!</a>
                        
                    </div>
                </div>
            </div>
           
        </>
    );
}

export default Login;
