<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Meu App</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" color="primary lighten-4">
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" link @click="navigate(item.route)">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view>
          <h1 v-if="isAuthenticated">Bem-vindo, {{ userName }}!</h1>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { computed } from 'vue';

export default {
  setup() {
    const drawer = ref(true);
    const router = useRouter();
    const authStore = useAuthStore();

    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const userName = computed(() => authStore.getUserName);

    const items = [
      { title: 'Home', route: '/' },
      { title: 'Students', route: '/students' },
    ];

    const navigate = (route) => {
      router.push(route);
    };

    const toggleDrawer = () => {
      drawer.value = !drawer.value;
    };

    return {
      drawer,
      items,
      navigate,
      toggleDrawer,
      isAuthenticated,
      userName
    };
  },
};
</script>

<style scoped>
</style>
