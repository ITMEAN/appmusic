import requestApi from "../api/request"

export const getAllSong = async () => {
    try{
        const response = await requestApi("/songs", "GET", null, false, "application/json");
        console.log(response.data);
        return response.data;
    }catch(error){
        Promise.reject(error);
    }
}


export const getAllSongPagination = async (page) => {
    try{
        const response = await requestApi(`/songs/paging?page=${page}`, "GET", null, false, "application/json");
        return response.data;
    }catch(error){
        Promise.reject(error);
    }
}

export const getSongByContry = async (country) => {
    try{
        const response = await requestApi(`/songs/${country}`, "GET", null, false, "application/json");
        return response.data;
    }catch(error){
        Promise.reject(error);
    }
}

export const getSongsByAlbumId = async (id) => {
    try{
        const response = await requestApi(`/songs/album/${id}`, "GET", null, false, "application/json");
        return response.data;
    }catch(error){
        Promise.reject(error);
    }
}

export const addSong = async(name,image,mp3,idAlbum,listId)  => {
    try{
        const formData = new FormData();
        formData.append("name", name);
        formData.append("img", image);
        formData.append("mp3", mp3);
        formData.append("idAlbum", idAlbum);
        formData.append("listId", listId);
        listId.forEach((item) => {
            formData.append("idArtists", item);
          });

        const response = await requestApi("/songs", "POST", formData, false, "multipart/form-data");
        return response.data;
    }catch(error){
        Promise.reject(error);
    }
}
