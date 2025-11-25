const API_URL = "http://localhost:8080/api/products";

export const getAllProducts = async () => {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error("Error conectando con el backend:", error);
        return [];
    }
};

export const createProduct = async (product) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        return await response.json();
    } catch (error) {
        console.error("Error creando producto:", error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

// 4. ACTUALIZAR PRODUCTO (PUT)
export const updateProduct = async (id, productData) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error actualizando producto:", error);
        throw error;
    }
};
