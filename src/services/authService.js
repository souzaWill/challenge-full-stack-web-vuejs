import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";

export const authService = {
  async login(email, password) {
    const response = await axios.post("login", { email, password });
    return response.data;
  },

  async logout() {
    const authStore = useAuthStore();
    let headers = { Authorization: `Bearer ${authStore.token}` };
    const response = await axios.post("logout", {}, { headers });
    return response.data;
  },
};
