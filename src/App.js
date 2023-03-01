import {React, useState, useEffect} from "react";
import { BrowserRouter, Routes, Route , Router } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./components/login/login";
import MainApp from "./views/mainApp/mainApp";
import {pushUsers, getDataApi, pushUserType , authLogin} from "./components/data/firebase"
import Data from "./components/data/data.json"


function App() {
  const [dataDB, setDataDB] = useState([]);
  const [username, setUsername] = useState('');
  const [profile, setUserProfile] = useState(0);
  const [password, setPassword] = useState("");
  const [apiData, setApiData] = useState([]);
;  const [user, setUser] = useState({
    id : "",
    nombre : "",
    apellido : "",
    email : "",
    telefono : "",
    cell : "",
    foto_medio : "",
    foto_thumbnail : "",
    tipo_usuario : null
  });
  const [isLoading, setIsLoading] = useState(true);

  // const fetchData = async ()=> {
    // try{
      // await db.open();
      // const apiData = await getDataApi();
      // console.log(apiData);
      // await setDataDB(apiData);
      // pushUsers(apiData);
      // await db.close();
    // }catch (error){
      // console.log(error);
    // }
  // }
//
  // if (dataDB.length === 0){
  // fetchData();
  // pushUserType(Data.tipo_usuarios);
  // pushUsers(Data.users);
// }

useEffect(() => {
  const fetchData = async () => {
    try {
      const apiData = await getDataApi();
      setApiData(apiData);

      const userTypeResult = await pushUserType(Data.tipo_usuarios);
      console.log(userTypeResult);

      const usersResult = await pushUsers(Data.users);
      console.log(usersResult);

      const dataDBResult = await pushUsers(apiData);
      console.log(dataDBResult);

      if (dataDB.length !== 0){
      setDataDB([...dataDB, apiData]);
      setDataDB([...dataDB, Data.users]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []);


// useEffect(() => {
  // const fetchData = async ()=> {
    // try{
      // if (isLoading && dataDB.length === 0 ){
        // setApiData(await getDataApi());
      // } else {
        // setIsLoading(false);
      // }
      // if (apiData.length !== 0){
        // await pushUsers(apiData);
        // await pushUserType(Data.tipo_usuarios);
        // await pushUsers(Data.users);
      // }
      // if (dataDB.length === 0){
      // setDataDB(prevDataDB => [...prevDataDB , Data.users]);
      // setDataDB(prevDataDB => [...prevDataDB , apiData]);
    // }
    // }catch (error){
      // console.log(error);
    // }
  // }
  // if (isLoading && dataDB.length === 0){
    // fetchData();
  // }
// },[])


  // useEffect(() => {
    // const fetchData = async ()=> {
      // try{
        // let apiData = [];
        // if (isLoading && apiData.length === 0 ){
          // apiData = await getDataApi();
        // } else {
          // setIsLoading(false);
        // }
        // console.log(apiData);
        // setDataDB(prevDataDB => [...prevDataDB , apiData]);
        // pushUsers(apiData);
        // await db.close();
        // setDataDB([...dataDB , Data.users])
        // pushUserType(Data.tipo_usuarios);
        // pushUsers(dataDB);
        // setIsLoading(false);
      // }catch (error){
        // console.log(error);
      // }
    // }
    // if (isLoading && dataDB.length === 0){
      // fetchData();
      // pushUsers(Data.users);
      // setDataDB([...dataDB , Data.users])
      // pushUserType(Data.tipo_usuarios);
      // pushUsers(dataDB);
    // }
  // },[])

  // useEffect(() => {
    // pushUsers(dataDB);
  // }, [dataDB]);



  useEffect(() => {
    authLogin(username, password).then((user) => {
      setUser(user);
    });
  }, [username, password]);

   return (
     <>
     <BrowserRouter>
       <Routes>
         < Route path="/" element={<Login user = {user} setUser = {setUser}/>} />
         < Route path="/administracion_colaboradores" element={<MainApp user = {user} dataDB = {dataDB}/>} />
       </Routes>
     </BrowserRouter>
     </>
  )
}

export default App;
