import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { FormBuilder } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { GetRequestService } from "./services/get-request.service";
import { AuthguardService } from "./services/authguard.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TableComponent } from "./table/table.component";

import { ToastrModule } from "ngx-toastr";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { CoursesComponent } from "./courses/courses.component";
import { CourseComponent } from "./courses/course/course.component";
import { CoursesListComponent } from "./courses/courses-list/courses-list.component";
import { CourseService } from "./shared/course.service";
import { GoogleLoginService } from "./shared/google-login.service";

import { GoogleLoginProvider, AuthService } from "angularx-social-login";
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { NoAccessComponent } from "./no-access/no-access.component";

export function socialConfigs() {
  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        "872632589519-u6e1qqiikbri627o5v9nrbs5im8b9q1s.apps.googleusercontent.com"
      ),
    },
  ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    UserComponent,
    TableComponent,
    CoursesComponent,
    CourseComponent,
    CoursesListComponent,
    NoAccessComponent,
  ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: "user",
        component: TableComponent,
        canActivate: [AuthguardService],
      },
      {
        path: "course",
        component: CoursesComponent,
        canActivate: [AuthguardService],
      },
      {
        path: "NotFound",
        component: NoAccessComponent,
      },
      {
        path: "**",
        component: LoginFormComponent,
      },
    ]),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    GetRequestService,
    HttpClient,
    CourseService,
    {
      provide: AuthServiceConfig,
      useFactory: socialConfigs,
    },
    GoogleLoginService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
