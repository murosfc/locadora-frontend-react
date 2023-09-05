import styled from 'styled-components'

export const addNovoJogo = styled.div`{
    input{
        width: 50%;
        margin: 0.5rem 0;
    }
    button{
        margin: 0.5rem 0;
    }
    .material-symbols-outlined {
        font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
        }
    }
    
`

export const form = { display: 'flex', flexDirection: 'row', padding: '1rem',  justifyContent: 'space-between' }

export const jogoAdd = { display: 'flex', justifyContent: 'space-between', padding: '0.5rem', fontWeight: 'bolder'}

export const titulo = {width: '50%', heigth: '30%'}
export const valor = {width: '20%', heigth: '30%'}
export const selPlat = {width: '30%'}
export const inpUrl = {width: '100%'}
