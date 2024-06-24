import requestApi from "../api/request";
export const addArtist = async (name,avatar,country) => {
    try{
        const formData = new FormData();
        formData.append('name', name);
        formData.append('avatar', avatar);
        formData.append('country', country);
        const response = await requestApi(`/artists`, "POST", formData, false, "multipart/form-data");
        return response.data;
    }catch(error){
        Promise.reject(error);
    }

}



export const getAllArtist = async (page, size) => {
    try{
        const pageRS = Number.parseInt(page);
        const sizeRS = Number.parseInt(size);
        if(isNaN(pageRS) || isNaN(sizeRS)){
           const response = await requestApi(`/artists`, "GET", null, false, "application/json");
           return response.data;
        }else{
            const response = await requestApi(`/artists?page=${pageRS}&size=${sizeRS}`, "GET", null, false, "application/json");
            return response.data;
        
        }
    
      
    }catch(error){
        Promise.reject(error);
    }
}

export const getArtistById = async (id) => {
    try{
        const response = await requestApi(`/artists/${id}`, "GET", null, false, "application/json");
        return response.data;
    }catch(error){
        Promise.reject(error);
    }
}