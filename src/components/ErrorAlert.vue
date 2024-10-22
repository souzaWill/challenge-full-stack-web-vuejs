<template>
    <v-alert v-if="message" type="error" class="mb-4">
      {{ message }}
    </v-alert>
</template>
  
<script>
  export default {
    props: {
      message: {
        type: String,
        default: null,
      },
    },
  };
</script>
  