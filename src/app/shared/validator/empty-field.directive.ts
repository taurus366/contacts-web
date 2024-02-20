import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[emptyFieldValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmptyFieldDirective,
      multi: true
    }
  ]
})
export class EmptyFieldDirective implements Validator {

  constructor() {
  }
  // while validating i can put message also.
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
       if(!control.value)
         return {invalidField: true};

       return control.value.length > 0 ? null : {invalidField: true};
    }




}
