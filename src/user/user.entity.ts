export class User {
  id: string;
  firstName: string;
  lastName: string;

  constructor(input: { id: string; firstName: string; lastName: string }) {
    this.id = input.id;
    this.firstName = input.firstName;
    this.lastName = input.lastName;
  }
}
