import React, { useEffect, useState } from "react";
import { endpoint, getPlataformas, addPlataforma, deletePlataforma, updatePlataforma } from "../../API/RotasAPIExterna.js";
import axios from "axios";
import '../../global.css';
import Menu from "../../Components/Menu.js";
import { platAdd } from "./style.js";

function Plataformas() {
    
    
    const [addedPlatform, setAddedPlatform] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false); // To control the visibility of the add form
    const [newTitle, setNewTitle] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [editingPlatform, setEditingPlatform] = useState(null);


    useEffect(() => {
        const getAllUrl = endpoint + getPlataformas;
        axios.get(getAllUrl)
            .then((response) => {
                setAddedPlatform(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [plataformListUpdate]);

    const handleAddClick = () => {
        setShowAddForm(true);
        setNewTitle("");
        setErrorMessage("");
        setSuccessMessage("");
    };

    function plataformListUpdate (){
        return true;
    };
    
    const handleDelete = (id, titulo) => {
        const confirmation = window.confirm(`Tem certeza que deseja excluir a plataforma '${titulo}'?`);
        
        if (confirmation) {
            const deleteUrl = `${endpoint}${deletePlataforma}${id}`;
            axios.delete(deleteUrl)
                .then(() => {
                    plataformListUpdate();                   
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };    

    const handleSave = () => {
        const url = endpoint + (editingPlatform ? `${updatePlataforma + editingPlatform._id}` : addPlataforma);
        const method = editingPlatform ? "PUT" : "POST";
        const body = { titulo: newTitle };    
        axios({
            method: method,
            url: url,
            data: body
        })
        .then((response) => {
            method === "POST" ? setSuccessMessage("Cadastro realizado com sucesso.") : setSuccessMessage("Cadastro atualizado com sucesso.");            
            setNewTitle("");
            setShowAddForm(false);
            setEditingPlatform(null);
            plataformListUpdate();
        })
        .catch((error) => {
            console.log(error.response.data.mensagem);
            if (error.response.status === 400) {
                setErrorMessage(error.response.data.mensagem);
            } else {
                method === "POST" ? setErrorMessage("Erro ao cadastrar plataforma.") : setErrorMessage("Erro ao atualizar plataforma.");
            }
        });
    };

    const handleCancel = () => {
        setShowAddForm(false);
    };

    const handleEditClick = (platform) => {
        setEditingPlatform(platform);
        setShowAddForm(true);
        setNewTitle(platform.titulo);
    };    

    return (
        <>
            <h3>Gerenciamento de plataformas</h3>
            <Menu />
            <div data-bs-theme="dark" style={platAdd}>
                <h5>Plataformas cadastradas:</h5>
                <button type="button" className="btn btn-dark" onClick={handleAddClick}>+</button>
            </div>
            {showAddForm && (
                <div>
                    <h5>Cadastrar nova plataforma:</h5>
                    <input
                        type="text"
                        placeholder="Título"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <button type="button" className="btn btn-primary" onClick={handleSave}>Salvar</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                    {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
                    {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
                </div>
            )}
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Título</th>
                        <th scope="col" class='actions'>Editar / Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {addedPlatform.map(plat => (
                        <tr key={plat._id}>
                            <td>{plat._id}</td>
                            <td>{plat.titulo}</td>
                            <td class='actions'>
                                <span className="material-symbols-outlined" onClick={() => handleEditClick(plat)}>edit</span>
                                <span className="material-symbols-outlined" onClick={() => handleDelete(plat._id)}>delete</span>
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
