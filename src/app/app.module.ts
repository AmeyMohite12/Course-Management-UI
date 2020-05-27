import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

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

import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    UserComponent,
    TableComponent,
  ],
  imports: [
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
  ],
  providers: [GetRequestService, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
