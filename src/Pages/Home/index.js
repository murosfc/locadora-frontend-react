import { Container, Jogo, JogosList, FaleConosco } from "./style.js";
import Menu from "../../Components/Menu.js";
import { endpoint, getTopContas } from "../../API/RotasAPIExterna.js";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
    const [jogos, setJogos] = useState([]);

    axios.interceptors.request.use(
        config => {
            const token = localStorage.getItem("token");
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
        const getAllUrl = endpoint + getTopContas;
        var jogos = [];
        axios.get(getAllUrl)
            .then((response) => {
                const contasArray = response.data;
                contasArray.forEach(conta => {
                    jogos.push(conta.jogo);
                });
                setJogos(jogos);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div>
                <h1>Bem vindo à ongames, sua locadora digital!</h1>
            </div>
            <Menu />
            <Container>
                <h2>Jogos mais alugados:</h2>
                <JogosList>
                    {jogos.map((jogo) => {
                        return (
                            <Jogo key={jogo._id}>
                                <img src={jogo._urlImagem} alt={jogo._titulo} />
                                <span class='titulo'>{jogo._titulo}</span>
                                <span>Plataforma: {jogo._plataforma._titulo}</span>
                                <span>Preço: R$ {Intl.NumberFormat('pt-BR').format(jogo._valor)},00</span>
                                <span class="material-symbols-outlined">add_shopping_cart</span>
                            </Jogo>
                        )
                    }
                    )}
                </JogosList>
                <FaleConosco><a href="mailto:muros@yahoo.com.br">Fale conosco</a></FaleConosco>
            </Container>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        </>
    )
}

export default Home;