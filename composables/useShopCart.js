import {useStorage} from '@vueuse/core';

export const useShopCart = (productRef = null) => {
    const cart = useStorage('shop-cart', new Map([]));
    
    const cartProduct = ref(cart.value.get(productRef?.value?.id) || null);
    const cartProductsIds = computed(() => [...cart.value.keys()]);
    const cartProductsUniqueKey = computed(() => btoa(cartProductsIds.value.sort().join('|')));
    const cardProductOnChange = () => cart.value.set(cartProduct.value.id, cartProduct.value);
    
    const addToCart = () => {
        if (cartProduct.value?.id) return;
        if (!validProductRef()) return;
        cart.value.set(productRef.value.id, {id: productRef.value.id, price: productRef.value.price, qty: 1});
        cartProduct.value = cart.value.get(productRef.value.id);
    }
    
    const cartSize = computed(() => cart.value.size);
    
    const clearCart = () => {
        cart.value.clear()
        cartProduct.value = null;
    }
    
    const deleteFromCart = (id) => {
        if (!id) return false;
        cart.value.delete(id);
        cartProduct.value = null;
    }
    
    const productFinalPrice = computed(() => {
        if (!productRef?.value?.price || !cartProduct.value?.qty) return 0;
        return (productRef.value.price * cartProduct.value.qty).toFixed(2);
    });
    
    const validProductRef = () => {
        if (!productRef?.value) {
            console.error("Product ref is not defined");
            return false;
        }
        if (typeof productRef.value.id !== "string" || typeof productRef.value.stock !== "number") {
            console.error("Product must have an id and stock");
            return false;
        }
        return true;
    }
    
    return {
        cart,
        addToCart,
        cartProduct,
        cartProductsIds,
        cardProductOnChange,
        cartProductsUniqueKey,
        cartSize,
        clearCart,
        deleteFromCart,
        productFinalPrice,
    };
};