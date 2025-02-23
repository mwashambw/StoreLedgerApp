import axios from 'axios';

// It set with credential to true in all request
axios.defaults.withCredentials = true;

export async function getProjects() {
  try {
    // const { data } = await axios.get('http://localhost:8000/api/v1/projects');
    const { data } = await axios.get(
      'https://storeledger.onrender.com/api/v1/projects'
    );
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}
export async function getProject(id) {
  try {
    const { data } = await axios.get(
      // `http://localhost:8000/api/v1/projects/${id}`
      `https://storeledger.onrender.com/api/v1/projects/${id}`
    );
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}
export async function createProject(project) {
  try {
    const { data } = await axios({
      method: 'POST',
      // url: 'http://localhost:8000/api/v1/projects',
      url: 'https://storeledger.onrender.com/api/v1/projects',
      data: { ...project },
    });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}
export async function updateProject({ id, project }) {
  try {
    const { data } = await axios({
      method: 'PATCH',
      // url: `http://localhost:8000/api/v1/projects/${id}`,
      url: `https://storeledger.onrender.com/api/v1/projects/${id}`,
      data: { ...project },
    });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}
export async function deleteProject(id) {
  try {
    const { data } = await axios({
      method: 'DELETE',
      // url: `http://localhost:8000/api/v1/projects/${id}`,
      url: `https://storeledger.onrender.com/api/v1/projects/${id}`,
    });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}

export async function getStoreLedger(id) {
  try {
    const response = await axios.get(
      // `http://localhost:8000/api/v1/projects/${id}/storeledgers`,
      `https://storeledger.onrender.com/api/v1/projects/${id}/storeledgers`,
      { responseType: 'blob' }
    );

    return response;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}
// export async function downloadStoreLedger(id) {
//   try {
//     const { data } = await axios.get(
//       `http://localhost:8000/api/v1/projects/${id}/storeledgers/download`
//     );

//     return data;
//   } catch (err) {
//     console.log(err);
//     throw new Error(err.response.data.message);
//   }
// }
