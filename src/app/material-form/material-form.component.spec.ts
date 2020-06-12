import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MaterialFormComponent } from "./material-form.component";
import { MaterialService } from "../shared/material.service";

import { MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ReactiveFormsModule, FormsModule, NgForm } from "@angular/forms";
import { of } from "rxjs";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HttpEventType, HttpUploadProgressEvent } from "@angular/common/http";
import { _ } from "ag-grid-community";

class MockMaterialService {
  responseForm;
  currentId: number = 1;

  postForm(form: any): any {
    return of({
      event: <HttpUploadProgressEvent>{
        type: HttpEventType.UploadProgress,
        loaded: 7,
        total: 10,
      },
    });
  }
}

class MockMatDialogRef {
  close() {}
}

class MockToastrService {
  warning() {}
  info() {}
}

fdescribe("MaterialFormComponent", () => {
  let component: MaterialFormComponent;
  let fixture: ComponentFixture<MaterialFormComponent>;
  let materialservice: MaterialService;

  let httpmock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialFormComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        { provide: MaterialService, useClass: MockMaterialService },
        { provide: MatDialogRef, useClass: MockMatDialogRef },
        { provide: ToastrService, useClass: MockToastrService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    materialservice = TestBed.inject(MaterialService);
    httpmock = TestBed.get(HttpTestingController);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("test CloseBox()", () => {
    component.closeBox();
    component.onClose();
  });

  it("test SubmitwithNull i.e. Post a form ", () => {
    const myfile = new File(["sample"], "sample.txt", { type: "text/plain" });
    materialservice.currentId = null;

    // spyOn(materialservice, "postCourse").and.returnValue({

    // });

    const formfile = <NgForm>{
      value: {
        id: null,
        file: myfile,
      },
      resetForm: () => {
        return;
      },
    };

    expect(component.submitForm(formfile));
    let event = {
      target: {
        files: [formfile],
      },
    };
    component.onFileSelect(event);
  });
});
