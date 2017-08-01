import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserStorageService} from '../user-storage.service';

@Component({
	selector: 'app-user-view',
	providers: [UserStorageService],
	templateUrl: './user-view.component.html',
	styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

	constructor(private router: Router, private route: ActivatedRoute, private userStorageService: UserStorageService) {
	}

	ngOnInit() {
	}

	goToProfile() {
		this.router.navigate(['profile'], {relativeTo: this.route});
	}

	goToTimer() {
		this.router.navigate(['timer'], {relativeTo: this.route});
	}

	goToUsers() {
		this.router.navigate(['users'], {relativeTo: this.route});

	}

	logout() {
		this.userStorageService.logOut();
		this.router.navigate(['/']);
	}
}
