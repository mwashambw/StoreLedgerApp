import axios from 'axios';

// It set with credential to true in all request
axios.defaults.withCredentials = true;

export async function createItem({ id, data: item }) {
  try {
    const { data } = await axios({
      method: 'POST',
      // url: `http://localhost:8000/api/v1/projects/${id}/items`,
      url: `https://storeledger.onrender.com/api/v1/projects/${id}/items`,
      data: { ...item },
    });
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message);
  }
}
export async function editItem({ id, data: item }) {
  try {
    const { data } = await axios({
      method: 'PATCH',
      // url: `http://localhost:8000/api/v1/projects/items/${id}`,
      url: `https://storeledger.onrender.com/api/v1/projects/items/${id}`,
      data: { ...item },
    });
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message);
  }
}
export async function deleteItem(id) {
  try {
    const { data } = await axios({
      method: 'DELETE',
      // url: `http://localhost:8000/api/v1/projects/items/${id}`,
      url: `https://storeledger.onrender.com/api/v1/projects/items/${id}`,
    });
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message);
  }
}
