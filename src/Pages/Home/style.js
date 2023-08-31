import styled from 'styled-components'

export const Container = styled.div`
h1{
    text-align: center;
    margin: 4rem 0;
}
`
export const JogosList = styled.ul`
    margin-top: 2rem;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    column-gap: 3rem;
    row-gap: 4rem;
`

export const Jogo = styled.li`
    display: flex;
    flex-direction: column; 
    align-items: center;
img{
    width: 180px;
    border-radius: 1rem;
    transform: scale(1.1);
    transition: transform 0.2s;
}
span{
    margin-top: 0;
    text-align: center;
}
.titulo{
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 0.5rem;
}
.material-symbols-outlined {
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
  }
`
export const FaleConosco = styled.footer`
footer{
    margin-top: auto;
    margin-bottom: 0;
    padding: 1rem;
    text-align: center;
    font-size: 0.8rem;
    color: #ccc;
   
  }
  `