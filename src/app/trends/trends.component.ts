import { Component, OnInit } from "@angular/core";
import { TrainerService } from "../shared/trainer.service";
@Component({
  selector: "app-trends",
  templateUrl: "./trends.component.html",
  styleUrls: ["./trends.component.css"],
})
export class TrendsComponent implements OnInit {
  single: any[];
  multi: any[];

  view: any[] = [800, 500];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "Courses";
  showYAxisLabel = true;
  yAxisLabel = "Trainers";

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  };
  constructor(private trainerservice: TrainerService) {}

  onSelect(event) {
    console.log(event, " I am in constructor ");
  }

  ngOnInit(): void {
    this.trainerservice.getTrainerCourseMapping().subscribe((res) => {
      this.single = res as any[];
    });
  }
}
