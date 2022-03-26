export class User {
  id?: string;
  firstName: string;
  lastName: string;

  constructor(input: Partial<User>) {
    this.id = input.id;

    if (!input.firstName) {
      throw "input.firstName cannot be undefined";
    }
    if (!input.lastName) {
      throw "input.lastName cannot be undefined";
    }
    this.firstName = input.firstName;
    this.lastName = input.lastName;
  }
}
