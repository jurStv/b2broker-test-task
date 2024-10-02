import { Pipe, PipeTransform } from '@angular/core';
import { keys } from 'ramda';

@Pipe({
  name: 'keys',
})
export class KeysPipe implements PipeTransform {
  transform<T extends object>(value: T) {
    return keys(value) as string[];
  }
}
