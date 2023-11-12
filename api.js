import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  query, 
  where
} from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyBguWoB4vHjEJuM_5OUuALhi26vdVlPS3Q",
  authDomain: "vanlife-f28b5.firebaseapp.com",
  projectId: "vanlife-f28b5",
  storageBucket: "vanlife-f28b5.appspot.com",
  messagingSenderId: "789886468894",
  appId: "1:789886468894:web:9e5f1d59083d1bc1513f0f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, 'vans')
// The code above this comment is Firebase related

export async function getVans() {
  const querySnapshot = await getDocs(vansCollectionRef)
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return dataArr
}

export async function getVan(id) {
  const docRef = doc(db, 'vans', id)
  const vanSnapshot = await getDoc(docRef)
  return {
    ...vanSnapshot.data(),
    id: vanSnapshot.id
  }
}

export async function getHostVans() {
  const q = query(vansCollectionRef, where('hostId', '==', '123'))
  const querySnapshot = await getDocs(q)
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return dataArr
}
// export async function getVans(id) {
//   const url = id ? `/api/vans/${id}` : "/api/vans"
//   const res = await fetch(url)
//   if (!res.ok) {
//     throw {
//       message: "Failed to fetch vans",
//       statusText: res.statusText,
//       status: res.status
//     }
//   }
//   const data = await res.json()
//   return data.vans
// }

// export async function getHostVans(id) {
//   const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//   const res = await fetch(url)
//   if (!res.ok) {
//     throw {
//       message: "Failed to fetch vans",
//       statusText: res.statusText,
//       status: res.status
//     }
//   }
//   const data = await res.json()
//   return data.vans
// }

export async function loginUser(creds) {
  const res = await fetch("/api/login",
    { method: "post", body: JSON.stringify(creds) }
  )
  const data = await res.json()

  if (!res.ok) {
    throw {
        message: data.message,
        statusText: res.statusText,
        status: res.status
    }
  }
  return data
}
