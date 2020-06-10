import { TestBed } from "@angular/core/testing";

import { TrainerService } from "./trainer.service";
import { GoogleLoginService } from "../shared/google-login.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { Trainer } from "./trainer.model";
import { Course } from "./course.model";
import { RouterTestingModule } from "@angular/router/testing";

class MockGoogleLoginService {
  loggedIn: boolean;
  superUser: boolean;
  checkStatus(): boolean {
    return this.superUser;
  }
  checkSuperUser() {}
}

const trainer = {
  id: 1,
  name: "string",
  type: "string",
  gender: "string",
  age: 12,
};
const course: Course = {
  id: 1,
  description: "String",
  creator: "String",
  skill: "String",
  prerequisite: "String",
  lastupdated: "String",
};
fdescribe("TrainerService", () => {
  let service: TrainerService;
  let googleservice: GoogleLoginService;
  let httpmock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: GoogleLoginService, useClass: MockGoogleLoginService },
        TrainerService,
      ],
    });
    service = TestBed.inject(TrainerService);
    googleservice = TestBed.inject(GoogleLoginService);
    httpmock = TestBed.get(HttpTestingController);
    service.currentTrainer = trainer.id;
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("check update with no superuser", () => {
    spyOn(googleservice, "checkStatus").and.returnValue(false);
    service.updateCourse(trainer);
  });

  it("check update with  superuser", () => {
    spyOn(googleservice, "checkStatus").and.returnValue(true);
    service.updateCourse(trainer);
  });

  it("check getTrainerCourseMapping ", () => {
    service.getTrainerCourseMapping().subscribe((res: Trainer) => {
      expect(res.id).toBe(1);
    });

    const req = httpmock.expectOne(
      "http://localhost:8080/trainer_course/trainer_course_count"
    );
    expect(req.request.method).toBe("GET");
    req.flush(trainer);
  });

  it(" test postCourse", () => {
    service.postCourse(trainer).subscribe((res: Trainer) => {
      expect(res.id).toBe(1);
    });
    const req = httpmock.expectOne("http://localhost:8080/trainer/post");
    expect(req.request.method).toBe("POST");
    req.flush(trainer);
  });

  it("test getCourses", () => {
    service.getCourses().subscribe((res: Trainer) => {
      expect(res.id).toBe(1);
    });
    const req = httpmock.expectOne("http://localhost:8080/trainer/get");
    expect(req.request.method).toBe("GET");

    req.flush(trainer);
  });

  it("test getTrainerCourse", () => {
    service.getTrainerCourse(course.id);
    const req = httpmock.expectOne(
      `http://localhost:8080/trainer_course/trainer/get/${course.id}`
    );
    expect(req.request.method).toBe("GET");

    req.flush(course);
  });

  it("test deleteCourse with no superuser", () => {
    spyOn(googleservice, "checkStatus").and.returnValue(false);
    service.deleteCourse(1);
  });

  it("test deleteCourse with  superuser", () => {
    spyOn(googleservice, "checkStatus").and.returnValue(true);
    service.deleteCourse(1);
  });

  it("test refreshList", () => {
    service.refreshList();
    const req = httpmock.expectOne("http://localhost:8080/trainer/get");
    expect(req.request.method).toBe("GET");

    req.flush(trainer);
  });

  it("test assignCourse", () => {
    console.log("My current trainer id ", service.currentTrainer);
    service.assignCourse(1);

    // const req = httpmock.expectOne(
    //   `http://localhost:8080/trainer_course/post/${trainer.id}/${trainer.id}`
    // );
    // expect(req.request.method).toBe("POST");
  });

  it("test unassignCourse", () => {
    console.log("My current trainer id ", service.currentTrainer);
    service.unAssignCourse(1);

    // const req = httpmock.expectOne(
    //   `http://localhost:8080/trainer_course/delete/${trainer.id}/${trainer.id}`
    // );
    // expect(req.request.method).toBe("DELETE");
  });
});
