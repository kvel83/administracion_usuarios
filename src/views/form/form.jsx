import React, {useState} from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import 'bootstrap/dist/css/bootstrap.min.css';

const FormUpdate = (props) =>  {
const [nombre, setNombre] = useState(props.user.nombre);

  const handleChange = event =>{
  const {name, value} = event.target;
  props.userUpdate(user => ({
    ...user,
    [name] : value
  }));
}


  return(
      <Form className = "d-flex">
        {props.nombre}
        <FloatingLabel controlId = "floatingNombre" label = "Nombre" className = "mb-3">
          <Form.Control type="text" name="nombre" defaultValue={props.user[0].nombre} onChange = {handleChange} required title="El campo no puede estar vacío"/>
        </FloatingLabel>
        <FloatingLabel controlId = "floatingApellido" label = "Apellido" className = "mb-3">
          <Form.Control type="text" name="apellido" defaultValue={props.user[0].apellido} onChange = {handleChange} required title="El campo no puede estar vacío"/>
        </FloatingLabel>
        {/* <FloatingLabel controlId = "floatingUserName" label = "Username" className = "mb-3"> */}
          {/* <Form.Control type="text" placeholder="" value={props.user.username} /> */}
        {/* </FloatingLabel> */}
        <FloatingLabel controlId = "floatingMail" label = "Correo" className = "mb-3">
          <Form.Control type="email" name="mail" value={props.user[0].email} onChange = {handleChange} required title="El campo no puede estar vacío"/>
        </FloatingLabel>
        <FloatingLabel controlId = "floatingFono" label = "Teléfono" className = "mb-3">
          <Form.Control type="text" name="telefono"  value={props.user[0].telefono} onChange = {handleChange} required title="El campo no puede estar vacío"/>
        </FloatingLabel>
      </Form>
);
}

export default FormUpdate;
