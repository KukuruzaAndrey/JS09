import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserStorageService} from '../user-storage.service';

@Component({
	selector: 'app-log-in',
	providers: [UserStorageService],
	templateUrl: './log-in.component.html',
	styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
	tryToLogIn = {email: '', password: ''};
	isRegister = true;
	logInForm: FormGroup;


	constructor(private formBuilder: FormBuilder, private router: Router, private userStorageService: UserStorageService) {
		if (userStorageService.isUserLogged()) {
			router.navigate(['user']);
		}
	}

	logIn(): void {
		this.tryToLogIn = this.logInForm.getRawValue();
		const user = this.userStorageService.getRegisteredUser(this.tryToLogIn);
		if (typeof user !== 'undefined') {
			this.userStorageService.setLoggedUser(user);
			this.router.navigate(['/user']);
		} else {
			this.isRegister = false;
		}
	}

	ngOnInit(): void {
		this.buildForm();
	}

	buildForm(): void {
		this.logInForm = this.formBuilder.group({
			'email': [this.tryToLogIn.email, [Validators.required, Validators.email]],
			'password': [this.tryToLogIn.password, [Validators.required, Validators.minLength(3)]],
		});
	}


	goToRegister(): void {
		this.router.navigate(['registration']);
	}

	goToForgotPass() {
		this.router.navigate(['forgot-pass']);
	}


}
