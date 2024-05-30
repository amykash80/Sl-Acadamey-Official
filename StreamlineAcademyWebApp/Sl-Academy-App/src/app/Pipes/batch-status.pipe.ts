import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'batchStatus'
})
export class BatchStatusPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return 'Unknown';
    
    if (value === 1) return 'Assigned';
    if (value === 2) return 'NotAssigned';

    return 'Unknown';
  }
}
