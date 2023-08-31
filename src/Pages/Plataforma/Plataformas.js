import { useEffect, useState } from "react"
import { endpoint, getPlataformas } from "../../API/RotasAPIExterna.js"
import axios from "axios"
import '../../global.css';
import Menu from "../../Components/Menu.js";


function Plataformas() {
    const url = endpoint + getPlataformas
    console.log(url)

    const [plats, setPlats] = useState([])

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                console.log(response.data)
                setPlats(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <div data-bs-theme="dark">
            <Menu />
                <h1>Plataformas cadastradas:</h1>
                <table class="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Título</th>
                            <th scope="col">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            plats.map(plat => (
                                <tr key={plat._id} scope="row">
                                    <td>{plat._id}</td>
                                    <td>{plat.titulo}</td>
                                    <td><button>Editar</button><button>Excluir</button></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Plataformas;
