import { Component } from '@angular/core';
import { AcademyService } from '../../../Services/academy.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { AcademyResponse } from '../../../Models/Academy/Academy';
import { SharedService } from '../../../Services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-academy-list',
  templateUrl: './academy-list.component.html',
  styleUrl: './academy-list.component.css',
})
export class AcademyListComponent {
  constructor(
    private academyService: AcademyService,
    private sharedService: SharedService,
    private router:Router
  ) {
    this.loadAllAcademies();
  }
  academyList: AcademyResponse[] = [];
  filteredAcademyList: AcademyResponse[] = [];
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pages: number[] = [];
  displayedAcademyList: AcademyResponse[] = [];
  showSpinner=true;
  showTable=false
  showNoContent = false;
  loadAllAcademies() {
    this.academyService.academyList().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.showSpinner = false;
          this.showTable = true;
          this.academyList = response.result;
          this.filteredAcademyList = this.academyList;
          this.totalItems = this.filteredAcademyList.length;
          this.currentPage = 1;
          this.updatePagination();
          if (response.result.length > 0) {
            this.showTable = true;
            this.showNoContent = false;
          } else {
            this.showNoContent = true;
          }
        } else {
          this.sharedService.NoDataSwal(response.message);
          setTimeout(() => {
            this.router.navigate(['/admin/dashboard']);
          }, 2000);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
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
    this.totalItems = this.filteredAcademyList.length;
    this.currentPage = 1;
    this.updatePagination();
  }
  
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.displayedAcademyList = this.filteredAcademyList.slice(startIndex, endIndex);
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
