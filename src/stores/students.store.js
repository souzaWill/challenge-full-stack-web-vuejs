import { defineStore } from 'pinia';
import { studentsService } from '@/services/studentsService';
import { StudentDTO } from '@/DTOs/StudentDTO';

export const useStudentsStore = defineStore('students', {
  state: () => ({
    students: [],
    totalItems: 0,
    itemsPerPage: 10,
    errors: [],
    error: '',
    hasError: false,
    notification: {},
  }),
  actions: {
    setErrors(response) {
      this.hasError = true;
      if (response.status === 422) {
        this.errors = response.data.errors;
      } else {
        this.error = response.data.message;
      }
    },
    clearErrors() {
      this.hasError = false;
      this.errors = [];
      this.error = '';
    },
    setMessage(message, type) {
      this.notification = {
        message,
        type,
      };
    },
    clearMessage() {
      this.notification = {};
    },
    async fetchStudents(page,search) {
      try {

        const { data, meta } = await studentsService.get({
          page,
          per_page: this.itemsPerPage,
          search,
        });
        this.students = StudentDTO.fromArray(data);
        this.totalItems =  this.itemsPerPage == null ? this.students.length : meta?.total;
      } catch (error) {
        this.setMessage(
          'An unexpected error occurred. Please try again later.',
          'error'
        );
      }
    },
    async create(student) {
      try {
        this.clearErrors();
        this.clearMessage();

        const { data } = await studentsService.create(student);
        this.students.push(new StudentDTO(data));

        this.setMessage('Item created successfully!', 'success');
      } catch (error) {
        this.setErrors(error.response);
      }
    },
    async update(student) {
      try {
        this.clearErrors();
        this.clearMessage();

        const { data } = await studentsService.update(student.id, student);

        let indexStoredStudent = this.students.findIndex(
          (StoredStudent) => StoredStudent.id === student.id
        );
        this.students[indexStoredStudent] = new StudentDTO(data);

        this.setMessage('Item updated successfully!', 'success');
      } catch (error) {
        this.setErrors(error.response);
      }
    },
    async delete(id) {
      try {
        this.clearMessage();

        await studentsService.delete(id);
        this.students = this.students.filter((student) => student.id !== id);

        this.setMessage('Item deleted successfully!', 'success');
      } catch (error) {
        this.setErrors(error.response);
      }
    },
  },
});
