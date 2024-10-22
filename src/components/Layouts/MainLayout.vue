<template>
    <v-app>
      <AppBar @toggle-drawer="toggleDrawer"/>
  
      <v-navigation-drawer app v-model="drawer" color="primary lighten-4">
        <v-list>
          <v-list-item link @click="navigate('/home')">
            <v-list-item-title>Estudantes</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-main>
        <v-container fluid>
          <slot></slot>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const drawer = ref(true);
      const router = useRouter();

      return {
        drawer,
        router,
      };
    },
    methods: {
      toggleDrawer() {
        this.drawer = !this.drawer;
      },
      navigate(route) {
        this.router.push(route);
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  