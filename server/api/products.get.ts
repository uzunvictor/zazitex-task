import firebaseDb from '../utils/firebase'
import {collection, getDocs, query, where, documentId} from 'firebase/firestore/lite';

export default defineEventHandler(async (event) => {
  try {
    let {ids} = getQuery(event);
    if (typeof ids === 'string') ids = [ids];

    if (Array.isArray(ids) && ids.length) {
      const q = query(collection(firebaseDb, "products"), where(documentId(), "in", ids));
      const snap = await getDocs(q);

      return snap.docs.map(
        d => ({id: d.id, ...d.data()})
      );
    } else {
      const snapshot = await getDocs(collection(firebaseDb, "products"));

      return snapshot.docs.map(
        d => ({id: d.id, ...d.data()})
      );
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return error;
  }
});