export class StudentDTO {
  constructor({ id, registration_number, document, user }) {
    this.id = id;
    this.name = user.name;
    this.email = user.email;
    this.registration_number = registration_number;
    this.document = document;
  }

  static fromArray(studentsArray) {
    return studentsArray.map((student) => new StudentDTO(student));
  }
}
