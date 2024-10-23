<template>
  <MainLayout>

    <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card>
                        <v-toolbar color="white" title="Consulta de alunos"></v-toolbar>

                        <v-card-text>
                            <v-row>
                                <v-col align-self="start" cols="12" sm="8">
                                    <v-text-field 
                                        v-model="search" 
                                        append-inner-icon="mdi-magnify" 
                                        density="compact"
                                        label="Digite sua busca" 
                                        variant="solo" 
                                        hide-details 
                                        single-line
                                        @keyup.enter="loadStudents"
                                        @click:append-inner="loadStudents">
                                    </v-text-field>
                                </v-col>

                                <v-col align-self="end" cols="12" sm="4">
                                    <!-- <v-dialog max-width="500px" v-model="dialog">
                                        <template v-slot:activator="{ props: activatorProps }">
                                            <v-btn v-bind="activatorProps" block class="mb-8" color="blue" size="large"
                                                variant="tonal">
                                                Novo Estudante
                                            </v-btn>
                                        </template>

                                        <v-card>
                                            <v-toolbar color="blue" title="Cadastrar Novo Estudante"></v-toolbar>

                                            <v-card-text>
                                                <v-form ref="form" v-model="valid">
                                                    <v-text-field label="Nome" v-model="newStudent.name"
                                                        :rules="[v => !!v || 'Nome é obrigatório']"></v-text-field>
                                                    <v-text-field label="Registro Acadêmico (RA)"
                                                        v-model="newStudent.ra"
                                                        :rules="[v => !!v || 'RA é obrigatório']"></v-text-field>
                                                    <v-text-field label="CPF" v-model="newStudent.cpf"
                                                        :rules="[v => !!v || 'CPF é obrigatório']"></v-text-field>
                                                </v-form>
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" text
                                                    @click="dialog = false">Cancelar</v-btn>
                                                <v-btn color="blue darken-1" text @click="saveStudent">Salvar</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog> -->
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
                                        @update:options="loadStudents">
                                        <template v-slot:[`item.actions`]="{ item }">
                                            <v-icon class="me-2" size="small">mdi-pencil</v-icon>
                                            <v-icon size="small">mdi-delete</v-icon>
                                        </template>
                                    </v-data-table-server>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>


        </v-container>

  </MainLayout>
</template>

<script>
  import { useStudentsStore } from '@/stores/students.store';

  export default {
    data() {
        return {
            search: '',
            itemsPerPage: 10,
            loading: false,
            dialog: false,
            valid: false,
            showConfirmDelete: false,
            selectedStudent: null,
            headers: [
                { title: 'id', align: 'start', key: 'id' },
                { title: 'RA', align: 'start', key: 'registration_number' },
                { title: 'Nome', align: 'start', key: 'name' },
                { title: 'CPF', align: 'start', key: 'document' },
                { title: 'Ações', key: 'actions', align: 'start' },
            ]
        };
    },
    setup() {
        const studentsStore = useStudentsStore();

        return { studentsStore };
    },
    methods: {
        async loadStudents({ page, itemsPerPage }) {
            try {
                await this.studentsStore.fetchStudents(page, itemsPerPage, this.search);
            } catch (error) {
                console.error(error);
            }
        }
    },
  };
</script>