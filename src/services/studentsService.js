import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';

const ENDPOINT = 'students'

export const studentsService = {
  async get(params = []) {
    const authStore = useAuthStore();
    let headers = { 'Authorization': `Bearer ${authStore.token}`}
    let config = {headers, params}

    const response = await axios.get(ENDPOINT,config);
    return response.data;
  },
  async create(data) {
    console.log(data)
  },
  async update(id, data) {
    console.log(id)
    console.log(data)
  },
  async delete(id) {
    console.log(id)
  }
};
