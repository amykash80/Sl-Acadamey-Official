import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentResponseModel } from '../../../Models/student/students';
import { InstructorService } from '../../../Services/instructor.service';
import { SharedService } from '../../../Services/shared.service';
import { NotificationModel } from '../../../Models/Notification/Notification';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  notificationRequest: NotificationModel = {
    
    body: '',
    subject: '',
    scheduleId: ''
    
  };
  scheduleId!: string;
  scheduleName: string = '';
  studentList: StudentResponseModel[] = [];
  filteredStudentList: StudentResponseModel[] = [];
  searchText: string = '';
  showNoContent = false;
  showTable = false;
  showSpinner = true;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pages: number[] = [];
  displayedStudentList: StudentResponseModel[] = [];
  currentDate!: string;
  sendingNotification: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private instructorService: InstructorService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((paramVal) => {
      this.scheduleId = paramVal['scheduleId'];
    });
  }

  ngOnInit() {
    this.loadStudents();
    this.updateCurrentDate()
   
  }

  async sendNotification() {
    const { value: texts } = await Swal.fire({
      html: `
        <label for="subject" class="swal2-label">Subject</label>
        <input id="subject" class="swal2-input" placeholder="your subject..." aria-label="Subject">
        <label for="message" class="swal2-label">Message</label>
        <textarea id="message" class="swal2-textarea" placeholder="Type your body here..." aria-label="Type your message here"></textarea>
      `,
      inputAttributes: {
        'aria-label': 'Type your message here',
      },
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Send',
      showCancelButton: true,  
      preConfirm: () => {
        const subject = (document.getElementById('subject') as HTMLInputElement).value;
        const message = (document.getElementById('message') as HTMLTextAreaElement).value;
        
        if (!subject || !message) {
          Swal.showValidationMessage('Both subject and message are required');
          return null;
        }
  
        return { subject, message };
      },
    });
  
    if (texts) {
      this.notificationRequest.subject = texts.subject;
      this.notificationRequest.body = texts.message;
      this.notificationRequest.scheduleId = this.scheduleId;
      this.sendingNotification = true;  // Show spinner
      console.log('Notification Request:', this.notificationRequest);
      this.instructorService.sendNotification(this.notificationRequest).subscribe(
        (success) => {
          this.sendingNotification = false;  // Hide spinner
          if (success) {
            this.sharedService.showSuccessToast("Notification sent successfully")
          } else {
            this.sharedService.showErrorToast("Failed to send notification.")
          }
        },
        (error) => {
          this.sendingNotification = false;  // Hide spinner
          console.error('Error occurred:', error);
          Swal.fire('Error occurred while sending notification.', '', 'error');
        }
      );
    }
  }

  

  loadStudents() {
    this.instructorService.checkMyScheduleStudents(this.scheduleId).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.showSpinner = false;
          this.showTable = true;
          this.studentList = response.result;
          this.filteredStudentList = this.studentList;
          this.totalItems = this.filteredStudentList.length;
          this.currentPage = 1;
          this.updatePagination();
          if (response.result.length > 0) {
            this.showTable = true;
            this.showNoContent = false;
          }
        } else {
          this.sharedService.NoDataSwal(response.message);
          setTimeout(()=>{
            this.router.navigate(['/academy/course-list'])

          },2000)
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  updateCurrentDate() {
    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    this.currentDate = `${month}/${day}/${year}`;
  }

  filterStudents(): void {
    if (!this.searchText.trim()) {
      this.filteredStudentList = this.studentList.slice();
    } else {
      const searchTerm = this.searchText.toLowerCase();
      this.filteredStudentList = this.studentList.filter(
        (student) =>
          student.name!.toLowerCase().startsWith(searchTerm) ||
           student.address!.toLowerCase().startsWith(searchTerm) ||
           student.phoneNumber!.toLowerCase().startsWith(searchTerm) ||
           student.email!.toLowerCase().startsWith(searchTerm) 
          
      );
    }

    
    this.totalItems = this.filteredStudentList.length;
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.displayedStudentList = this.filteredStudentList.slice(startIndex, endIndex);
    this.pages = Array(Math.ceil(this.totalItems / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.pages.length) {
      return;
    }
    this.currentPage = page;
    this.updatePagination();
  }

  // deleteStudent(studentId: any) {
  //   this.sharedService.fireConfirmSwal('Are You sure you want to delete this Student ').then((result: any) => {
  //     if (result.isConfirmed) {
  //       this.instructorService.deleteStudent(studentId).subscribe({
  //         next: (response) => {
  //           if (response.isSuccess) {
  //             this.sharedService.showSuccessToast(response.message);
  //             this.getStudentsByScheduleId();
  //           } else {
  //             this.sharedService.showErrorToast(response.message);
  //           }
  //         },
  //       });
  //     }
  //   });
  // }
}

