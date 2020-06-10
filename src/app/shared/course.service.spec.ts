import { TestBed } from "@angular/core/testing";

import { CourseService } from "./course.service";
import { GoogleLoginService } from "../shared/google-login.service";
import {
  HttpTestingController,
  HttpClientTestingModule,
} from "@angular/common/http/testing";
import { Course } from "./course.model";
import { combineAll } from "rxjs/operators";

class MockGoogleLoginService {
  loggedIn: boolean;
  currentUser: string;
  currentUserName: string;
  superUser: boolean;
  formData: Course;
  checkSuperUser() {}

  checkStatus() {
    return true;
  }
}

fdescribe("CourseService", () => {
  let service: CourseService;
  let httpmock: HttpTestingController;

  let googleservice: GoogleLoginService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: GoogleLoginService,
          useClass: MockGoogleLoginService,
        },
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CourseService);
    httpmock = TestBed.get(HttpTestingController);
    googleservice = TestBed.inject(GoogleLoginService);
  });
  afterEach(() => {
    httpmock.verify();
  });
  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("test postCourse ", () => {
    const data: Course = {
      id: 1,
      description: "String",
      creator: "String",
      skill: "String",
      prerequisite: "String",
      lastupdated: "String",
    };

    service.postCourse(data).subscribe((res: Course) => {
      expect(res.id).toBe(1);
    });

    const req = httpmock.expectOne("http://localhost:8080/course/post");
    expect(req.request.method).toBe("POST");
    req.flush(data);
  });

  it("test getCourse", () => {
    const data: Course = {
      id: 1,
      description: "String",
      creator: "String",
      skill: "String",
      prerequisite: "String",
      lastupdated: "String",
    };

    service.getCourses().subscribe((res: Course) => {
      expect(res.id).toBe(1);
    });

    const req = httpmock.expectOne("http://localhost:8080/course/get");
    expect(req.request.method).toBe("GET");
    req.flush(data);
  });

  it("check updateCourse with no superuser", () => {
    const data: Course = {
      id: 1,
      description: "String",
      creator: "String",
      skill: "String",
      prerequisite: "String",
      lastupdated: "String",
    };

    spyOn(googleservice, "checkStatus").and.returnValue(false);
    service.updateCourse(data);

    // const req = httpmock.expectOne("http://localhost:8080/course/update/1");
    // expect(req.request.method).toBe("PUT");
    // req.flush(data);
  });

  it("check refereshList", () => {
    const data: Course = {
      id: 1,
      description: "String",
      creator: "String",
      skill: "String",
      prerequisite: "String",
      lastupdated: "String",
    };
    service.formData = data;
    service.refreshList();

    const req = httpmock.expectOne("http://localhost:8080/course/get");
    expect(req.request.method).toBe("GET");
    req.flush(data);
  });

  it("check delteCourse with no super user ", () => {
    spyOn(googleservice, "checkStatus").and.returnValue(false);

    service.deleteCourse(1);
  });

  it("check deleteCourse with  super user", () => {
    const data: Course = {
      id: 1,
      description: "String",
      creator: "String",
      skill: "String",
      prerequisite: "String",
      lastupdated: "String",
    };

    service.deleteCourse(data.id);

    // const req = httpmock.expectOne("http://localhost:8080/course/delete/1");
    // expect(req.request.method).toBe("DELETE");
    // req.flush(data);

    httpmock.verify();
  });
});
