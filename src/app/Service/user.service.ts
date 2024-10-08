import { Injectable } from '@angular/core';
import { User } from '../interfaces/user'; // Adjust the path if needed

@Injectable({
  providedIn: 'root',
})
export class UserService {
  static users: User[] = [
    {
      name: 'Basmala Ayman',
      email: 'basmala.ayman@gmail.com',
      password: 'basmala123',
      phone: '01007521470',
    },
    {
      name: 'Aya Shams',
      email: 'aya.shams@gmail.com',
      password: 'aya123',
      phone: '01149593077',
    },
    {
      name: 'Farida Mahmoud',
      email: 'farida.mahmoud@gmail.com',
      password: 'farida123',
      phone: '010044995999',
    },
    
  ];

  constructor() {}

  // Method to get the list of users
  static getUsers(): User[] {
    return this.users;
  }

  static pushUser(user:User): void{
    this.users.push(user);
  }

  // Optionally, you can add methods to add, remove, or update users
}
