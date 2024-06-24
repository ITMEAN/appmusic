import requestApi from "../api/request";

export const getPlaylistByID = async (id) => {
    try{
        const response = await requestApi(`/playlists/${id}`, "GET", null, false, "application/json");
        return response.data;
    }catch(error){
        Promise.reject(error);
    }
}


export const addPlaylist = async (name, email) => {
    try{
        const response = await requestApi(`/playlists`, "POST", {name, email}, false, "application/json");
        return response.data;
    }catch(error){
        Promise.reject(error);
    }
}
export const getPlaylistByUserId = async (id) => {
    try{
        const response = await requestApi(`/playlists/user/${id}`, "GET", null, false, "application/json");
        return response.data;
    }catch(error){
        Promise.reject(error);
    }
}

export const getAllPlaylist = async () => {
    try{
        const response = await requestApi(`/playlists`, "GET", null, false, "application/json");
        return response.data;
    }catch(error){
        Promise.reject(error);
    }
}


export const addPlaylistToCategory = async (categoryId,playlistId) => {
    try{
        const response = await requestApi(`/categories/add-playlist`, "POST", {categoryId,playlistId}, false, "application/json");
        return response.data;
    }catch(error){
        Promise.reject(error);
    }
}

