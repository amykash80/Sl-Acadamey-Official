import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BatchService } from '../../../Services/batch.service';
import { BatchResponseModel } from '../../../Models/Batch/Batch';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrl: './batch-list.component.css'
})
export class BatchListComponent {
  courseId!: string
  batchList:BatchResponseModel[]=[]
  filteredBatchList: BatchResponseModel[] = [];
  searchText: string = '';
  showNoContent=false;
  showTable=false;
  showSpinner=true
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pages: number[] = [];
  displayedBatchList: BatchResponseModel[] = [];
constructor(private activatedRoute: ActivatedRoute,
           private batchService: BatchService,
          private sharedService:SharedService){
  this.activatedRoute.params.subscribe((paramVal) => {
    this.courseId = paramVal['courseId'];
    
  });
}
ngOnInit(){
  this.getAllBatchesByCourseId();
}

getAllBatchesByCourseId(){
  this.batchService.getAllBatchesByCourseId(this.courseId).subscribe({
    next: (response) => {
      this.showSpinner=false;
      this.showTable=true
      this.batchList = response.result;
      this.filteredBatchList = this.batchList;
      this.totalItems = this.filteredBatchList.length;
      this.currentPage = 1; 
      this.updatePagination();
      if(response.result.length>0){
        this.showTable=true;
        this.showNoContent=false

      }
     
    },
    error: (err: HttpErrorResponse) => {
      console.log(err);
    }
  });
}

filterBatches(): void {
  if (!this.searchText.trim()) {
    this.filteredBatchList = this.batchList.slice();
  } else {
    const searchTerm = this.searchText.toLowerCase();
    this.filteredBatchList = this.batchList.filter(
      (batch) =>
        batch.batchName!.toLowerCase().startsWith(searchTerm) ||
        batch.courseName!.toLowerCase().startsWith(searchTerm) ||
        batch.instructorName!.toLowerCase().startsWith(searchTerm) ||
        batch.batchSize!.toString().toLowerCase().startsWith(searchTerm)
    );
  }

  // Reset pagination to the first page after filtering
  this.totalItems = this.filteredBatchList.length;
  this.currentPage = 1;
  this.updatePagination();
}


updatePagination(): void {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
  this.displayedBatchList = this.filteredBatchList.slice(startIndex, endIndex);
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
deleteBatch(batchId:any){
  this.sharedService
      .fireConfirmSwal('Are You sure you want to delete this Batch ')
      .then((result:any) => {
        if (result.isConfirmed) {
          this.batchService.deleteBatch(batchId).subscribe({
            next: (response) => {
              if (response.isSuccess) {
                this.sharedService.showSuccessToast(response.message);
                this.getAllBatchesByCourseId();
              } else {
                this.sharedService.showErrorToast(response.message);
              }
            },
          });
        }
      });
}
}
