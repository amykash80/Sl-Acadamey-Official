import { Pipe, PipeTransform } from '@angular/core';
import { EnquiryResponse } from '../Models/Common/enquiry';

@Pipe({
  name: 'registrationStatus'
})
export class RegistrationStatusPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return 'Unknown';
    
    if (value === 1) return 'Pending';
    if (value === 2) return 'Approved';
    if (value === 3) return 'Rejected';

    return 'Unknown';
  }

}
