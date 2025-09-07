import firebaseDb from '../utils/firebase'
import {
  addDoc,
  collection, deleteDoc,
  documentId,
  getDoc, getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore/lite';

export default defineEventHandler(async (event) => {
  const {products: orderProducts} = await readBody(event);
  if (!orderProducts?.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'No products provided in the order',
    });
  }

  const orderRef = await addDoc(collection(firebaseDb, "orders"), {
    products: orderProducts,
    created_at: serverTimestamp()
  });
  const orderSnap = await getDoc(orderRef);

  const orderProductsIds = orderProducts.map((p: any) => p.id);
  const orderProductsQuery = query(collection(firebaseDb, "products"), where(documentId(), "in", orderProductsIds));
  const productsDocs = await getDocs(orderProductsQuery);

  try {
    for (const doc of productsDocs.docs) {
      const orderProduct = orderProducts.find((p: any) => p.id === doc.id);
      if (!orderProduct)
        throw createError({
          statusCode: 500,
          statusMessage: 'Server error',
          message: 'product from order not found in db ' + doc.id,
          fatal: false,
        });

      const pQty = orderProduct.qty;
      if (!pQty || pQty <= 0)
        throw createError({
          statusCode: 500,
          statusMessage: 'Server error',
          message: 'non-positive quantity found for product ' + doc.id,
          fatal: false,
        });

      const dbProduct = doc.data();
      if (dbProduct.stock < pQty)
        throw createError({
          statusCode: 500,
          statusMessage: 'Server error',
          message: 'not enough stock for product ' + doc.id,
          fatal: false,
        });

      await updateDoc(doc.ref, {stock: dbProduct.stock - pQty});
    }
  } catch (error) {
    await deleteDoc(orderRef);
    for (const doc of productsDocs.docs) {
      const dbProduct = doc.data();
      const orderProduct = orderProducts.find((p: any) => p.id === doc.id);
      if (orderProduct && dbProduct) {
        const pQty = orderProduct.qty;
        if (pQty && pQty > 0) {
          await updateDoc(doc.ref, {stock: dbProduct.stock + pQty});
        }
      }
    }
    throw error;
  }

  return {id: orderSnap.id, ...orderSnap.data(), created_at: orderSnap.data()?.created_at?.toDate() || null};
})