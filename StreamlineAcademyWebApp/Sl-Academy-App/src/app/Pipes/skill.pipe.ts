import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skill',
})
export class SkillPipe implements PipeTransform {
  transform(value: any) {
    if (!value) return 'Unknown';

    if (value === 1) return 'Programming';
    if (value === 2) return 'Design';
    if (value === 3) return 'Marketing';
    if (value === 4) return 'Writing';
    if (value === 5) return 'Communication';
    if (value === 6) return 'Other';

    return 'Unknown';
  }
}
