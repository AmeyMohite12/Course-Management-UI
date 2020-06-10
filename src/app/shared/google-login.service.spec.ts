import { TestBed } from "@angular/core/testing";

import { GoogleLoginService } from "./google-login.service";
import { AuthService, LoginOpt, SocialUser } from "angularx-social-login";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { serialize } from "v8";

const mocksociallogin: SocialUser = {
  provider: "string",
  id: null,
  email: "string",
  name: "string",
  photoUrl: "string",
  firstName: "string",
  lastName: "string",
  authToken: "string",
  idToken: "string",
  authorizationCode: "string",
};

class MockAuthService {
  signOut(revoke?: boolean): Promise<any> {
    return Promise.resolve(mocksociallogin);
  }

  signIn(providerId: string, opt?: LoginOpt): Promise<SocialUser> {
    return Promise.resolve(mocksociallogin);
  }
}

fdescribe("GoogleLoginService", () => {
  let service: GoogleLoginService;
  let httpmock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useClass: MockAuthService }],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
    });
    service = TestBed.inject(GoogleLoginService);
    authservice: TestBed.inject(AuthService);
    httpmock = TestBed.get(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("test checkSuperUser with no access", () => {
    service.superUser = false;
    service.checkSuperUser();
  });

  it("test checkSuperUser with  access", () => {
    service.superUser = true;
    service.checkSuperUser();
  });

  it("test signOut ", () => {
    service.signOut();
  });

  it("test signIn", () => {
    service.signInWithGoogle();
    service.checkStatus();
    service.logout();
  });
});
