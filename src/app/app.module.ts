import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegistrationComponent} from './registration/registration.component';
import {MdButtonModule, MdInputModule, MdSortModule, MdTableModule, MdToolbarModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LogInComponent} from './log-in/log-in.component';
import {ForgotPassComponent} from './forgot-pass/forgot-pass.component';
import {UserViewComponent} from './user-view/user-view.component';
import {ProfileComponent} from './user-view/profile/profile.component';
import {UsersTableComponent} from './user-view/users-table/users-table.component';
import {CdkTableModule} from '@angular/cdk/table';
import {TimerComponent} from './user-view/timer/timer.component';
import {OnlyForNonLoggedGuard} from './guards/only-for-non-logged.guard';
import {UserStorageService} from './user-storage.service';
import {OnlyForLoggedInGuard} from './guards/only-for-logged-in.guard';
import {ShowPassComponent} from './forgot-pass/show-pass/show-pass.component';
import {ForPassedCaptchaGuard} from './guards/for-passed-captcha.guard';


@NgModule({
	declarations: [
		AppComponent,
		RegistrationComponent,
		LogInComponent,
		ForgotPassComponent,
		UserViewComponent,
		ProfileComponent,
		UsersTableComponent,
		TimerComponent,
		ShowPassComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		NoopAnimationsModule,
		MdInputModule,
		MdButtonModule,
		MdToolbarModule,
		MdTableModule,
		CdkTableModule,
		MdSortModule
	],
	providers: [
		OnlyForNonLoggedGuard,
		OnlyForLoggedInGuard,
		UserStorageService,
		ForPassedCaptchaGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
