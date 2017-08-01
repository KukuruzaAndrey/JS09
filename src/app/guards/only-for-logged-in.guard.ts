import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserStorageService} from '../user-storage.service';

@Injectable()
export class OnlyForLoggedInGuard implements CanActivate {
	constructor(private userStorageService: UserStorageService) {
	}

	canActivate(next: ActivatedRouteSnapshot,
				state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return this.userStorageService.isUserLogged();
	}
}
