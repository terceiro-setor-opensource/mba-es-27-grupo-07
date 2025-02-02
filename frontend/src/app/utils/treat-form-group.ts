import { FormGroup } from '@angular/forms';

export const validateFormGroup = (form: FormGroup) => {
  if (!form.valid) {
    form.markAllAsTouched();
  }

  return form.valid;
};
