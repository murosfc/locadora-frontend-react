import React, { useEffect, useState} from "react";
import axios from "axios";
import Menu from "../../Components/Menu.js";
import { addJogo, deleteJogo, endpoint, getJogos, getPlataformas, updateJogo } from "../../API/RotasAPIExterna.js";
import { jogoAdd, titulo, valor, selPlat, inpUrl} from "./style.js";

function CadastroJogos() {
    const [jogos, setJogos] = useState([]);
    const [plataformas, setPlataformas] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newJogo, setNewJogo] = useState({
        titulo: "",
        plataforma: "",
        valor: "",
        urlImagem: "",
    });
    const [editingJogo, setEditingJogo] = useState(null);
    const [addEditJogo, setAddEditJogo] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

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
        jogosListUpdate();
        axios.get(endpoint + getPlataformas)
            .then((response) => {
                setPlataformas(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const jogosListUpdate = () => {
        axios.get(endpoint + getJogos)
            .then((response) => {
                setJogos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleAddClick = () => {
        setAddEditJogo("Novo cadastro de jogo:");
        setErrorMessage("");
        setShowAddForm(true);
        setEditingJogo(null);
        setNewJogo({
            titulo: "",
            plataforma: "",
            valor: "",
            urlImagem: "",
        });
    };


    const handleSave = () => {
        setErrorMessage("");        
        const url = (editingJogo ? endpoint + updateJogo + editingJogo._id : endpoint + addJogo);        
        const method = editingJogo ? "PUT" : "POST";        
        const idPlataforma = plataformas.find((platform) => platform.titulo === newJogo.plataforma)._id;
        const body = {
            titulo: newJogo.titulo,
            idPlataforma: idPlataforma,
            plataforma: { id: idPlataforma, titulo: newJogo.plataforma},
            valor: newJogo.valor,
            urlImagem: newJogo.urlImagem,
        };
        
        axios({ method: method, url: url, data: body })
            .then((response) => {
                method === "POST" ? setSuccessMessage("Cadastro realizado com sucesso.") : setSuccessMessage("Cadastro atualizado com sucesso.");
                setNewJogo({
                    titulo: "",
                    plataforma: "",
                    valor: "",
                    urlImagem: "",
                });
                setEditingJogo(null);
                setShowAddForm(false);
                jogosListUpdate();
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 400) {
                    setErrorMessage(error.response.data.mensagem);
                } else {
                    method === "POST" ? setErrorMessage("Erro ao cadastrar jogo.") : setErrorMessage("Erro ao atualizar jogo.");
                }
            });
    };

    const handleCancel = () => {
        setErrorMessage("");
        setShowAddForm(false);
    };

    const handleDelete = (id, titulo) => {
        const confirmation = window.confirm(`Tem certeza que deseja excluir o jogo de id: '${id}' de título: '${titulo}'?`);
        if (confirmation) {
            const deleteUrl = `${endpoint}${deleteJogo}}${id}`;
            axios.delete(deleteUrl)
                .then(() => {
                    jogosListUpdate();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleEditClick = (jogo) => {
        setErrorMessage("");
        setAddEditJogo("Editando o jogo de id: " + jogo._id + " e título atual: " + jogo.titulo);
        setNewJogo({
            titulo: jogo.titulo,
            plataforma: jogo.plataforma._titulo,
            valor: jogo.valor,
            urlImagem: jogo.urlImagem,
        });
        setEditingJogo(jogo);
        setShowAddForm(true);
    };

    return (
        <>
            <h3>Gerenciamento de Jogos</h3>
            <Menu />           
            {showAddForm && (
                <addNovoJogo>
                    <h5>{addEditJogo}</h5>                    
                        <input
                            type="text"
                            placeholder="Título"
                            value={newJogo.titulo}
                            onChange={(e) => setNewJogo({ ...newJogo, titulo: e.target.value })}
                            style={titulo} />
                        <select
                            value={newJogo.plataforma}
                            onChange={(e) => setNewJogo({ ...newJogo, plataforma: e.target.value})}
                            className="form-select"
                            style={selPlat}
                        >
                            <option value="">Selecione a plataforma</option>
                            {plataformas.map((platform) => (
                                <option key={platform._id} value={platform._titulo}>
                                    {platform.titulo}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Valor"
                            value={newJogo.valor}
                            onChange={(e) => setNewJogo({ ...newJogo, valor: e.target.value })}
                            style={valor}
                        />
                        <input
                            type="text"
                            placeholder="URL da Imagem"
                            value={newJogo.urlImagem}
                            onChange={(e) => setNewJogo({ ...newJogo, urlImagem: e.target.value })}
                            style={inpUrl}
                        />
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Salvar</button>
                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
                        {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}                    
                </addNovoJogo>
            )}
            <div data-bs-theme="dark" style={jogoAdd}>
                <h5>Jogos cadastrados:</h5>
                <button type="button" className="btn btn-dark" onClick={handleAddClick}>+</button>
            </div>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Título</th>
                        <th scope="col">Plataforma</th>
                        <th scope="col">Valor</th>
                        <th scope="col">URL da Imagem</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {jogos.map((jogo) => (
                        <tr key={jogo._id}>
                            <td>{jogo._id}</td>
                            <td>{jogo.titulo}</td>
                            <td hidden>{jogo.plataforma._id}</td>
                            <td>{jogo.plataforma._titulo}</td>
                            <td>R$ {Intl.NumberFormat('pt-BR').format(jogo.valor)},00</td>
                            <td><a href={jogo.urlImagem}>link</a></td>
                            <td class='actions'>
                                <span className="material-symbols-outlined" onClick={() => handleEditClick(jogo)}>edit</span>
                                <span className="material-symbols-outlined" onClick={() => handleDelete(jogo._id, jogo.titulo)}>delete</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,200,0,0" />
        </>
    );
}

export default CadastroJogos;