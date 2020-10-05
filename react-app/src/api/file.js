import { BASE_URL, API_END_POINT } from "../const";

const fileProvider = {
  list: async (token,page) => {
    const request = new Request(`${BASE_URL + API_END_POINT}/files/list?_end=${page*10}&_start=${page*10 - 10}`, {
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
  fileUpload: async (token,file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`${BASE_URL + API_END_POINT}/files/create`, {
        method: "post",
        body: formData,
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
      const file_name = await response.json();
      return file_name;
    } catch (e) {
      console.warn(e.message);
      throw e
    }
  },
};
export default fileProvider;
