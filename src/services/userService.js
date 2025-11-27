const BASE_URL = "http://localhost:8080";
const AUTH_URL = `${BASE_URL}/auth`;
const USERS_URL = `${BASE_URL}/api/users`;

// 1. LOGIN
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${AUTH_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) return null;

        const token = await response.text();
        localStorage.setItem("token", token);
        localStorage.setItem("userEmail", email);

        return { email, name: email.split('@')[0], role: "cliente", token };
    } catch (error) {
        console.error("Error login:", error);
        return null;
    }
};

// 2. REGISTRAR
export const registerUser = async (userData) => {
    try {
        const response = await fetch(USERS_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            console.error("Fallo Backend:", response.status);
            return null;
        }

        return await response.json(); 
    } catch (error) {
        console.error("Error registro:", error);
        throw error;
    }
};

// 3. OBTENER TODOS
export const getAllUsers = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(USERS_URL, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        return [];
    }
};

// 4. ELIMINAR (¡ESTA ES LA QUE FALTABA!)
export const deleteUser = async (id) => {
    try {
        const token = localStorage.getItem("token");
        await fetch(`${USERS_URL}/${id}`, { 
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("Error eliminando usuario:", error);
    }
};

// 5. LOGOUT
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
};