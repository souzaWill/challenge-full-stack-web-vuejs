<template>
    <v-card>
      <v-toolbar color="blue" :title="localStudent.id ?$t('Edit student') : $t('Create student') "></v-toolbar>
  
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field 
            label="Nome" 
            v-model="localStudent.name" 
            :rules="[v => !!v || 'Nome é obrigatório']"
          ></v-text-field>
          <v-text-field 
            label="Email" 
            v-model="localStudent.email" 
            :rules="[
              v => !!v || 'Email é obrigatório',
              v => /.+@.+\..+/.test(v) || 'Email inválido'
            ]"
          ></v-text-field>
          <v-text-field 
            label="Registro Acadêmico (RA)" 
            v-model="localStudent.registration_number" 
            :rules="[v => !!v || 'RA é obrigatório']"
            :readonly="!!localStudent.id"
          ></v-text-field>
          <v-text-field 
            label="CPF" 
            v-model="localStudent.document" 
            :rules="[v => !!v || 'CPF é obrigatório']"
            :readonly="!!localStudent.id"
          ></v-text-field>
        </v-form>
      </v-card-text>
  
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="createOrUpdate">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  import { useStudentsStore } from "@/stores/students.store";

  export default {
    props: {
      student: {
        type: Object,
        default: () => ({
          id: null,
          registration_number: '',
          name: '',
          document: ''
        })
      }
    },
    data() {
      return {
        valid: false,
        localStudent: { ...this.student }
      };
    },
    setup() {
      const studentsStore = useStudentsStore();
      return { studentsStore };

    },
    methods: {
      closeDialog() {
        this.$emit('close');
      },
      createOrUpdate() {
        if (this.localStudent.id) {
          this.studentsStore.update(this.localStudent)
        } else {
          this.studentsStore.create(this.localStudent)
        }
        this.$emit('close');
      },
    },
    watch: {
      student: {
        immediate: true,
        handler(student) {
          this.localStudent = { ...student };
        }
      }
    }
  };
  </script>
  