import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Cookies from 'js-cookie';

import "./navBar.css"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar(props) {
    const [username, setUsername] = useState("");
    const [userPicture, setUserPicture] = useState("")
    const navigate = useNavigate();
    console.log(props);
    useEffect(() => {
        setUsername(props.user[props.user.length-1].nombre + " " + props.user[props.user.length-1].apellido)
        setUserPicture(props.user[props.user.length-1].foto_thumbnail)
        },[]);
  return (
    <Navbar bg="dark" variant = "dark" expand="lg" sticky = "top" id="navbar">
      <Container>
        <Navbar.Brand><h2>Administración de Usuarios</h2></Navbar.Brand>
        <div className='user'>
            {props.user.tipo_usuario !== 0 && (
                <><img src={userPicture} alt="user" className='img-thumbnail rounded-circle'></img>
                <NavDropdown title={username} id="basic-nav-dropdown" className='text-light'>
                <NavDropdown.Item href="#action/3.1">Ver Perfil</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Modificar datos personales</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => {
                    Cookies.remove('username');
                    Cookies.remove('picture');
                    setUserPicture("");
                    setUsername("");
                    navigate('/');
                }}>Cerrar sesión</NavDropdown.Item>
                </NavDropdown></>
            )};
            {props.user.tipo_usuario === 0 && (
                <><img src='https://w7.pngwing.com/pngs/87/281/png-transparent-cat-feline-kitten-happy-animal-tender-pet-kawaii-fun-mammal-thumbnail.png' alt="user" className='img-thumbnail rounded-circle'></img>
                <p className='text-light mt-3'>Perfil de Invitado</p></>
            )}
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;