import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserStorageService} from '../../user-storage.service';

@Component({
	selector: 'app-show-pass',
	templateUrl: './show-pass.component.html',
	styleUrls: ['./show-pass.component.css']
})
export class ShowPassComponent implements OnInit {

	password;

	constructor(public route: ActivatedRoute, public userStorageService: UserStorageService) {
		console.log(route);
		this.password = userStorageService.getUserPass(route.snapshot.params.email);
	}

	ngOnInit() {
	}

}
