<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')"></v-app-bar-nav-icon>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text @click="logout">
      {{ $t("Logout") }}
    </v-btn>
  </v-app-bar>
</template>

<script>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";
export default {
  props: {
    title: {
      type: String,
      default: "Gereciamento de Matriculas +A Educacao",
    },
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    return { authStore, router };
  },
  methods: {
    async logout() {
      try {
        await this.authStore.logout();
        this.errorMessage = this.authStore.error;
        this.errorMessage || this.router.push({ path: "/login" });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
