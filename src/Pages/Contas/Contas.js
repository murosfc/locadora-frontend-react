import { endpoint, getJogos, getContas } from "../../API/RotasAPIExterna.js";
import React, { useEffect, useState} from "react";
import axios from "axios";
import Menu from "../../Components/Menu.js";
import { contasAdd, addNovaConta } from "./style.js";

function Contas() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [contas, setContas] = useState([]);
    const [jogos, setJogos] = useState([]);

    function contasListUpdate (){}
    
    useEffect(() => {        
        axios.get(endpoint + getContas)
            .then((response) => {
                console.log(response.data);
                setContas(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        // Carregar a lista de plataformas
        axios.get(endpoint + getJogos)
            .then((response) => {
                setJogos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [contasListUpdate]);

    const handleAddClick = () => {}

    const handleEditClick = (conta) => {}

    const handleDelete = (id, email) => {}



    return (
        <>
            <h3>Gerenciamento de Contas</h3>
            <Menu />
            {showAddForm && (
                <addNovaConta>
                    <h5>Adicionando nova conta</h5>
                </addNovaConta>
            )}
            <div data-bs-theme="dark" style={contasAdd}>
                <h5>Contas cadastradas:</h5>
                <button type="button" className="btn btn-dark" onClick={handleAddClick}>+</button>
            </div>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">e-mail</th>
                        <th scope="col">Senha</th>
                        <th scope="col">Jogo</th>
                        <th scope="col">Plataforma</th>
                        <th scope="col">Quant. Aluguéis</th>  
                        <th scope="col">Ações</th>                       
                    </tr>
                </thead>
                <tbody>
                    {contas.map((conta) => (
                        <tr key={conta._id}>
                            <td>{conta._id}</td>
                            <td>{conta.email}</td>
                            <td>{conta.senha}</td>
                            <td hidden>{conta.jogos[0]._id}</td>
                            <td>{conta.jogos[0]._titulo}</td>
                            <td>{conta.jogos[0]._plataforma._titulo}</td>                            
                            <td>{conta.vezesAlugado}</td>                            
                            <td class='actions'>
                                <span className="material-symbols-outlined" onClick={() => handleEditClick(conta)}>edit</span>
                                <span className="material-symbols-outlined" onClick={() => handleDelete(conta._id, conta.email)}>delete</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,200,0,0" />
        </>
    );
}

export default Contas;