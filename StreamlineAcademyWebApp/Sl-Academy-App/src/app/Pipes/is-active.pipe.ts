import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isActive'
})
export class IsActivePipe implements PipeTransform {

  transform(value: any): string {
    if (value === true) {
      return 'Active';
    } else if (value === false) {
      return 'inActive';
    } else {
      return 'Unknown';
    }
  }
}
