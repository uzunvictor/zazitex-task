import firebaseDb from '../utils/firebase'
import {collection, getDocs} from 'firebase/firestore/lite';

export default defineEventHandler(async (event) => {
  try {
    const snapshot = await getDocs(collection(firebaseDb, "orders"));
    return snapshot.docs.map(d => ({
      id: d.id,
      ...d.data(),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return error;
  }
});