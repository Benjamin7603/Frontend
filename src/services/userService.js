// Definimos las URLs base
const BASE_URL = "http://localhost:8080";
const AUTH_URL = `${BASE_URL}/auth`;       // Para Login
const USERS_URL = `${BASE_URL}/api/users`; // Para gestión de usuarios (si tienes ese controller)

// 1. LOGIN (¡MODIFICADO PARA SEGURIDAD JWT!)
export const loginUser = async (email, password) => {
    try {
        // Apuntamos al nuevo AuthController (/auth/login)
        const response = await fetch(`${AUTH_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) return null; // Si falla la contraseña

        // El Backend devuelve el Token como TEXTO PLANO, no como JSON
        const token = await response.text();
        
        // --- PUNTO 5 DE EVALUACIÓN: PERSISTENCIA ---
        // Guardamos la "llave" en el navegador
        localStorage.setItem("token", token);
        localStorage.setItem("userEmail", email);

        // Retornamos un objeto usuario simulado para que React funcione bien
        return {
            email: email,
            name: email.split('@')[0], // Usamos la parte del correo como nombre
            role: "cliente", // Por ahora asumimos cliente, luego mejoraremos esto
            token: token
        };

    } catch (error) {
        console.error("Error en login:", error);
        return null;
    }
};

// 2. REGISTRAR (Crea usuario en BD)
// Nota: Si tu backend usa /auth/register, cambia la URL aquí. 
// Si usas el UserController antiguo, déjalo así.
export const registerUser = async (userData) => {
    try {
        const response = await fetch(USERS_URL, {
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

// 3. OBTENER TODOS (Necesita Token)
export const getAllUsers = async () => {
    try {
        // Recuperamos el token guardado
        const token = localStorage.getItem("token");
        
        const response = await fetch(USERS_URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}` // ¡Enviamos la llave!
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        return [];
    }
};

// 4. ELIMINAR (Necesita Token)
export const deleteUser = async (id) => {
    try {
        const token = localStorage.getItem("token");
        await fetch(`${USERS_URL}/${id}`, { 
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}` // ¡Enviamos la llave!
            }
        });
    } catch (error) {
        console.error("Error eliminando usuario:", error);
    }
};

// EXTRA: Función para cerrar sesión
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
};