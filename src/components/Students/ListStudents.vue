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
                <v-btn
                  block
                  class="mb-8"
                  color="blue"
                  size="large"
                  variant="tonal"
                  @click="openCreateDialog()"
                >
                  {{ $t('Create student') }}
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
                  v-model:items-per-page="studentsStore.itemsPerPage"
                  :items-length="studentsStore.totalItems"
                  :loading="loading"
                  @update:options="loadStudents"
                >
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                      class="me-2"
                      size="small"
                      @click="openEditDialog(item)"
                      >mdi-pencil</v-icon
                    >
                    <v-icon size="small" @click="openConfirmDeleteDialog(item)"
                      >mdi-delete</v-icon
                    >
                  </template>
                </v-data-table-server>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog max-width="500px" v-model="createDialog">
      <FormStudents @close="closeCreateDialog(true)"></FormStudents>
    </v-dialog>

    <v-dialog max-width="500px" v-model="editDialog">
      <FormStudents
        :student="selectedStudent"
        @close="closeEditDialog(true)"
      ></FormStudents>
    </v-dialog>

    <v-dialog max-width="500px" v-model="confirmDeleteDialog">
      <ConfirmDelete
        :student="selectedStudent"
        @close="closeConfirmDeleteDialog(true)"
      ></ConfirmDelete>
    </v-dialog>

    <MessageSnackbar
      v-if="studentsStore.notification.message"
      :message="this.studentsStore.notification.message"
      :color="this.studentsStore.notification.type"
    ></MessageSnackbar>
  </v-container>
</template>

<script>
import { useStudentsStore } from '@/stores/students.store';
import { useI18n } from 'vue-i18n';

export default {
  data() {
    return {
      search: '',
      loading: false,
      createDialog: false,
      editDialog: false,
      confirmDeleteDialog: false,
      selectedStudent: null,
      headers: [
        { title: 'id', align: 'start', key: 'id' },
        { title: 'RA', align: 'start', key: 'registration_number' },
        { title: this.t('Name'), align: 'start', key: 'name' },
        { title: this.t('Document'), align: 'start', key: 'document' },
        { title: this.t('Actions'), key: 'actions', align: 'start' },
      ],
    };
  },
  setup() {
    const studentsStore = useStudentsStore();
    const { t } = useI18n();

    return { studentsStore, t };
  },
  methods: {
    async loadStudents({ page }) {
      this.loading = true;
      this.studentsStore.itemsPerPage = this.studentsStore.itemsPerPage == -1 ? null : this.studentsStore.itemsPerPage;
      await this.studentsStore.fetchStudents(page, this.search);
      this.loading = false;
    },
    openCreateDialog() {
      this.createDialog = true;
    },
    openEditDialog(student) {
      this.selectedStudent = student;
      this.editDialog = true;
    },
    openConfirmDeleteDialog(student) {
      this.selectedStudent = student;
      this.confirmDeleteDialog = true;
    },
    closeCreateDialog(reload = false) {
      this.createDialog = false;
      if (reload) {
        this.loadStudents({ page: 1 });
      }
    },
    closeEditDialog(reload = false) {
      this.editDialog = false;
      if (reload) {
        this.loadStudents({ page: 1 });
      }
    },
    closeConfirmDeleteDialog(reload = false) {
      this.confirmDeleteDialog = false;
      if (reload) {
        this.loadStudents({ page: 1 });
      }
    },
  },
};
</script>
