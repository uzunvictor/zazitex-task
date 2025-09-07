import firebaseDb from '../utils/firebase'
import {
  collection, deleteDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore/lite';

export default defineEventHandler(async (event) => {
  const productsDocs = await getDocs(collection(firebaseDb, "products"))
  for (const p of productsDocs.docs) {
    await updateDoc(p.ref, {stock: 100});
  }
  const ordersDocs = await getDocs(collection(firebaseDb, "orders"))
  for (const o of ordersDocs.docs) {
    await deleteDoc(o.ref);
  }
  return true;
})