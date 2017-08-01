import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../plain objects/user';
import {UserStorageService} from '../user-storage.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-registration',
	providers: [UserStorageService],
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	user = new User();
	registrationForm: FormGroup;

	constructor(private formBuilder: FormBuilder, private userStorageService: UserStorageService, private router: Router) {
	}

	ngOnInit(): void {
		this.buildForm();
	}

	buildForm(): void {
		this.registrationForm = this.formBuilder.group({
			'name': [this.user.name, [Validators.required]],
			'surname': [this.user.surname, [Validators.required]],
			'email': [this.user.email, [Validators.required, Validators.email]],
			'year': [this.user.year, [Validators.required, Validators.max(2000), Validators.min(1900)]],
			'password': [this.user.password, [Validators.required, Validators.minLength(3)]],
		});
	}

	registerUser(): void {
		this.user = this.registrationForm.getRawValue();
		this.userStorageService.addUser(this.user);
		this.userStorageService.setLoggedUser(this.user);
		this.router.navigate(['user']);
	}
}
