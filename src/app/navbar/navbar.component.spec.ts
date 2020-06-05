import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NavbarComponent } from "./navbar.component";

import { GoogleLoginService } from "../shared/google-login.service";

class MockGoogleLoginService {
  logout() {
    console.log("i was claled");
  }
}

fdescribe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: GoogleLoginService, useClass: MockGoogleLoginService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call Login with mock service", () => {
    component.logout();
  });
});
