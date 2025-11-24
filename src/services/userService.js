const API_URL = "http://localhost:8080/api/users";

// 1. OBTENER TODOS LOS USUARIOS (Para el Admin)
export const getAllUsers = async () => {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        return [];
    }
};

// 2. ELIMINAR USUARIO (Para el Admin)
export const deleteUser = async (id) => {
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    } catch (error) {
        console.error("Error eliminando usuario:", error);
    }
};

// 3. REGISTRAR (Crea usuario en BD)
export const registerUser = async (userData) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error registrando usuario:", error);
        throw error;
    }
};

// 4. LOGIN (Verifica credenciales en BD)
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) return null; // Si falla, retorna null

        const text = await response.text();
        // Si Java devuelve texto vacío, es que no encontró al usuario
        return text ? JSON.parse(text) : null;
    } catch (error) {
        console.error("Error en login:", error);
        return null;
    }
};