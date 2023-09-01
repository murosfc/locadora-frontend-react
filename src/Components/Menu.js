import axios from "axios";
import { useEffect, useState } from "react";
import { endpoint, userByToken } from "../API/RotasAPIExterna.js";

function Menu() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    var [userType, setUserType]  = useState("");    
    const token = localStorage.getItem("token");     
    
    axios.interceptors.request.use(
        config => {                      
            if (token) {
                config.headers["Authorization"] = `${token}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
            const url = endpoint + userByToken;            
            axios.get(url)
                .then((response) => {                                      
                    setUserType(response.data._tipo);                   
                }).catch((error) => {                                 
                    if(error.code === "ERR_NETWORK")
                        window.location.replace('/erro/');   
                });
        }
    }, [token]);    
    
    console.log(userType);
    return isLoggedIn ? AuthenticatedMenu() : UnauthenticatedMenu();

    function UnauthenticatedMenu() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <img src="https://ongameinteractive.com/wp-content/uploads/2021/04/ongame-interactive-mobile-logo-orange-2.png" id="icon" alt="User Icon" style={{ width: "5%" }} />
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/Jogos">Jogos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/Login">Login</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }

    function AuthenticatedMenu() {
        if (userType === "Administrador") {
            return (
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <img src="https://ongameinteractive.com/wp-content/uploads/2021/04/ongame-interactive-mobile-logo-orange-2.png" id="icon" alt="User Icon" style={{ width: "5%" }} />
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/plataformas">Plataformas</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/Jogos">Jogos</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" onClick={logout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        } else {
            return (
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <img src="https://ongameinteractive.com/wp-content/uploads/2021/04/ongame-interactive-mobile-logo-orange-2.png" id="icon" alt="User Icon" style={{ width: "5%" }} />
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/Jogos">Jogos</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" onClick={logout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }
    }

    function logout() {
        localStorage.removeItem("token");
        window.location.replace('/');
    }
}

export default Menu;