import { Pipe, PipeTransform } from '@angular/core';
import { defaultTo } from 'ramda';

@Pipe({
  name: 'defaultTo',
})
export class DefaultToPipe implements PipeTransform {
  transform(value: any, defaultValue: any) {
    return defaultTo(defaultValue, value);
  }
}
