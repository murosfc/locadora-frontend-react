import { render, screen } from '@testing-library/react';
import Error from './Pages/Error/Error.js';
import Home from './Pages/Home/index.js';
import Plataformas from './Pages/Plataforma/Plataformas.js';
import Jogos from './Pages/Jogo/Jogos.js';
import Login from './Pages/Login/Login.js';
import Menu from './Components/Menu.js';


test('Error Page', () => {
  render(<Error />);
  const linkElement = screen.getByText(/Estamos com dificuldades/i);
  expect(linkElement).toBeInTheDocument();
});

test('Menu Page', () => {
  render(<Menu />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});

test('Home Page', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Jogos mais alugados/i);
  expect(linkElement).toBeInTheDocument();
});

test('Jogos Page', () => { 
  render(<Jogos />);
  const linkElement = screen.getByText(/Jogos disponíveis para aluguel/i);
  expect(linkElement).toBeInTheDocument();
}); 
  
test('Login Page', () => {
  render(<Login />);
  const linkElement = screen.getByText(/Esqueceu a senha/i);
  expect(linkElement).toBeInTheDocument();
});

test('Plataformas Page', () => {
  render(<Plataformas />);
  const linkElement = screen.getByText(/Gerenciamento de plataformas/i);
  expect(linkElement).toBeInTheDocument();
});

test('Jogos Page', () => {
  render(<Jogos />);
  const linkElement = screen.getByText(/Gerenciamento de jogos/i);
  expect(linkElement).toBeInTheDocument();
});