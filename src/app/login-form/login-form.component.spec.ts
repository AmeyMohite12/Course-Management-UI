import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginFormComponent } from "./login-form.component";
import { GetRequestService } from "../services/get-request.service";
import { GoogleLoginService } from "../shared/google-login.service";
import { of } from "rxjs";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Form,
  Validators,
} from "@angular/forms";

class MockGetRequestService {
  checkEmail(form: any) {
    return of([]);
  }
}

class MockGoogleLoginService {
  signInWithGoogle() {
    return;
  }
  signOut() {
    return;
  }
}

fdescribe("LoginFormComponent", () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      providers: [
        { provide: GetRequestService, useClass: MockGetRequestService },
        { provide: GoogleLoginService, useClass: MockGoogleLoginService },
        FormBuilder,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("test loadApi() ", () => {
    expect(component.loadApi());
  });

  it("test loginService() , google login and logout", () => {
    expect(component.loginService(2));
    expect(component.googleLogin());
    expect(component.googleLogout());
  });
});
