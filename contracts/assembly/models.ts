import { context, PersistentVector, PersistentMap } from 'near-sdk-as';

@nearBindgen
export class User {
  name: string;
  address: string;
  email: string;
  display_picture: string;

  constructor( _name: string, _email: string, _display_picture: string) {
    this.name = _name;
    this.address = context.sender;
    this.email = _email;
    this.display_picture = _display_picture;
  }
}

export const users = new PersistentMap<string, User>("u_");