import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserStorageService} from '../user-storage.service';
import {ActivatedRoute, Router} from '@angular/router';

declare const grecaptcha: any;

declare global {
	interface Window {
		grecaptcha: any;
		checkCaptcha: any;
	}
}

@Component({
	selector: 'app-forgot-pass',
	providers: [UserStorageService],
	templateUrl: './forgot-pass.component.html',
	styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

	forgotPassForm: FormGroup;
	email: string;

	constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private userStorageService: UserStorageService) {
		userStorageService.passCaptcha(false);
	}

	ngOnInit(): void {
		this.buildForm();
		//магия вне хогвардса
		window.checkCaptcha = this.checkCaptcha.bind(this);
		window.grecaptcha.render('g-recaptcha', {
			'sitekey': '6Ld5FysUAAAAAI76LoBDCqamqBBy067QfyG3ETgc',
			'callback': 'checkCaptcha',
			'type': 'image'
		});
	}

	buildForm(): void {
		this.forgotPassForm = this.formBuilder.group({
			'email': [this.email, [Validators.required, Validators.email]],
		});
	}

	checkCaptcha(response) {
		console.log(response);
		if (response !== null) {
			this.userStorageService.passCaptcha(true);
		}
	}

	showpass() {
		const email = this.forgotPassForm.getRawValue().email;
		console.log(email);
		this.router.navigate(['pass', {email: email}], {relativeTo: this.route});
	}
}
