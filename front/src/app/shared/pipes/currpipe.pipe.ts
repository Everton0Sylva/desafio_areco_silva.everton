import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currPipe',
})
export class CurrPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined) return '';
    let changedValue = value.toString().replace('.', ',');
    return `$ ${changedValue}`;
  }
}
