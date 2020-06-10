import { TestBed } from "@angular/core/testing";

import { GetRequestService } from "./get-request.service";
import { GoogleLoginService } from "../shared/google-login.service";
import {
  HttpTestingController,
  HttpClientTestingModule,
} from "@angular/common/http/testing";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { RouterModule, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Course } from "../shared/course.model";

class MockGoogleLoginService {
  loggedIn: boolean;
  currentUser: string;
  currentUserName: string;
  superUser: boolean;
}

fdescribe("GetRequestService", () => {
  let service: GetRequestService;
  let httpmock: HttpTestingController;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: GoogleLoginService,
          useClass: MockGoogleLoginService,
        },
      ],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
    });
    service = TestBed.inject(GetRequestService);
    httpmock = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
  });
  afterEach(() => {
    httpmock.verify();
  });
  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("getData called", () => {
    const dummyCourse: Course[] = [
      {
        id: 1,
        description: "String",
        creator: "String",
        skill: "String",
        prerequisite: "yep",
        lastupdated: "String",
      },
      {
        id: 2,
        description: "String",
        creator: "String",
        skill: "String",
        prerequisite: "yep",
        lastupdated: "String",
      },
    ];

    service.getData().subscribe((res: Course[]) => {
      expect(res.length).toBe(2);
    });

    const req = httpmock.expectOne("http://localhost:8080/course/get");
    expect(req.request.method).toBe("GET");
    req.flush(dummyCourse);
  });

  it("checkEmail called with passowrd match ", () => {
    const data = {
      firstName: "amey",
      username: "amey",
      password: "amey",
    };

    service.checkEmail(data);

    const req = httpmock.expectOne("http://localhost:8080/person/get/amey");
    expect(req.request.method).toBe("GET");
    req.flush(data);
  });
  it("checkEmail called with passowrd not matched ", () => {
    const data = {
      firstName: "amey",
      username: "amey",
      password: "amey",
    };
    const data_1 = {
      firstName: "amey",
      username: "amey",
      password: "nope",
    };

    service.checkEmail(data_1);

    const req = httpmock.expectOne("http://localhost:8080/person/get/amey");
    expect(req.request.method).toBe("GET");
    req.flush(data);
  });
});
