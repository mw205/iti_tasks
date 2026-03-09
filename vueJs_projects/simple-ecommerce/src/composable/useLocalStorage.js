import { ref, watch } from "vue";
export const useLocalStorage = (key, defaultValue) => {
    const data = ref();
    const storedValue = localStorage.getItem(key);
    const initialValue =
        storedValue ? JSON.parse(storedValue) : defaultValue;
    data.value = initialValue;
    watch(
        data,
        (newValue) => {
            localStorage.setItem(key, JSON.stringify(newValue));
        },
        { deep: true }
    );
    return data;
};