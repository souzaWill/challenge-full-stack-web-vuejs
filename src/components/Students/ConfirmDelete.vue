<template>
      <v-card>
        <v-card-title class="text-h5">{{ $t('Confirmation') }}</v-card-title>
        <v-card-text>{{ `${$t('Are you sure you want to delete the student')} ${student.name}?` }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog()">{{$t('Cancel')}}</v-btn>
          <v-btn color="blue darken-1" text @click="deleteStudent(student.id)">{{ $t('Confirm') }}</v-btn>
        </v-card-actions>
      </v-card>
  </template>
  
  <script>
  import { useStudentsStore } from "@/stores/students.store";
  export default {
    props: {
      student: {
        type: Object,
      }
    },
    setup() {
      const studentsStore = useStudentsStore();
      return { studentsStore };

    },
    methods: {
      closeDialog() {
        this.$emit('close');
      },
      deleteStudent(studentId) {
        this.studentsStore.delete(studentId)
        this.$emit('close');
      },
    }
  };
  </script>
  