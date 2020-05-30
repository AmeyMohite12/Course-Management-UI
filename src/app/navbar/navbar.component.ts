import { Component, OnInit } from "@angular/core";
import { GoogleLoginService } from "../shared/google-login.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(public googlelogin: GoogleLoginService) {}
  ngOnInit(): void {}
}
