import React, {useState, useEffect} from "react";
import {useNavigate, Link} from 'react-router-dom';
import { database , firebaseInit , getWebsite , authLogin , getUserLogged , getUser} from "../data/firebase";


import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import "./login.css"

function Login(props) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const auth = firebaseInit.auth();
//verifico si el estado isLoggedIn ha cambiado para desplegar la ruta /administracion_colaboradores
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/administracion_colaboradores');
    };
  }, [isLoggedIn, navigate, props.user]);
  const handleSubmit= async(e) => {
    e.preventDefault();
    if (username !=="" && password !== ""){
      try {
        const userAuth = await authLogin(username, password);
        if (userAuth){
          const userLogged = await getUserLogged(username);
          props.setUser(userLogged);
          setIsLoggedIn(true);
          setUserName("");
          setPassword("");
        } else {
          alert("Usuario no registrado")
        }
      } catch (error) {
        setShowAlert(
          <Alert className="mt-2 p-1" key={"danger"} variant={"danger"}>
            Ha ocurrido el siguiente error: {error.message}, por favor intente mas tarde.
          </Alert>
        );
        setTimeout(() => {
          setShowAlert("");
        }, 2000);
        setIsLoggedIn(false);
        setUserName("");
        setPassword("");
        props.setUser({});
      }
    } else {
      alert("user y pass estan vacios")
    }
  }


  return(

    <div className="contenedor">
      {showAlert}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuario:</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => {setUserName(e.target.value)}}
        />
        <label id ="labelPass" htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="input_icon">
          <FontAwesomeIcon icon = {faLock} />
        </div>
       <Button variant = "secondary d-flex flex-column mb-2" type = "submit" onClick = {handleSubmit}>Iniciar Sesión</Button>
      </form>
    </div>
  );
}

export default Login;