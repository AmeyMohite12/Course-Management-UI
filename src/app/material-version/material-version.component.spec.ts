import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MaterialVersionComponent } from "./material-version.component";

import { MaterialService } from "../shared/material.service";

import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

import {
  MatDialogRef,
  MatDialogModule,
  MatDialog,
} from "@angular/material/dialog";
import { of } from "rxjs";
import { NgModule } from "@angular/core";

class MockMaterialService {
  downloadFileVersion(url: string) {
    return of([]);
  }
}

class MockMatDialogRef {}

class DialogTestModule {}

fdescribe("MaterialVersionComponent", () => {
  let component: MaterialVersionComponent;
  let fixture: ComponentFixture<MaterialVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialVersionComponent],
      imports: [],
      providers: [
        { provide: MaterialService, useClass: MockMaterialService },
        {
          provide: MatDialogRef,
          useClass: MockMatDialogRef,
        },
      ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [MaterialVersionComponent],
      },
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("checkDownloadVersion ", () => {
    expect(component.downloadFileVersion("dummy-url"));
  });
});
