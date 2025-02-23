import axios from 'axios';
// It set with credential to true in all request
axios.defaults.withCredentials = true;

export async function signup(userInfo) {
  try {
    const { data } = await axios({
      method: 'POST',
      // url: `http://localhost:8000/api/v1/users/signup`,
      url: `https://storeledger.onrender.com/api/v1/users/signup`,
      data: { ...userInfo },
    });

    localStorage.setItem('auth-user', JSON.stringify(data.token));
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message);
  }
}
export async function login(userInfo) {
  try {
    const { data } = await axios({
      method: 'POST',
      // url: `http://localhost:8000/api/v1/users/login`,
      url: `https://storeledger.onrender.com/api/v1/users/login`,
      data: { ...userInfo },
    });

    localStorage.setItem('auth-user', JSON.stringify(data.token));
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message);
  }
}
export async function forgotPassword(userInfo) {
  try {
    const { data } = await axios({
      method: 'POST',
      // url: `http://localhost:8000/api/v1/users/forgotpassword`,
      url: `https://storeledger.onrender.com/api/v1/users/forgotpassword`,
      data: { ...userInfo },
    });

    // localStorage.setItem('auth-user', JSON.stringify(data.token));
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message);
  }
}
export async function resetPassword({ resetToken, password, passwordConfirm }) {
  try {
    const { data } = await axios({
      method: 'PATCH',
      // url: `http://localhost:8000/api/v1/users/resetpassword/${resetToken}`,
      url: `https://storeledger.onrender.com/api/v1/users/resetpassword/${resetToken}`,
      data: { password, passwordConfirm },
    });

    localStorage.setItem('auth-user', JSON.stringify(data.token));
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message);
  }
}

export async function getCurrentUser() {
  try {
    const currentUserToken = JSON.parse(localStorage.getItem('auth-user'));

    if (!currentUserToken) return null;

    // Get user details
    const { data } = await axios.get(
      // `http://localhost:8000/api/v1/users/loggedUser/${currentUserToken}`
      `https://storeledger.onrender.com/api/v1/users/loggedUser/${currentUserToken}`
    );

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message);
  }
}
