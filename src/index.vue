<template>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card>
                        <v-toolbar color="white" title="Consulta de alunos"></v-toolbar>

                        <v-card-text>
                            <v-row>
                                <v-col align-self="start" cols="12" sm="8">
                                    <v-text-field append-inner-icon="mdi-magnify" density="compact"
                                        label="Digite sua busca" variant="solo" hide-details single-line
                                        @click:append-inner="loadItems"></v-text-field>
                                </v-col>

                                <v-col align-self="end" cols="12" sm="4">
                                    <v-dialog max-width="500px" v-model="dialog">
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
                                    </v-dialog>
                                </v-col>
                            </v-row>
                        </v-card-text>

                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-data-table :headers="headers" :items="serverItems" :items-per-page="itemsPerPage"
                                        :loading="loading" @update:options="loadItems">
                                        <template v-slot:[`item.actions`]="{ item }">
                                            <v-icon class="me-2" size="small"
                                                @click="editItem(item)">mdi-pencil</v-icon>
                                            <v-icon size="small" @click="openDeleteDialog(item)">mdi-delete</v-icon>
                                        </template>
                                    </v-data-table>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <v-dialog v-model="dialogDelete" max-width="400px">
                <v-card>
                    <v-card-title class="text-h5">Confirmação</v-card-title>
                    <v-card-text>Tem certeza que deseja excluir o estudante "{{ selectedStudent.name }}"?</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Confirmar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
</template>

<script setup>
    import { ref } from 'vue';

    const itemsPerPage = ref(5);
    const serverItems = ref([]);
    const loading = ref(true);
    const dialog = ref(false);
    const valid = ref(false);  
    const dialogDelete = ref(false);  

    const newStudent = ref({
        name: '',
        ra: '',
        cpf: ''
    });

    const selectedStudent = ref({});

    const fakeData = ref([
        { ra: 'F1231321', name: 'Willian', cpf: '11111' },
    ]);

    const headers = ref([
        { title: 'RA', align: 'start', key: 'ra' },
        { title: 'Nome', align: 'start', key: 'name' },
        { title: 'CPF', align: 'start', key: 'cpf' },
        { title: 'Ações', key: 'actions', align: 'start' },
    ]);

    const loadItems = () => {
        loading.value = true;
        serverItems.value = fakeData.value;
        loading.value = false;
    };

    const saveStudent = () => {
        if (valid.value) {
            fakeData.value.push({ ...newStudent.value });
            dialog.value = false;
            newStudent.value = { name: '', ra: '', cpf: '' };
            loadItems();
        }
    };

    const openDeleteDialog = (item) => {
        selectedStudent.value = { ...item };
        dialogDelete.value = true;
    };

    const deleteItemConfirm = () => {
        fakeData.value = fakeData.value.filter(student => student.ra !== selectedStudent.value.ra);
        dialogDelete.value = false;
        loadItems();
    };

    const editItem = (item) => {
        newStudent.value = { ...item };
        dialog.value = true;
    };

    loadItems();
</script>
