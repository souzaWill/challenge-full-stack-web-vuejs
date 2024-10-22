<template>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="$emit('toggle-drawer')"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="$emit('logout')">
        Logout
      </v-btn>
    </v-app-bar>
</template>
  
<script>
  export default {
    props: {
      title: {
        type: String,
        default: 'Gereciamento de Matriculas +A Educacao',
      },
    },
  };
</script>
  