import firebaseDb from '../utils/firebase'
import {collection, doc, getDocs, getDoc} from 'firebase/firestore/lite';

export default defineEventHandler(async (event) => {
  try {
    const body = getQuery(event);
    let products = [];
    if (Array.isArray(body?.ids) && body?.ids?.length) {
      const promises = body.ids.map(async (id) => {
        const ref = doc(firebaseDb, "products", id);
        const snap = await getDoc(ref);
        return snap.exists() ? {id: snap.id, ...snap.data()} : null;
      });

      products = (await Promise.all(promises)).filter(Boolean);
    } else {
      const snapshot = await getDocs(collection(firebaseDb, "products"));
      products = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data(),
      }));
    }

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return error;
  }
});