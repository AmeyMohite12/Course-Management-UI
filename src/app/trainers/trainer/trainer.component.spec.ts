import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TrainerComponent } from "./trainer.component";
import { TrainerService } from "../../shared/trainer.service";
import { ToastrService } from "ngx-toastr";
import { Trainer } from "src/app/shared/trainer.model";
import { of } from "rxjs";
import { NgForm, FormsModule, ReactiveFormsModule } from "@angular/forms";

const formTrainer = <NgForm>{
  value: { id: 1, name: "string", type: "string", gender: "string", age: 25 },

  resetForm: () => {
    return;
  },
};

const formTrainer_1 = <NgForm>{
  value: {
    id: null,
    name: "string",
    type: "string",
    gender: "string",
    age: 25,
  },
  resetForm: () => {
    return;
  },
};

class MockTrainerService {
  formData: Trainer;

  updateCourse(form: Trainer) {
    return of([]);
  }

  postCourse(form: Trainer) {
    return of([]);
  }

  refreshList() {
    return of([]);
  }
}

class MockToastrService {
  error() {}
  warning() {}
  info() {}
  success() {}
}

fdescribe("TrainerComponent", () => {
  let component: TrainerComponent;
  let fixture: ComponentFixture<TrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerComponent],
      providers: [
        { provide: TrainerService, useClass: MockTrainerService },
        { provide: ToastrService, useClass: MockToastrService },
      ],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("check Onsubmit with updating a new Record  ", () => {
    expect(component.onSubmit(formTrainer));
  });
  it("check Onsubmit with inserting a new Record  ", () => {
    expect(component.onSubmit(formTrainer_1));
  });
});
