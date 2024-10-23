import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";

const ENDPOINT = "students";

export const studentsService = {
  async get(params = []) {
    const authStore = useAuthStore();
    let headers = { Authorization: `Bearer ${authStore.token}` };
    let config = { headers, params };

    const response = await axios.get(ENDPOINT, config);
    return response.data;
  },
  async create(data) {
    const authStore = useAuthStore();
    let headers = { Authorization: `Bearer ${authStore.token}` };
    let config = { headers };

    const response = await axios.post(ENDPOINT, data, config);
    return response.data;
  },
  async update(id, data) {
    const authStore = useAuthStore();
    let headers = { Authorization: `Bearer ${authStore.token}` };
    let config = { headers };

    const response = await axios.put(`${ENDPOINT}/${id}`, data, config);
    return response.data;
  },
  async delete(id) {
    const authStore = useAuthStore();
    let headers = { Authorization: `Bearer ${authStore.token}` };
    let config = { headers };

    const response = await axios.delete(`${ENDPOINT}/${id}`,config);
    return response;
  },
};
