import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TrendsComponent } from "./trends.component";
import { TrainerService } from "../shared/trainer.service";
import { of } from "rxjs";

class MockTrainerService {
  getTrainerCourseMapping() {
    console.log("Hello in here");
    return of([
      {
        name: "Angular",
        value: 0,
      },
      {
        name: "Node JS",
        value: 0,
      },
      {
        name: "Deep Neural Network",
        value: 1,
      },
      {
        name: "C++",
        value: 1,
      },
      {
        name: "Java",
        value: 2,
      },
      {
        name: "Python",
        value: 2,
      },
      {
        name: "Spring Framework",
        value: 1,
      },
      {
        name: "Spring MVC & Spring Boot",
        value: 1,
      },
      {
        name: "C#",
        value: 1,
      },
      {
        name: "Big Data",
        value: 0,
      },
      {
        name: "Design Patterns",
        value: 0,
      },
      {
        name: "SCRUM",
        value: 0,
      },
    ]);
  }
}

fdescribe("TrendsComponent", () => {
  let component: TrendsComponent;
  let fixture: ComponentFixture<TrendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrendsComponent],
      providers: [
        {
          provide: TrainerService,
          useClass: MockTrainerService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("On Select Event", () => {
    component.onSelect("someval");
  });
});
