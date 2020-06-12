import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MaterialListComponent } from "./material-list.component";
import { MatDialog } from "@angular/material/dialog";
import { MaterialService } from "../shared/material.service";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";

const data = {
  id: 1,
  name: "2",
};

class MockMaterialService {
  currentId: number;
  getResponseData() {}

  getVersion(id: number) {
    return Promise.resolve(data);
  }
  deleteFile(id: number) {
    return of([data]);
  }

  downloadFile(url: string) {}
}

class MockToastrService {
  warning() {}
}

class MockMatDialog {
  open() {
    return {
      afterClosed: () => of([]),
    };
  }
}

fdescribe("MaterialListComponent", () => {
  let component: MaterialListComponent;
  let fixture: ComponentFixture<MaterialListComponent>;
  let dialog: MatDialog;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialListComponent],
      imports: [],
      providers: [
        { provide: MaterialService, useClass: MockMaterialService },
        {
          provide: ToastrService,
          useClass: MockToastrService,
        },
        {
          provide: MatDialog,
          useClass: MockMatDialog,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialListComponent);
    component = fixture.componentInstance;
    dialog = TestBed.get(MatDialog);

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("test getVersion", () => {
    component.getVersion(1);
  });

  it("test postMaterial", () => {
    component.postMaterial();
  });

  it("test updateFile", () => {
    component.updateFile(1);
  });

  it("test deleteFile", () => {
    component.deleteFile(1);
    let myspy = spyOn(dialog, "open");
  });

  it("test downloadFile", () => {
    component.downloadfile("yep");
    let myspy = spyOn(dialog, "open");
  });
});
