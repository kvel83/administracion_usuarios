import React, { useState, useEffect} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';

import { database , getAllUsers , getTypeUser , delUser , updateData , getUserLogged , updateUser} from "../data/firebase";




import FormUpdate from "../../views/form/form";

import "./listWorkers.css"

function ListWorkers(props){
const [show, setShow] = useState(false);
const [usersType, setUsersType] = useState([]);
const [userId, setUserId] = useState(null);
const [users, setUsers] = useState(props.dataDB);
const [userUpdate, setUserUpdate] = useState({});
const [usersTypes , setUsersTypes] = useState([]);
const [userModified, setUserModified] = useState({
    nombre : "",
    apellido : "",
    mail : "",
    telefono : ""
});

const handleModalClose = () => setShow(false);
const handleOpenModal = () => setShow(true);

const handleUpdate = async(mail) => {
    setUserUpdate(await getUserLogged(mail));
    handleOpenModal();
}
const handleGetUsers = async () =>{
    const usersGet = await getAllUsers();
    console.log(usersGet);
    setUsers(usersGet);
    console.log(users);
}

const handleGetTypeUser = async () => {
    const typeUser = await getTypeUser();
    console.log(typeUser);
    const typeUserArray = Object.values(typeUser);
    setUsersTypes (typeUserArray);
    console.log(usersTypes);
}

const renderTypeUser = (typeUser) => {
    return usersTypes.find(type => type.cardinal === typeUser) ?
           usersTypes.find(type => type.cardinal === typeUser).tipo :
           "";
  }

useEffect(() => {
    const fetchUserData = async () => {
        // const usersGet = await getAllUsers();
        // const usersArray = Object.values(usersGet);
        // setUsers(usersArray);
        handleGetTypeUser();
      };
      fetchUserData();
}, []);
useEffect(() => {
    handleGetTypeUser();
}, [users])

const handleDelete = async (mail) => {
    try{
        let userDeleted = false;
        userDeleted = await delUser(mail);
        const usersUpdated = await updateData();
        const usersArray = Object.keys(usersUpdated).map(key => {
            return { ...usersUpdated[key], id: key }
          });
          setUsers(usersArray);
    } catch(error) {
        console.log(error);
        alert("el proceso fallo");
    }
};
    return (
        <div className="listWorkers">
            <h2 className="text-center">Listado de Usuarios</h2>
            <div className="list">
                {<Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Mail</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Teléfono</th>
                            <th>Celular</th>
                            <th>Tipo de Usuario</th>
                            {(props.user[props.user.length -1].tipo_usuario !== 0 && props.user[props.user.length -1].tipo_usuario !==3)?<th>Acciones</th>:null}
                        </tr>
                    </thead>
                    <tbody>{

                        users?.map((user) => <tr key={user.email}>
                            <td>{user.email}</td>
                            <td>{user.nombre}</td>
                            <td>{user.apellido}</td>
                            <td>{user.telefono}</td>
                            <td>{user.cell}</td>
                            <td>{renderTypeUser(user.tipo_usuario)}
                            </td>
                            { (props.user[props.user.length -1].tipo_usuario !== 0 && props.user[props.user.length -1].tipo_usuario !== 3)? (
                                <td>
                                    <div className="hstack gap-3">
                                        <Button variant="outline-secondary" size="sm" onClick={() => {handleUpdate(user.email);}}>Actualizar</Button>
                                        {show?<Modal
                                                show={show}
                                                onHide={handleModalClose}
                                                backdrop="static"
                                                keyboard={false}
                                              >
                                                <Modal.Header closeButton>
                                                  <Modal.Title>Actualizar Usuario</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    < FormUpdate user = {userUpdate} userUpdate = {setUserModified}/>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                  <Button variant="secondary" onClick={handleModalClose}>
                                                    Cerrar
                                                  </Button>
                                                  <Button variant="secondary" onClick={handleModalClose}>
                                                    Limpiar
                                                  </Button>
                                                  <Button variant="primary" onClick={updateUser(userModified)}>Actualizar</Button>
                                                </Modal.Footer>
                                                </Modal>:handleModalClose}
                                        { (props.user[props.user.length -1].tipo_usuario === 1)? (
                                            <Button variant="outline-secondary" size="sm" onClick={() => {
                                                handleDelete(user.email);
                                            }}>Eliminar</Button>
                                        ):null}
                                    </div>
                                </td>
                        ):null}
                        </tr>
                        )}
                    </tbody>
                </Table>}
            </div>
        </div>
    );
}

export default ListWorkers;