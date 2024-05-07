import { Component } from '@angular/core';
import { AcademyService } from '../../../Services/academy.service';
import { UpdateAcademy } from '../../../Models/Academy/Academy';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-update-academyy',
  templateUrl: './update-academyy.component.html',
  styleUrl: './update-academyy.component.css'
})
export class UpdateAcademyyComponent {
  constructor(private academyService: AcademyService,
    private sharedService: SharedService
  ) { }
  academyModel: UpdateAcademy = new UpdateAcademy()
  updateAcademy() {
    this.academyModel.id = "F6DDC167-0771-4B24-8DE2-08DC635C0CFE"
    this.academyModel.name = "Rajeevv Academy"
    this.academyModel.academyName = "Rajeev Academy"
    this.academyModel.address = "aaaa"
    this.academyModel.postalCode = "653453"
    this.academyModel.phoneNumber = "8984148806"
    this.academyModel.email = "s@gmail.com"
    this.academyModel.academyTypeId = "8F2F2F5E-550F-4877-A32A-08DC6033DEF4"
    this.academyModel.countryId = "72E797A0-9A8F-416E-AB5D-8002FF650ACA"
    this.academyModel.stateId = "3AAACB5A-1AD4-4D02-B5FF-5591A0C61279"
    this.academyModel.cityId = "8EEEA3C4-2BCF-45A1-B009-547B0D9F58F1"
    this.academyModel.isActive = true
    this.academyService.updateAcademy(this.academyModel).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.sharedService.showSuccessToast(response.message)
        }
        else {
          this.sharedService.showErrorToast(response.message)
        }

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
