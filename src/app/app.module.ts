import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { GetRequestService } from './services/get-request.service';
import { AuthguardService } from './services/authguard.service';

@NgModule({
  declarations: [AppComponent, LoginFormComponent, UserComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthguardService],
      },
      {
        path: '**',
        component: LoginFormComponent,
      },
    ]),
  ],
  providers: [GetRequestService],
  bootstrap: [AppComponent],
})
export class AppModule {}
