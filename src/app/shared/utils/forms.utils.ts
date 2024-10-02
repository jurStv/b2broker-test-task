import { ValidatorFn, Validators } from '@angular/forms';
import { compose } from 'ramda';

export const requiredWithKey = (translationKey: string): ValidatorFn => compose(
  (errors) => errors && errors['required'] ? ({ [translationKey]: true }) : null,
  Validators.required
);

export const patternWithKey = (pattern: RegExp | string, translationKey: string): ValidatorFn => compose(
  (errors) => errors && errors['pattern'] ? ({ [translationKey]: true }) : null,
  Validators.pattern(pattern)
);
