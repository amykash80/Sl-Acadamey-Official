import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enquireAs'
})
export class EnquireAsPipe implements PipeTransform {

  transform(value: any): string {
    if (!value) return 'Unknown';
    
    if (value === 1) return 'Academy';
    if (value === 2) return 'Instructor';
    if (value === 3) return 'Student';

    return 'Unknown';
  }
  }

