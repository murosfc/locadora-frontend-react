import { useEffect, useState } from "react";
import { endpoint, getPlataformas } from "../../API/RotasAPIExterna.js";
import axios from "axios";
import '../../global.css';
import Menu from "../../Components/Menu.js";
import { platAdd } from "./style.js";

function Plataformas() {
    const url = endpoint + getPlataformas;
    
    const [plats, setPlats] = useState([]);

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                setPlats(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <h3>Gerenciamento de plataformas</h3>
            <Menu />
            <div data-bs-theme="dark" style={platAdd}>               
                <h5>Plataformas cadastradas:</h5>
                <button type="button" class="btn btn-dark">+</button>
            </div>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Título</th>
                        <th scope="col">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {plats.map(plat => (
                        <tr key={plat._id} scope="row">
                            <td>{plat._id}</td>
                            <td>{plat.titulo}</td>
                            <td>
                                <span className="material-symbols-outlined">edit</span>
                                <span className="material-symbols-outlined">delete</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,200,0,0" />
        </>
    )
}

export default Plataformas;
