import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'AttendanceStatus'
})
export class AttendanceStatusPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) return 'Unknown';

    if (value === 1) return 'Present';
    if (value === 2) return 'Absent';
    if (value === 3) return 'Late';
    if (value === 4) return 'Excused';
    return 'Unknown';
  }
}

