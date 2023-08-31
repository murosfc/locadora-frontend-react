function Menu() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <img src="https://ongameinteractive.com/wp-content/uploads/2021/04/ongame-interactive-mobile-logo-orange-2.png" id="icon" alt="User Icon" style={{width: "5%"}}/>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/plataformas">Plataformas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/Jogos">Jogos</a>
            </li> 
            <li class="nav-item">
                <a class="nav-link" href="/Login">Login</a>
            </li>          
            </ul>
        </div>
    </nav>
  )
}

export default Menu;