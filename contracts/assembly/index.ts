/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */

import { Context, logging, storage } from 'near-sdk-as'
import { Story, User, users } from './models';
import { stories } from './models';

export function addUser( _firstname: string, _lastname: string, _email: string, _bio: string): void {
  const user = new User(_firstname, _lastname, _email, _bio);
  users.set(Context.sender, user);
}

export function getUser(id: string): User|null {
  const user = users.get(id);
  return user;
}

export function addStory(_title: string, _content: string, _slug: string): void {
  const story = new Story(_title, _content, _slug);
  stories.push(story);
}

export function getStories(): Story[] {
  const story_collection: Story[] = [];
  const total_stories = stories.length;
  for(let i=0; i<total_stories; i++){
    story_collection[i] = stories[i];
  }
  return story_collection;
}

export function getStory(slug: string):Story|null {
  const total_stories = stories.length;
  for(let i=0; i<total_stories; i++) {
    if(stories[i].slug == slug) {
      return stories[i];
    }
  }
  return null;
}