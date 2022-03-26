export class User {
  id?: string;
  firstName: string;
  lastName: string;

  constructor(input: Partial<User>) {
    this.id = input.id;

    if (!input.firstName) {
      throw new Error("input.firstName cannot be undefined");
    }
    if (!input.lastName) {
      throw new Error("input.lastName cannot be undefined");
    }
    this.firstName = input.firstName;
    this.lastName = input.lastName;
  }
}
