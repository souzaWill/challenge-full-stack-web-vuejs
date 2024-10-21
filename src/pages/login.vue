<template>
  <div>
    <v-img 
      class="mx-auto my-6" 
      max-width="228"
      src="@/assets/logo.svg" 
    />

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      
      <v-alert v-if="errorMessage" type="error" class="mb-4">
        {{ errorMessage }}
      </v-alert>

      <form @submit.prevent="handleLogin">
        <div class="text-subtitle-1 text-medium-emphasis">
          {{ $t('Email') }}
        </div>

        <v-text-field 
          required
          v-model="email"
          density="compact" 
          :placeholder="$t('Email')" 
          prepend-inner-icon="mdi-email-outline"
          variant="outlined">
        </v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          {{ $t('Password') }}
        </div>

        <v-text-field 
          required
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" 
          :type="visible ? 'text' : 'password'"
          density="compact" 
          :placeholder="$t('Enter your password')"
          prepend-inner-icon="mdi-lock-outline" 
          variant="outlined"
          @click:append-inner="toggleVisible">
        </v-text-field>

        <v-btn type="submit" block class="mb-8" color="blue" size="large" variant="tonal">
          {{ $t('Log in') }}
        </v-btn>
      </form>

    </v-card>
  </div>
</template>

<script>
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/store/auth';
  import { authService } from '@/services/authService';

  export default {
    data() {
      return {
        email: '',
        password: '',
        visible: false,
        errorMessage: null,
      };
    },
    setup() {
      const authStore = useAuthStore();
      const router = useRouter();

      return { authStore, router };
    },
    methods: {
      async handleLogin() {
        this.errorMessage = null;

        try {
          const { data } = await authService.login(this.email, this.password);
          
          this.authStore.setAuth(data.token, data.name);

          this.router.push({ path: '/' }); 
        } catch (error) {
          //TODO: melhoria exibicao de erros
          this.errorMessage = error.response?.data?.message || 'Ocorreu um erro no login.';
        }
      },
      toggleVisible() {
        this.visible = !this.visible;
      },
    },
  };
</script>
