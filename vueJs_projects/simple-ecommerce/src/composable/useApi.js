import { ref } from 'vue';
export const useApi = (baseUrl) => {

    const data = ref(null);
    const error = ref(null);
    const loading = ref(false);
    const fetcher = async (endpoint, options = {}) => {
        loading.value = true;
        error.value = null;
        try {
            const res = await fetch(baseUrl + endpoint,
                {
                    ...options,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!res.ok) {
                throw new Error("failed to fetch data from " + endpoint + "respnose status = " + res.status + " " + res.statusText)
            }
            const result = await res.json();
            data.value = result;
            return result;
        } catch (e) {
            error.value = e;
            throw error.value;
        } finally {
            loading.value = false;
        }
    }

    const getAll = async (endpoint) => {
        return await fetcher(endpoint)
    };
    const getOne = async (endpoint, id) => {
        return await fetcher(`${endpoint}/${id}`);
    };
    const update = async (endpoint, updatedObject) => {
        return await fetcher(`${endpoint}/${updatedObject.id}`, {
            body: JSON.stringify(updatedObject),
            method: "PUT"
        })
    };
    return {
        getAll,
        getOne,
        update,
        data,
        error,
        loading,
    };
}
