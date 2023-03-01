import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

// ***********CONFIGURACION DEL PROYECTO FIREBASE*************
const firebaseConfig = {
  apiKey: "AIzaSyCfvWnofg56He8EOIvPRlJEEdpVXhkRYBk",
  authDomain: "administracionusuarios-89ccb.firebaseapp.com",
  databaseURL: "https://administracionusuarios-89ccb-default-rtdb.firebaseio.com/",
  projectId: "administracionusuarios-89ccb",
  storageBucket: "administracionusuarios-89ccb.appspot.com",
  messagingSenderId: "137572395176",
  appId: "1:137572395176:web:4e98365ca15258e9c93a9d"
};

// **********INICIALIZACIÓN DE APP**********
export const firebaseInit = firebase.initializeApp(firebaseConfig);

// **********INICIALIZACIÓN BBDD**********
export const database = firebase.database();

// **********OBTENCIÓN DE PULL DE USUARIOS DESDE RANDOM API**********
export const getDataApi = async () => {
  const url = 'https://randomuser.me/api/';
  try {
      const response = await fetch(url+'?results=10&inc=name,email,login,phone,picture');
      const data = await response.json();
      console.log(data.results);
      const result = data.results;
      return result;
  } catch (error) {
      console.log(error);
  }
};

// **********CREACIÓN TABLA TIPO_USUARIOS EN FIREBASE**********
export async function pushUserType(usersType){
  const ref = database.ref("tipo_usuarios");
  usersType.forEach(type => {
    const newType = {
      cardinal : type.cardinal,
      desc : type.desc,
      tipo : type.tipo
    };
    ref.push(newType)});
}

// *****METODO PARA CARGA INICIAL DE USUARIOS EN LA TABLA USERS DE FIREBASE*****
export async function pushUsers(users){
  const ref = database.ref('users');
  users.forEach(user => {
    const newUser = {
      nombre : user.name.first,
      apellido : user.name.last,
      email : user.email,
      password : "",
      telefono : user.phone,
      cell : "",
      foto_medio : user.picture.medium,
      foto_thumbnail : user.picture.thumbnail,
      tipo_usuario : Math.floor(Math.random() * 3) + 1
    };
    ref.push(newUser)});
    ref.once("value")
  .then((snapshot) => {
    snapshot.forEach(async (childSnapshot) => {
      const childKey = await childSnapshot.key;
      const childData = await childSnapshot.val();
      ref.child(childKey).update({
        id: childKey
      });
    });
    console.log("Actualización exitosa");
  })
  .catch((error) => {
    console.error("Error al actualizar: ", error);
  });

}
// ******METODO PARA OBTENER TODOS LOS USUARIOS DESDE FIREBASE*****
export async function getAllUsers() {
  let allUsers = [];
  const ref = database.ref('users');
  await ref.on('value', (snapshot) => {
    allUsers = snapshot.val();
  },(errorObject) => {
    console.log('Fallo en la lectura: ' + errorObject.name);
  });
  return allUsers;
}

// *****OBTENCION DE LOS TIPOS DE USUARIO DESDE FIREBASE******
export async function getTypeUser(){
  let typeUser = [];
  const ref = database.ref('tipo_usuarios');
  await ref.on('value', (snapshot) => {
    typeUser = snapshot.val();
  }, (errorObject) => {
    console.log('Fallo en la lectura: ' + errorObject.name);
  })
  return typeUser;
}

// ***********METODO PARA BORRAR USUARIO**********
export async function delUser(id){
  const ref = database.ref('users');
  const query = await ref.orderByChild('email').equalTo(id);
  const snapshot = await query.once('value');
  snapshot.forEach(function(childSnapshot) {
    const childRef = childSnapshot.ref;
    childRef.remove();
    return true;
  });
}

// *****METODO PARA ACTUALIZAR LOS DATOS DE LA VISTA*****
export function updateData() {
  const ref = database.ref('users');
  return new Promise((resolve, reject) => {
    ref.on('value', (snapshot) => {
      const allUsers = Object.values(snapshot.val());
      resolve(allUsers);
    }, (errorObject => {
      console.log("fallo en la actualizacion" + errorObject.name);
      reject(errorObject);
    }));
  });
}

// **********METODO PARA ACTUALIZAR USUARIO*********
export function updateUser (user){
  console.log(user);
}

// **************AUTENTICACION********************

export async function authLogin (email,password){
  if (email !== "" && password !== ""){
    try {
      const auth = firebaseInit.auth();
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      if (user){return user.email} else {return null}
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export async function getUserLogged(id){
  let userLogged = [];
  const userRef = await database.ref('users').orderByChild('email').equalTo(id).limitToFirst(1).once('value');
  const snapshot = userRef.val();
  if (snapshot){
    const val = snapshot;
    if (val instanceof Object) {
      userLogged = Object.keys(val).map(key => val[key]);
      return userLogged;
    } else {
      return val;
    }
  } else {
    throw new Error("usuario no registrado");
  }
}

