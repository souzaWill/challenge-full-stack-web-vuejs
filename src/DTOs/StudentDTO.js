export class StudentDTO {
  constructor({ id, registration_number, document, user }) {
    this.id = id;
    this.name = user.name;
    this.email = user.email;
    this.registration_number = registration_number;
    this.document = document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  static fromArray(studentsArray) {
    return studentsArray.map((student) => new StudentDTO(student));
  }
}
