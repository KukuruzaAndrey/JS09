import {Component, OnInit} from '@angular/core';
import {UserStorageService} from '../../user-storage.service';
import {User} from '../../plain objects/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'app-profile',
	providers: [UserStorageService],
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	user: User;
	registrationForm: FormGroup;

	constructor(private formBuilder: FormBuilder, private userStorageService: UserStorageService) {
		this.user = userStorageService.getLoggedUser();
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
		this.registrationForm.get('email').disable();
	}

	saveProfile(): void {
		this.user = this.registrationForm.getRawValue();
		//console.log(this.user);
		//this.registrationForm.reset();
		this.userStorageService.editUser(this.user);
		this.userStorageService.setLoggedUser(this.user);
	}
}
