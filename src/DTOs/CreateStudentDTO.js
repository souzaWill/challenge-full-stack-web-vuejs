export class CreateStudentDTO {
    constructor({ name, email, registration_number, document }) {
      this.name = name;
      this.email = email;
      this.registration_number = registration_number;
      this.document = document.replace(/\D/g, "");
    }
  }
  