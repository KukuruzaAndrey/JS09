import {Component, OnInit, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {User} from '../../plain objects/user';
import {UserStorageService} from '../../user-storage.service';
import {MdSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
	selector: 'app-users-table',
	providers: [UserStorageService],
	styleUrls: ['./users-table.component.css'],
	templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit {
	displayedColumns = ['name', 'surname', 'email', 'year', 'password'];
	dataSource: ExampleDataSource | null;

	@ViewChild(MdSort) sort: MdSort;

	constructor(private userStorageService: UserStorageService) {
	}

	ngOnInit() {
		this.dataSource = new ExampleDataSource(this.userStorageService.getUsers(), this.sort);
		this.sort.sort({id: 'name', start: 'asc', disableClear: true});
	}
}


export class ExampleDataSource extends DataSource<any> {
	dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

	constructor(private users: User[], private sort: MdSort) {
		super();
		this.dataChange.next(users);
	}

	connect(): Observable<User[]> {
		const displayDataChanges = [
			this.dataChange,
			this.sort.mdSortChange,
		];

		return Observable.merge(...displayDataChanges).map(() => {
			return this.getSortedData();
		});
	}

	getSortedData(): User[] {
		const data = this.users.slice();
		if (!this.sort.active || this.sort.direction === '') {
			return data;
		}
		return data.sort((a, b) => {
			let propertyA: number | string = '';
			let propertyB: number | string = '';

			switch (this.sort.active) {
				case 'name':
					[propertyA, propertyB] = [a.name, b.name];
					break;
				case 'surname':
					[propertyA, propertyB] = [a.surname, b.surname];
					break;
				case 'email':
					[propertyA, propertyB] = [a.email, b.email];
					break;
				case 'year':
					[propertyA, propertyB] = [a.year, b.year];
					break;
				case 'password':
					[propertyA, propertyB] = [a.password, b.password];
					break;
			}

			const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
			const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

			return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
		});
	}

	disconnect() {
	}
}
