import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MaterialFormComponent } from "./material-form.component";
import { MaterialService } from "../shared/material.service";

import { MatDialogRef } from "@angular/material/dialog";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { ReactiveFormsModule, FormsModule, NgForm } from "@angular/forms";
import { of } from "rxjs";

class MockMaterialService {
  responseForm;
  currentId: number = 1;

  updateFile() {
    return of([{ type: "HttpEventType.ResponseHeader" }]);
  }
}

class MockMatDialogRef {
  close() {}
}

class MockToastrService {
  warning() {}
  info() {}
}

describe("MaterialFormComponent", () => {
  let component: MaterialFormComponent;
  let fixture: ComponentFixture<MaterialFormComponent>;
  let materialservice: MaterialService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialFormComponent],
      imports: [ReactiveFormsModule, FormsModule],
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
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("submit Form current id non null", () => {
    expect(component.submitForm(11));
  });

  it("onFIle select check", () => {
    expect(component.onFileSelect(11));
  });
});
