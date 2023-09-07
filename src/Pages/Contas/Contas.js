import { endpoint, getContas, getJogos, deleteConta, updateConta, addConta } from "../../API/RotasAPIExterna.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../Components/Menu.js";
import { contasAdd, email, senha, selectJogo } from "./style.js";


function Contas() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [contas, setContas] = useState([]);
    const [jogos, setJogos] = useState([]);
    const [addEditConta, setAddEditConta] = useState("");
    const [newConta, setNewConta] = useState({
        email: "",
        senha: "",
        jogo: "",
    });
    const [editingConta, setEditingConta] = useState(null);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const atualizarListaContas = () => {
        axios.get(endpoint + getContas)
            .then((response) => {
                setContas(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        atualizarListaContas();
        axios.get(endpoint + getJogos)
            .then((response) => {
                setJogos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSave = () => {
        resetMessages();
        const url = (editingConta ? endpoint + updateConta + editingConta._id : endpoint + addConta);
        const method = (editingConta ? "put" : "post");
        console.log(newConta.jogo);
        const idJogo = jogos.find((jogo) => jogo.titulo === newConta.jogo)._id;
        const body = {
            email: newConta.email,
            senha: newConta.senha,
            jogo: idJogo,
        };
        axios({ method: method, url: url, data: body })
            .then((response) => {
                method === "post" ? setSuccessMessage("Conta cadastrada com sucesso!") : setSuccessMessage("Conta atualizada com sucesso!");
                resetConta();
                setAddEditConta("Cadastro de nova conta:");
                atualizarListaContas();
                setEditingConta(null);
            }).catch((error) => {
                console.log(error);
                if (error.response.status === 400) {
                    setErrorMessage(error.response.data.mensagem);
                } else {
                    method === "POST" ? setErrorMessage("Erro ao cadastrar conta.") : setErrorMessage("Erro ao atualizar conta.");
                }
            });
    };

    const handleAddClick = () => {
        setEditingConta(null);
        resetMessages();
        setAddEditConta("Cadastro de nova conta:");
        setShowAddForm(true);
        resetConta();
    }

    const resetConta = () => {
        setNewConta({
            email: "",
            senha: "",
            jogo: "",
        });
    }

    const resetMessages = () => {
        setErrorMessage("");
        setSuccessMessage("");
    }

    const handleEditClick = (conta) => {
        setEditingConta(conta);
        resetMessages();
        setAddEditConta("Editando a conta de id: " + conta._id + " e e-mail: " + conta.email);
        setShowAddForm(true);
        setNewConta({
            email: conta.email,
            senha: conta.senha,
            jogo: conta.jogo._titulo,
        });
    }

    const handleDelete = (id, email) => {
        if (window.confirm("Deseja realmente excluir a conta de e-mail: " + email + "?")) {
            axios.delete(endpoint + deleteConta + id)
                .then((response) => {
                    atualizarListaContas();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const handleCancel = () => {
        setErrorMessage("");
        setShowAddForm(false);
    };

    return (
        <>
            <h3>Gerenciamento de Contas</h3>
            <Menu />
            {showAddForm && (
                <addNovaConta>
                    <h5>{addEditConta}</h5>
                    <input
                        type="text"
                        placeholder="E-mail"
                        value={newConta.email}
                        onChange={(e) => setNewConta({ ...newConta, email: e.target.value })}
                        style={email} />
                    <input
                        type="text"
                        placeholder="Senha"
                        value={newConta.senha}
                        onChange={(e) => setNewConta({ ...newConta, senha: e.target.value })}
                        style={senha}
                    />
                    <select
                        value={newConta.jogo}
                        onChange={(e) => setNewConta({ ...newConta, jogo: e.target.value })}
                        className="form-select"
                        style={selectJogo}
                    >
                        <option value="">Selecione um jogo</option>
                        {jogos.map((jogo) => (
                            <option key={jogo._id} value={jogo.titulo}>
                                {jogo.titulo + " - " + jogo.plataforma._titulo}
                            </option>
                        ))}
                    </select>

                    <button type="button" className="btn btn-primary" onClick={handleSave}>Salvar</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                    {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
                    {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
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
                            <td hidden>{conta.jogo._id}</td>
                            <td>{conta.jogo._titulo}</td>
                            <td>{conta.jogo._plataforma._titulo}</td>
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