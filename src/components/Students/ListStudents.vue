<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-toolbar color="white" :title="$t('Student Inquiry')"></v-toolbar>
  
            <v-card-text>
              <v-row>
                <v-col align-self="start" cols="12" sm="8">
                  <v-text-field
                    v-model="search"
                    append-inner-icon="mdi-magnify"
                    density="compact"
                    :placeholder="$t('Enter your search')"
                    variant="solo"
                    hide-details
                    single-line
                    @keyup.enter="loadStudents"
                    @click:append-inner="loadStudents"
                  >
                  </v-text-field>
                </v-col>
  
                <v-col align-self="end" cols="12" sm="4">
                  <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="openDialog">
                    Novo Estudante
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
  
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-data-table-server
                    :headers="headers"
                    :items="studentsStore.students"
                    v-model:items-per-page="itemsPerPage"
                    :items-length="studentsStore.totalItems"
                    :loading="loading"
                    @update:options="loadStudents"
                  >
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-icon class="me-2" size="small" @click="openEditDialog(item)">mdi-pencil</v-icon>
                      <v-icon size="small">mdi-delete</v-icon>
                    </template>
                  </v-data-table-server>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <v-dialog max-width="500px" v-model="dialog">
        <FormStudents @close="dialog = false"></FormStudents>
      </v-dialog>
  
      <v-dialog max-width="500px" v-model="editDialog">
        <FormStudents :student="selectedStudent" @close="editDialog = false"></FormStudents>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  import { useStudentsStore } from "@/stores/students.store";
  import { useI18n } from "vue-i18n";
  import FormStudents from "./FormStudents.vue";
  
  export default {
    data() {
      return {
        search: "",
        itemsPerPage: 10,
        loading: false,
        dialog: false,
        editDialog: false,
        selectedStudent: null,
        headers: [
          { title: "id", align: "start", key: "id" },
          { title: "RA", align: "start", key: "registration_number" },
          { title: this.t("Name"), align: "start", key: "name" },
          { title: this.t("Document"), align: "start", key: "document" },
          { title: this.t("Actions"), key: "actions", align: "start" },
        ],
      };
    },
    components: {
      FormStudents,
    },
    setup() {
      const studentsStore = useStudentsStore();
      const { t } = useI18n();
      return { studentsStore, t };
    },
    methods: {
      async loadStudents({ page, itemsPerPage }) {
        try {
          await this.studentsStore.fetchStudents(page, itemsPerPage, this.search);
        } catch (error) {
          console.error(error);
        }
      },
      openDialog() {
        this.dialog = true;
      },
      openEditDialog(student) {
        this.selectedStudent = student;
        console.log(student);
        this.editDialog = true;
      },
    },
  };
  </script>
  