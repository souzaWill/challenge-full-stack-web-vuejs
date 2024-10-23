import { defineStore } from 'pinia';
import { studentsService } from '@/services/studentsService';
import { StudentDTO } from '@/DTOs/StudentDTO';

export const useStudentsStore = defineStore('students', {
  state: () => ({
    students: [],
    totalItems: 0,
  }),
  actions: {
    async fetchStudents(page, itemsPerPage, search) {
        const { data, meta } = await studentsService.get({
          page, itemsPerPage, search
        }) 
        this.students = StudentDTO.fromArray(data)    
        this.totalItems = meta?.total;       
    }
  }
});
