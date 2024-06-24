import requestApi from "../api/request";

export const getAllCategory = async () => {
    try{
        const response = await requestApi("/categories", "GET", null, false, "application/json");
        return response.data;
    }catch(error){
        Promise.reject(error);
    }
}