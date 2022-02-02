
import axios from "axios";

export async function getData(url) {
  return await axios.get(url);
}

export async function postData(url, data) {
  return await axios({
    method: 'post',
    url: url,
    data: data,
  });
}

export async function deleteData(url) {
  return axios.delete(url);
}

export async function editData(url, data) {
  return await axios({
    method: 'put',
    url: url,
    data: data,
  });
}


