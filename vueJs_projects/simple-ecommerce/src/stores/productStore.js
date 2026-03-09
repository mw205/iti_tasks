import { useApi } from "@/composable/useApi";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
export const useProductStore = defineStore("products", () => {
    const api = useApi("http://localhost:3000");
    const productsEndpoint = "/products";
    const products = ref([]);

    const loading = computed(
        () => api.loading.value
    );
    const error = computed(
        () => api.error.value
    );

    const fetchProducts = async () => {
        try {
            const result = await api.getAll(productsEndpoint);
            if (result) products.value = result;
        } catch (e) {
            console.error(error.value, e);
        }
    };
    const decreaseStock = async (productId, amount = 1) => {
        const product = products.value.find(
            (p) => p.id === productId,
        );

        if (product && product.stock > 0) {
            product.stock -= amount;
            try {
                await api.update("/products", product);
            } catch (e) {
                product.stock += amount;
                console.error(error.value);
            }
        }
    };

    const getProductById = (id) => products.value.find(
        (p) => p.id === id
    );

    return {
        products,
        loading,
        error,
        getProductById,
        decreaseStock,
        fetchProducts,
    }
});
