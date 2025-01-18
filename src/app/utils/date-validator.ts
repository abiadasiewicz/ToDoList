import {AbstractControl} from "@angular/forms";
import moment from 'moment';

export const dateValidator = (control: AbstractControl) => {
    if (control && control.value && !moment(control.value, 'DD.MM.YYYY', true).isValid()) {
      return { 'dateVaidator': true };
    }
    return null;
  }
