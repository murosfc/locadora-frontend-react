import { Container, Jogo, JogosList} from "./style.js";
import Menu from "../../Components/Menu.js";
import { endpoint, getJogos } from "../../API/RotasAPIExterna.js";
import axios from "axios";
import { useEffect, useState } from "react";

function Jogos() {
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
        const getAllUrl = endpoint + getJogos;
        axios.get(getAllUrl)
            .then((response) => {
                setJogos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div>
                <h1>Jogos disponíveis para aluguel:</h1>
            </div>
            <Menu />
            <Container>                
                <JogosList>
                    {jogos.map((jogo) => {
                        return (
                            <Jogo key={jogo._id}>
                                <img src={jogo.urlImagem} alt={jogo.titulo} />
                                <span class='titulo'>{jogo.titulo}</span>
                                <span>Plataforma: {jogo.plataforma._titulo}</span>
                                <span>Preço: R$ {Intl.NumberFormat('pt-BR').format(jogo.valor)},00</span>
                                <span class="material-symbols-outlined">add_shopping_cart</span>
                            </Jogo>
                        )
                    }
                    )}
                </JogosList>
            </Container>            
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        </>
    )
}

export default Jogos;