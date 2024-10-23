import { defineStore } from "pinia";
import { studentsService } from "@/services/studentsService";
import { StudentDTO } from "@/DTOs/StudentDTO";

export const useStudentsStore = defineStore("students", {
  state: () => ({
    students: [],
    totalItems: 0,
  }),
  actions: {
    async fetchStudents(page, itemsPerPage, search) {
      const { data, meta } = await studentsService.get({
        page,
        itemsPerPage,
        search,
      });
      this.students = StudentDTO.fromArray(data);
      this.totalItems = meta?.total;
    },
    async create(student) {
      const { data } = await studentsService.create(student)
      this.students.push(new StudentDTO(data))
    },
    async update(student) {
      const { data } = await studentsService.update(student.id, student)
      
      let indexStoredStudent = this.students.findIndex(StoredStudent => StoredStudent.id === student.id)
      this.students[indexStoredStudent] = new StudentDTO(data)
    },
    async delete(id) {
      await studentsService.delete(id)
    }
  },
});
