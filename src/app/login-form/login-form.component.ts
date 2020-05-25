import { Component, OnInit } from '@angular/core';
import { customValidator } from '../validators/customvalidator';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Form,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        'ExampleMail@gmail.com',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: [
        'ExamplePassword',
        [
          Validators.required,
          customValidator(/password/),
          Validators.pattern(
            '(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}'
          ),
        ],
      ],
    });
  }

  loadApi() {
    this.loginForm.patchValue({
      email: 'example.mail@domain.com',
      password: 'Examplepass@123',
    });
  }
}
