import { Component } from '@angular/core';
import { BatchResponseModel } from '../../../Models/Batch/Batch';
import { ActivatedRoute } from '@angular/router';
import { BatchService } from '../../../Services/batch.service';
import { SharedService } from '../../../Services/shared.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { InstructorService } from '../../../Services/instructor.service';
import { StudentResponseModel } from '../../../Models/student/students';

@Component({
  selector: 'app-check-my-batch',
  templateUrl: './check-my-batch.component.html',
  styleUrl: './check-my-batch.component.css'
})
export class CheckMyBatchComponent {
  courseId!: string
  batchList:BatchResponseModel[] = [];
  filteredList:BatchResponseModel[] = [];
  studentList:StudentResponseModel[]=[];
  showTable=false;
  showTable2=false
  loadSpinner=true;
  
  
constructor(private activatedRoute: ActivatedRoute,
           private batchService: BatchService,
          private sharedService:SharedService,
          private instructorService:InstructorService){
  this.activatedRoute.params.subscribe((paramVal) => {
    this.courseId = paramVal['courseId'];
    
  });
}
ngOnInit(){
  this.getAllBatches();
}

getAllBatches() {
  this.instructorService.checkMyBatches().subscribe({
    next: (response) => {
      this.loadSpinner=false;
      this.showTable=true
      this.batchList = response.result;
      console.log(this.batchList);
      
      this.filteredList = this.batchList;
      console.log(this.batchList);
      
    },
    error: (err: HttpErrorResponse) => {
      console.log(err);
    }
  });
}
getAllStudentsByBatchId(batchId:any){
  this.batchService.getAllStudentsByBatchId(batchId).subscribe({
    next: (data) => {
      if (data.isSuccess) {
        this.loadSpinner=false;
        this.showTable2=true
        this.showTable=false
        this.studentList = data.result;
        console.log(this.studentList);
      } else {
        this.loadSpinner=false;

      }
    },
    error: (err: HttpErrorResponse) => {
      if (err.status == HttpStatusCode.Unauthorized) {
        console.log(err.message);
      }
    },
  })
}

// filterBatches(): void {
//   if (!this.searchText.trim()) {
//     this.filteredBatchList = this.batchList.slice();
//   } else {
//     const searchTerm = this.searchText.toLowerCase();
//     this.filteredBatchList = this.batchList.filter(
//       (batch) =>
//         batch.batchName!.toLowerCase().startsWith(searchTerm) ||
//         batch.courseName!.toLowerCase().startsWith(searchTerm) ||
//         batch.instructorName!.toLowerCase().startsWith(searchTerm) ||
//         batch.batchSize!.toString().toLowerCase().startsWith(searchTerm)
//     );
//   }

//   // Reset pagination to the first page after filtering
//   this.totalItems = this.filteredBatchList.length;
//   this.currentPage = 1;
//   this.updatePagination();
// }


// updatePagination(): void {
//   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//   const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
//   this.displayedBatchList = this.filteredBatchList.slice(startIndex, endIndex);
//   this.pages = Array(Math.ceil(this.totalItems / this.itemsPerPage))
//     .fill(0)
//     .map((x, i) => i + 1);
// }

// goToPage(page: number): void {
//   if (page < 1 || page > this.pages.length) {
//     return;
//   }
//   this.currentPage = page;
//   this.updatePagination();
// }
// deleteBatch(batchId:any){
//   this.sharedService
//       .fireConfirmSwal('Are You sure you want to delete this Batch ')
//       .then((result:any) => {
//         if (result.isConfirmed) {
//           this.batchService.deleteBatch(batchId).subscribe({
//             next: (response) => {
//               if (response.isSuccess) {
//                 this.sharedService.showSuccessToast(response.message);
//                 this.getAllBatchesByCourseId();
//               } else {
//                 this.sharedService.showErrorToast(response.message);
//               }
//             },
//           });
//         }
//       });
// }
}


