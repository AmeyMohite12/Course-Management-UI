import { TestBed } from "@angular/core/testing";

import { MaterialService } from "./material.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { GoogleLoginProvider } from "angularx-social-login";
import { GoogleLoginService } from "./google-login.service";
import { ResponseForm } from "./material.model";

class MockGoogleLoginService {
  superUser: boolean;
  checkSuperUser() {}
}

fdescribe("MaterialService", () => {
  let service: MaterialService;
  let httpmock: HttpTestingController;
  responseForm: ResponseForm;
  let googleservice: GoogleLoginService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: GoogleLoginService, useClass: MockGoogleLoginService },
      ],
    });
    service = TestBed.inject(MaterialService);
    httpmock = TestBed.get(HttpTestingController);
    googleservice = TestBed.inject(GoogleLoginService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("test getVersion", () => {
    const data = [];

    service.getVersion(1);

    const req = httpmock.expectOne("http://localhost:8080/file/get/1");
    expect(req.request.method).toBe("GET");
    req.flush(data);
  });

  it("test getResponseData", () => {
    const data = [];

    service.getResponseData();

    const req = httpmock.expectOne("http://localhost:8080/file/getall/");
    expect(req.request.method).toBe("GET");
    req.flush(data);
  });

  it("test downloadFile", () => {
    var csvFile = "a,b,c",
      filename = "abc.csv";

    var blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });
    const url = "myurl";
    service.downloadFile(url);
    const req = httpmock.expectOne(url);
    expect(req.request.method).toBe("GET");
    req.flush(blob);
  });

  it("test postForm", () => {
    const myfile = new File(["sample"], "sample.txt", { type: "text/plain" });
    service.responseForm = {
      file: myfile,
      description: "mydesc",
      creator: "hello",
    };
    service.currentId = 1;

    service.postForm(1);

    // const req = httpmock.expectOne("http://localhost:8080/file/updateFile");
    // expect(req.request.method).toBe("POST");
  });

  it("DeleteFile with superUser ", () => {
    googleservice.superUser = true;

    service.deleteFile(1);
    // const req = httpmock.expectOne("http://localhost:8080/file/delete/1");
    // expect(req.request.method).toBe("DELETE");
  });

  it("DeleteFile without superUser ", () => {
    googleservice.superUser = false;

    service.deleteFile(1);
  });

  it("Update file wih super user", () => {
    googleservice.superUser = true;

    const myfile = new File(["sample"], "sample.txt", { type: "text/plain" });
    service.responseForm = {
      file: myfile,
      description: "mydesc",
      creator: "hello",
    };
    service.currentId = 1;

    service.updateFile();
  });
  it("update without superUser ", () => {
    googleservice.superUser = false;

    service.updateFile();
  });

  it("test downloadFileVersion", () => {
    var csvFile = "a,b,c",
      filename = "abc.csv";

    var blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });
    const url = "myurl";
    service.downloadFileVersion(url);
    const req = httpmock.expectOne(url);
    expect(req.request.method).toBe("GET");
    req.flush(blob);
  });
});
