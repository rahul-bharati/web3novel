import { Context, PersistentVector, PersistentMap } from 'near-sdk-as';

@nearBindgen
export class User {
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  bio: string;

  constructor( _firstname: string, _lastname: string, _email: string, _bio: string) {
    this.firstname = _firstname;
    this.lastname = _lastname;
    this.address = Context.sender;
    this.email = _email;
    this.bio = _bio;
  }
}

export const users = new PersistentMap<string, User>("u_");