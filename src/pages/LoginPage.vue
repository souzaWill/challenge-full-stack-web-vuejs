<template>
  <div>
    <CompanyLogo />
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <ErrorAlert :message="authStore.error" />

      <form @submit.prevent="handleLogin">
        <div class="text-subtitle-1 text-medium-emphasis">
          {{ $t('Email') }}
        </div>

        <v-text-field
          v-model="email"
          density="compact"
          :placeholder="$t('Email')"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          :rules="[
            (v) => !!v || $t('Email is required'),
            (v) => /.+@.+\..+/.test(v) || $t('Email is invalid'),
          ]"
          :error-messages="authStore.errors.email"
        >
        </v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          {{ $t('Password') }}
        </div>

        <v-text-field
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          :placeholder="$t('Enter your password')"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="toggleVisible"
          :error-messages="authStore.errors.password"
        >
        </v-text-field>

        <v-btn
          type="submit"
          block
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          :rules="[(v) => !!v || $t('Password is required')]"
        >
          {{ $t('Log in') }}
        </v-btn>
      </form>
    </v-card>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

export default {
  data() {
    return {
      email: '',
      password: '',
      visible: false,
      errors: [],
    };
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    return { authStore, router };
  },
  methods: {
    async handleLogin() {
      await this.authStore.login(this.email, this.password);
      this.errors = this.authStore.errors;
      this.authStore.hasError || this.router.push({ path: '/home' });
    },
    toggleVisible() {
      this.visible = !this.visible;
    },
  },
};
</script>
