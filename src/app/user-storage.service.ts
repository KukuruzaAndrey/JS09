import {Injectable} from '@angular/core';
import {User} from './plain objects/user';

@Injectable()
export class UserStorageService {


	constructor() {

	}

	public passCaptcha(value: boolean) {
		localStorage.setItem('captcha', JSON.stringify(value));
	}

	public isCaptchaPassed(): boolean {
		if (JSON.parse(localStorage.getItem('captcha'))) {
			return true;
		}
		return false;
	}


	public addUser(user: User): void {
		const users = this.getUsers();
		users.push(user);
		this.setUsers(users);
		console.log(JSON.parse(localStorage.getItem('users')));
	}

	public editUser(user: User): void {
		const users = this.getUsers();
		const index = users.findIndex(u => (u.email === user.email));
		users[index] = user;
		this.setUsers(users);
	}

	public setLoggedUser(user: User): void {
		localStorage.setItem('logged user', JSON.stringify(user));
	}

	public getLoggedUser(): User {
		return JSON.parse(localStorage.getItem('logged user'));
	}

	public isUserLogged(): boolean {
		return (typeof this.getLoggedUser() !== 'undefined' && this.getLoggedUser() !== null);
	}

	public logOut(): void {
		localStorage.removeItem('logged user');
	}

	public getRegisteredUser({email, password}: { email: string, password: string }): User {
		const users = this.getUsers();
		const registeredUser = users.find(user => (user.email === email) && (user.password === password));
		return registeredUser;
	}

	public getUserPass(email: string): string {
		const users = this.getUsers();
		const registeredUser = users.find(user => (user.email === email));
		return registeredUser.password;
	}

	public getUsers(): Array<User> {
		return JSON.parse(localStorage.getItem('users')) || [];
	}

	private setUsers(users: Array<User>) {
		localStorage.setItem('users', JSON.stringify(users));
	}
}
