<template>
  <v-snackbar v-model="show" :color="color" :timeout="timeout">
    {{ $t(message) }}

    <template v-slot:actions>
      <v-btn :color="closeBtncolor" variant="text" @click="show = false">
        {{ $t('Close') }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
    },
    color: {
      type: String,
      default: 'success',
    },
    closeBtncolor: {
      type: String,
      default: 'white',
    },
    timeout: {
      default: 8000,
    },
  },
  data: () => ({
    show: true,
  }),
};
</script>
