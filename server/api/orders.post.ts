import firebaseDb from '../utils/firebase'
import {collection, getDocs} from 'firebase/firestore/lite';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const productsSnapshot = await getDocs(collection(firebaseDb, "products"));
    const productDoc = productsSnapshot.docs.find(doc => doc.id === body.productId);
  } catch (error) {
    console.error("Error fetching products:", error);
    return error;
  }
});