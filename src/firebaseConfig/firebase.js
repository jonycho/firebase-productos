import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject  } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBL-IrEVO0v3cKiTOgN1wvDNatiIYO2OzA",
  authDomain: "lista-de-productos-1dbb5.firebaseapp.com",
  projectId: "lista-de-productos-1dbb5",
  storageBucket: "lista-de-productos-1dbb5.appspot.com",
  messagingSenderId: "993567124320",
  appId: "1:993567124320:web:fea6fdfaffabccdc408c05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Para subir archivos
export const storage = getStorage(app);

export const uploadFiles = async (file,nombremodelo)=>{
  const storageRef = ref(storage, `productos/${nombremodelo}`)
  //subo el archivo del input al servidor 
  await uploadBytes(storageRef, file)
  //obtengo la url donde fue almacenado el archivo
  const url = await getDownloadURL(storageRef)
  //devuelvo el url
  return url
}

export const deleteFiles = async (nombremodelo)=>{
  const storageRef = ref(storage, `productos/${nombremodelo}`)
  return await deleteObject(storageRef)
}