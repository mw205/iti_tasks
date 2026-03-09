import { useLocalStorage } from "@/composable/useLocalStorage";
import { defineStore } from "pinia";
import { computed } from "vue";

export const useCartStore = defineStore("cart", () => {
    const cartStorage = useLocalStorage("cart", []);
    const items = computed(() => cartStorage.value);

    const totalItems = computed(() => {
        return items.value.reduce((total, item) => total + item.quantity, 0);
    });

    const totalPrice = computed(() => {
        return items.value.reduce(
            (total, cartItem) =>
                total +
                (cartItem.product.price -
                    (cartItem.product.price * cartItem.product.discount) / 100) *
                cartItem.quantity,
            0
        );
    });

    const addToCart = (product) => {
        const existingItem = cartStorage.value.find(
            (item) => item.product.id === product.id
        );

        if (existingItem) {
            if (existingItem.quantity !== product.stock) {
                existingItem.quantity++;
            }
        } else {
            if (product.stock === 0) return;
            cartStorage.value.push({
                quantity: 1,
                product: { ...product },
            });
        }
    };

    const removeFromCart = (productId) => {
        const index = cartStorage.value.findIndex(
            (item) => item.product.id === productId
        );
        if (index !== -1) {
            if (cartStorage.value[index].quantity > 1) {
                cartStorage.value[index].quantity--;
            } else {
                cartStorage.value.splice(index, 1);
            }
        }
    };

    const clearCart = () => {
        cartStorage.value = [];
    };

    return {
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart,
    };
});