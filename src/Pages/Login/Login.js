import React, { useState } from "react";
import axios from "axios";
import './style.css';
import Menu from "../../Components/Menu.js";
import { endpoint, userLogin } from "../../API/RotasAPIExterna.js";


function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Add state for error message

    const handleLogin = () => {
        const loginData = { email, senha };
        const loginUrl = endpoint + userLogin         

        axios.post(loginUrl, loginData)
            .then((response) => {                           
                const token = response.data;                                             
                localStorage.setItem("token", token); 
                console.log(localStorage.getItem("token"));                
                window.location.replace('/');
            })
            .catch(error => {                
                setErrorMessage(error.response.data.mensagem); // Set error message
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
                        <input type="text" id="email" className="fadeIn second" name="login" placeholder="e-mail" value={email}  onChange={(e) => setEmail(e.target.value)}/>
                        <input type="text" id="senha" className="fadeIn third" name="login" placeholder="senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                        <input type="submit" className="fadeIn fourth" value="Log In"  onClick={(e) => {e.preventDefault(); handleLogin();}}/>
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
