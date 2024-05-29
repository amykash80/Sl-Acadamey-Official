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
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalItems: number = 0;
  pages: number[] = [];

  loadAllAcademies() {
    this.academyService.academyList().subscribe({
      next: (response) => {
        this.academyList = response.result;
     this.filteredAcademyList=this.academyList;
     this.totalItems = this.filteredAcademyList.length;
      this.currentPage = 1; 
      this.updatePagination();
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
      academy.academyName?.toLowerCase().startsWith(filterValue)
    );
    this.totalItems = this.filteredAcademyList.length;
    this.currentPage = 1;
    this.updatePagination();
  }
  
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.filteredAcademyList = this.filteredAcademyList.slice(startIndex, endIndex);
     this.pages = Array.from({ length: Math.ceil(this.totalItems / this.itemsPerPage) }, (_, i) => i + 1);
  }
  
  goToPage(page: number): void {
    if (page < 1 || page > this.pages.length) {
      return;
    }
    this.currentPage = page;
    this.updatePagination();
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
