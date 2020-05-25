import { AbstractControl, ValidatorFn } from "@angular/forms";

export function customValidator(forbiddenName: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = forbiddenName.test(control.value);
    return forbidden ? { customValidator: { value: control.value } } : null;
  };
}
