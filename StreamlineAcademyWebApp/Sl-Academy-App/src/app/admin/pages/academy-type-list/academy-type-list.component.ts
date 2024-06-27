import { Component } from '@angular/core';
import { AcademyTypeResponse } from '../../../Models/Academy/AcademyType';
import { AcademyService } from '../../../Services/academy.service';
import { SharedService } from '../../../Services/shared.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-academy-type-list',
  templateUrl: './academy-type-list.component.html',
  styleUrl: './academy-type-list.component.css',
})
export class AcademyTypeListComponent {
  constructor(private academyService: AcademyService,
              private sharedService:SharedService,
              private router: Router
  ) {}
  academyTypeList: AcademyTypeResponse[] = [];
  loadSpinner=true;
  showTable=false;
  filteredAcademyTypeList: AcademyTypeResponse[] = [];
  displayedAcademyTypeList: AcademyTypeResponse[] = [];
  searchText: string = ''; 
  showNoContent = false;
  showSpinner = true;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pages: number[] = [];

  ngOnInit() {
    this.loadAllAcademyTypes();
  }

  filterAcademyTypes(): void {
    if (!this.searchText.trim()) {
      this.filteredAcademyTypeList = this.academyTypeList.slice();
    } else {
      const searchTerm = this.searchText.toLowerCase();
      this.filteredAcademyTypeList = this.academyTypeList.filter(
        (academyType) =>
          academyType.academyTypeName!.toLowerCase().includes(searchTerm) ||
          (academyType.isActive ? 'active' : 'inactive').toLowerCase().includes(searchTerm)
      );
    }

    this.totalItems = this.filteredAcademyTypeList.length;
    this.currentPage = 1;
    this.updatePagination();
  }
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.displayedAcademyTypeList = this.filteredAcademyTypeList.slice(startIndex, endIndex);
    this.pages = Array(Math.ceil(this.totalItems / this.itemsPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.pages.length) {
      return;
    }
    this.currentPage = page;
    this.updatePagination();
  }
  
  loadAllAcademyTypes() {
    this.academyService.getAcademyTypes().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.showSpinner = false;
          this.showTable = true;
          this.academyTypeList = response.result;
          this.filteredAcademyTypeList = this.academyTypeList;
          this.totalItems = this.filteredAcademyTypeList.length;
          this.updatePagination();
        } else {
          this.sharedService.NoDataSwal(response.message);
          setTimeout(() => {
            this.router.navigate(['/admin/dashboard']);
          }, 2000);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
 

  deleteAcademyType(Id: any) {
    this.sharedService
      .fireConfirmSwal('Are You sure you want to delete this AcademyType ')
      .then((result: any) => {
        if (result.isConfirmed) {
          this.academyService.deleteAcademyType(Id).subscribe({
            next: (response) => {
              if (response.isSuccess) {
                this.sharedService.showSuccessToast(response.message);
                this.loadAllAcademyTypes();
              } else {
                this.sharedService.showErrorToast(response.message);
              }
            },
          });
        }
      });
  }
}

