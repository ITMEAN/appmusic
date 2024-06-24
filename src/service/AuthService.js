import requestApi from "../api/request";

export const login = async (email, password) => {
    try{
        const response = await requestApi("/auth/authentication", "POST", {email, password}, false, "application/json");
        return response.data;
    }catch(error){
        Promise.reject(error);
    }
}

export const register = async (email, password, name,role,avatar) => {
    try{
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("name", name);
        formData.append("role", role);
        formData.append("avatar", avatar);
        const response = await requestApi("/auth/register", "POST", formData, false, "multipart/form-data");
        return response.data;
    }catch(error){
        Promise.reject(error);
    }
}