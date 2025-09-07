import firebaseDb from '../utils/firebase'
import {collection, getDocs} from 'firebase/firestore/lite';

export default defineEventHandler(async (event) => {
  const snapshot = await getDocs(collection(firebaseDb, "orders"));
  return snapshot.docs.map(d => ({
    id: d.id,
    ...d.data(),
  }));
});