import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <div className="navbar-mio">
            <nav className="navbar">
                <div className="navbar-links">
                    <Link to={'/'}>
                        <a className="navbar-brand">
                            <i className="bi bi-suit-club"></i> INICIO
                        </a>
                    </Link>
                    <Link to={'/torneos'}>
                        <a className="navbar-brand">
                            <i className="bi bi-suit-diamond"></i> TORNEOS
                        </a>
                    </Link>
                    <Link to={'/crupiers'}>
                        <a className="navbar-brand">
                            <i className="bi bi-suit-heart"></i> CRUPIERS
                        </a>
                    </Link>
                    <Link to={'/mesas'}>
                        <a className="navbar-brand">
                            <i className="bi bi-suit-spade"></i> MESAS
                        </a>
                    </Link>
                    <Link to={'/jugadores'}>
                        <a className="navbar-brand">
                            <i className="bi bi-suit-club"></i> JUGADORES
                        </a>
                    </Link>
                    <Link to={'/inscripcion'}>
                        <a className="navbar-brand">
                            <i className="bi bi-suit-heart"></i> INSCRIPCION
                        </a>
                    </Link>
                    <Link to={'/premios'}>
                        <a className="navbar-brand">
                            <i className="bi bi-suit-spade"></i> PREMIOS
                        </a>
                    </Link>
                    <Link to={'/juegoarmado'}>
                        <a className="navbar-brand">
                            <i className="bi bi-suit-diamond"></i> JUEGOS POSIBLES
                        </a>
                    </Link>
                </div>
            </nav>
        </div>
    )
}
