import axios from 'axios';

const API_URL = 'http://localhost/api'; 

export const authService = {
  async login(email, password) {
    const response = await axios.post(
      `${API_URL}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );
    console.log(response);
    return response.data;
  },
  
  async logout() {
    const response = await axios.post(
      `${API_URL}/logout`, 
      {},
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  }
};
