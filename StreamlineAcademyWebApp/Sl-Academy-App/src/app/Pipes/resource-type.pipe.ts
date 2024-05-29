import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resourceType'
})
export class ResourceTypePipe implements PipeTransform {

  transform(value: any) {
    if (!value) return 'Unknown';

    if (value === 1) return 'Youtube Link';
    if (value === 2) return 'PDF';
    if (value === 3) return 'Document';
    if (value === 4) return 'Video';
    if (value === 5) return 'Image';
    if (value === 6) return 'Other';

    return 'Unknown';
  }

}
