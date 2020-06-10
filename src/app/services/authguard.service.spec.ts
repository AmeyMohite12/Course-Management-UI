import { TestBed, getTestBed } from "@angular/core/testing";

import { AuthguardService } from "./authguard.service";
import { GoogleLoginService } from "../shared/google-login.service";
import { RouterTestingModule } from "@angular/router/testing";

class MockGoogleLoginService {
  loggedIn: boolean = false;
  currentUser: string;
  currentUserName: string;
  superUser: boolean;
  status() {}
}

fdescribe("AuthguardService", () => {
  let service: AuthguardService;
  let googleservice: GoogleLoginService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: GoogleLoginService,
          useClass: MockGoogleLoginService,
        },
      ],
      imports: [RouterTestingModule.withRoutes([])],
    });
    service = TestBed.inject(AuthguardService);
    googleservice = TestBed.inject(GoogleLoginService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("call googleLogin flg true", () => {
    googleservice.loggedIn = true;

    service.canActivate();
  });

  it("call googleLogin flg false", () => {
    googleservice.loggedIn = false;
    service.canActivate();
  });
});
