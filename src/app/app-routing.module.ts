import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogInComponent} from './log-in/log-in.component';
import {ForgotPassComponent} from './forgot-pass/forgot-pass.component';
import {RegistrationComponent} from './registration/registration.component';
import {UserViewComponent} from './user-view/user-view.component';
import {ProfileComponent} from './user-view/profile/profile.component';
import {UsersTableComponent} from './user-view/users-table/users-table.component';
import {TimerComponent} from './user-view/timer/timer.component';
import {OnlyForNonLoggedGuard} from './guards/only-for-non-logged.guard';
import {OnlyForLoggedInGuard} from './guards/only-for-logged-in.guard';
import {ShowPassComponent} from './forgot-pass/show-pass/show-pass.component';
import {ForPassedCaptchaGuard} from './guards/for-passed-captcha.guard';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '/log-in'
	}, {
		path: 'log-in',
		component: LogInComponent,
	}, {
		path: 'forgot-pass',
		component: ForgotPassComponent,
		canActivate: [OnlyForNonLoggedGuard],
		children: [
			{
				path: 'pass',
				component: ShowPassComponent,
				canActivate: [ForPassedCaptchaGuard]
			}
		]
	}, {
		path: 'registration',
		component: RegistrationComponent,
		canActivate: [OnlyForNonLoggedGuard]
	}, {
		path: 'user',
		component: UserViewComponent,
		canActivate: [OnlyForLoggedInGuard],
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'profile'
			}, {
				path: 'profile',
				component: ProfileComponent,
			},
			{
				path: 'timer',
				component: TimerComponent,
			},
			{
				path: 'users',
				component: UsersTableComponent,
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
