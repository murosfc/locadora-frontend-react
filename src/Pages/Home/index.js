import { Container, Jogo, JogosList, FaleConosco } from "./style.js";
import Menu from "../../Components/Menu.js";

function Home() {
    return (
        <>
            <div>
                <h1>Bem vindo à ongames, sua locadora digital</h1>
            </div>
            <Menu />
            <Container>
                <h2>Jogos mais alugados</h2>
                <JogosList>
                    <Jogo>
                        <img src="https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7" alt="God of War" />
                        <span class='titulo'>God of War</span>
                        <span>Plataforma: PS5</span>
                        <span>Preço: R$ 20,00</span>
                        <span class="material-symbols-outlined">add_shopping_cart</span>
                    </Jogo>
                </JogosList>
            </Container>
            <FaleConosco><span><a href="mailto:muros@yahoo.com.br">Fale conosco</a></span></FaleConosco>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        </>
    )
}

export default Home;