<template>
    <v-card>
      <v-toolbar color="blue" :title="localStudent.id ?$t('Edit student') : $t('Create student') "></v-toolbar>
  
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field 
            :label="$t('Name')"
            v-model="localStudent.name" 
            :rules="[v => !!v || $t('Name is required')]"
          ></v-text-field>
          <v-text-field 
            :label="$t('Email')"
            v-model="localStudent.email" 
            :rules="[
              v => !!v || $t('Email is required'),
              v => /.+@.+\..+/.test(v) || $t('Email is invalid')
            ]"
          ></v-text-field>
          <v-text-field 
            :label="$t('Registration number')"
            v-model="localStudent.registration_number" 
            :readonly="!!localStudent.id"
            v-mask="'########'"
            :rules="[
              v => !!v || $t('Registration number is required'),
              v => v.length === 8 || $t('Registration number must be 8 characters long')
            ]"
          ></v-text-field>
          <v-text-field 
            :label="$t('Document')"
            v-model="localStudent.document" 
            :readonly="!!localStudent.id"
            v-mask="'###.###.###-##'"
            :rules="[v => !!v || $t('CPF number is required')]"
          ></v-text-field>
        </v-form>
      </v-card-text>
  
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">{{ $t('Cancel') }}</v-btn>
        <v-btn color="blue darken-1" text @click="createOrUpdate">{{ $t('Confirm') }}</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  import { CreateStudentDTO } from "@/DTOs/CreateStudentDTO";
  import { StudentDTO } from "@/DTOs/StudentDTO";
  import { UpdateStudentDTO } from "@/DTOs/UpdateStudentDTO";
  import { useStudentsStore } from "@/stores/students.store";
  import {mask} from 'vue-the-mask'

  export default {
    directives: {mask},
    props: {
      student: {
        type: StudentDTO,
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
      async createOrUpdate() {
        if (!this.valid) {
          return;
        }

        if (this.localStudent.id) {
          await this.studentsStore.update(new UpdateStudentDTO(this.localStudent))
        } else {
          await this.studentsStore.create(new CreateStudentDTO(this.localStudent))
        }
        this.$emit('close');
      },
    },
  };
  </script>
  