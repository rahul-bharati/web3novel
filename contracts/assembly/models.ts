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
@nearBindgen
export class Story {
  title: string;
  content: string;
  address: string;
  slug: string;
  added_on: u64;

  constructor (_title: string, _content: string, _slug: string) {
    this.title = _title;
    this.content = _content;
    this.slug = _slug;
    this.address = Context.sender;
    this.added_on = Context.blockTimestamp;
  }
}

export const stories = new PersistentVector<Story>("s_");
export const users = new PersistentMap<string, User>("u_");