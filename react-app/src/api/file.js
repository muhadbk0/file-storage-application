import { BASE_URL, API_END_POINT,FILE_PATH } from "../const";

const fileProvider = {
  list: async (token) => {
    const request = new Request(`${BASE_URL + API_END_POINT}/files/list`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    });
    const response = await fetch(request);
    if (response.status < 200 || response.status >= 300) {
      const error = await response.json();
      if(response.status===500)
        throw new Error(error.errors.message);
    throw new Error(error);  
    }
    const user = await response.json();
    return user
  },
  fileUpload: async (file,token) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await fetch(`${BASE_URL + API_END_POINT}/files/create`, {
        method: "post",
        body: formData,
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
      const file_name = await result.json();
      const fileUrl = BASE_URL + FILE_PATH + file_name;
      return fileUrl;
    } catch (e) {
      console.warn(e.message);
    }
  },
};
export default fileProvider;
