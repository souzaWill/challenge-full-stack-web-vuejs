export class StudentDTO {
  constructor({ id, registration_number, document, user }) {
    this.id = id;
    this.registration_number = registration_number;
    this.name = user.name;
    this.document = document;
  }

  static fromArray(studentsArray) {
    return studentsArray.map((student) => new StudentDTO(student));
  }
}
