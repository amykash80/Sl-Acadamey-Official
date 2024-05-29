import { Component } from '@angular/core';
import { AcademyService } from '../../../Services/academy.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { AcademyResponse } from '../../../Models/Academy/Academy';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-academy-list',
  templateUrl: './academy-list.component.html',
  styleUrl: './academy-list.component.css',
})
export class AcademyListComponent {
  constructor(
    private academyService: AcademyService,
    private sharedService: SharedService
  ) {
    this.loadAllAcademies();
  }
  academyList: AcademyResponse[] = [];
  filteredAcademyList: AcademyResponse[] = [];
  searchText: string = '';

  loadAllAcademies() {
    this.academyService.academyList().subscribe({
      next: (response) => {
        this.academyList = response.result;
     this.filteredAcademyList=this.academyList;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == HttpStatusCode.Unauthorized) {
          console.log(err.message);
        }
      },
    });
  }
  filterAcademies(event:any): void {
    const filterValue = event.target.value.toLowerCase();
    this.filteredAcademyList = this.academyList.filter(academy => 
      academy.name?.toLowerCase().startsWith(filterValue) 
      || academy.phoneNumber?.toLowerCase().startsWith(filterValue)
      || academy.email?.toLowerCase().startsWith(filterValue)
    );
    console.log(this.filteredAcademyList);
  }

  deleteAcademy(academyId: any) {
    this.sharedService
      .fireConfirmSwal('Are You sure you want to delete this Academy ')
      .then((result: any) => {
        if (result.isConfirmed) {
          this.academyService.deleteAcademy(academyId).subscribe({
            next: (response) => {
              if (response.isSuccess) {
                this.sharedService.showSuccessToast(response.message);
                this.loadAllAcademies();
              } else {
                this.sharedService.showErrorToast(response.message);
              }
            },
          });
        }
      });
  }
}
