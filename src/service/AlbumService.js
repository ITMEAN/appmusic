import requestApi from "../api/request"
export const getAlbumNew = async () => {
    try{
        const response = await requestApi("/albums/new-album", "GET", null, false, "application/json");
        return response.data;
    }catch(error){
        Promise.reject(error);
    }
}

export const getAlbumById = async (id) => {
    try{
        const response = await requestApi(`/albums/${id}`, "GET", null, false, "application/json");
        return response.data;
    }catch(error){
        Promise.reject(error);
    }
}



export const getAlbumsByArtistId = async (id) => {
    try{
        const response = await requestApi(`/albums/artist/${id}`, "GET", null, false, "application/json");
        return response.data;
    }catch(error){
        Promise.reject(error);
    }
}

export const addAlbum = async (name,image,idArtist) => {
    try{
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);
        formData.append("idArtist", idArtist);
        const response = await requestApi("/albums", "POST", formData, false, "multipart/form-data");
        return response.data;
    }catch(error){
        Promise.reject(error);
    }
}