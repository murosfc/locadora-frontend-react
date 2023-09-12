const { render, screen } = require('@testing-library/react');
const Error = require('./Pages/Error/Error.js');
const Home = require('./Pages/Home/index.js');
const Plataformas = require('./Pages/Plataformas/Plataformas.js');
const Jogos = require('./Pages/Jogos/Jogos.js');
const Login = require('./Pages/Login/Login.js');
const Menu = require('./Components/Menu.js');
const CadastroJogo = require('./Pages/CadasroJogos/CadastroJogos.js');
const Contas = require('./Pages/Conta/Contas.js');


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
  const linkElement = screen.getByText(/Jogos disponíveis para aluguel/i);
  expect(linkElement).toBeInTheDocument();
});

test('Cadastro Jogo Page', () => {
  render(<CadastroJogo />);
  const linkElement = screen.getByText(/Jogos cadastrados/i);
  expect(linkElement).toBeInTheDocument();
});

test('Contas Page', () => {
  render(<Contas/>);
  const linkElement = screen.getByText(/Gerenciamento de contas/i);
  expect(linkElement).toBeInTheDocument();
});