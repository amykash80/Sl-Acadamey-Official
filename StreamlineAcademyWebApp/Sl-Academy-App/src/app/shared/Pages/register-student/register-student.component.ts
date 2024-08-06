import { Component, inject } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { CountryService } from '../../../Services/country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../Services/shared.service';
import { AddStudent } from '../../../Models/student/students';
import { Skill } from '../../../Enums/skill';
import { CourseService } from '../../../Services/course.service';
import { CourseResponse } from '../../../Models/Academy/Course';
import { HttpErrorResponse } from '@angular/common/http';
import { __param } from 'tslib';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrl: './register-student.component.css',
})
export class RegisterStudentComponent {
  studentService = inject(StudentService);
  countryService = inject(CountryService);
  courseService = inject(CourseService);
  router = inject(Router);
  sharedService = inject(SharedService);
  activatedRoute = inject(ActivatedRoute);
  selectedItems = '';
  dropdownList: any;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  filteredStates: any[] = [];
  filteredCitiesList: any[] = [];
  selectedCountryId: string = '';
  selectedStateId: string = '';
  studentModel: AddStudent = new AddStudent();
  loadSpinner = false;
  courses: CourseResponse[] = [];
  instructorAcademyCourse: CourseResponse[] = [];
  selectedCourses: any[] = [];
  userId: any;
  academyIdByInstructor: any;
  constructor() {
    this.activatedRoute.params.subscribe((__param) => {
      this.academyIdByInstructor = __param['academyId'];
      console.log(
        'academyId passed from Instructor component is',
        this.academyIdByInstructor
      );
    });
  }

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };

  ngOnInit(): void {
    this.getUserIdFromLocalStorage();
    this.getAllCountries();
    this.getAllStates();
    this.getAllCities();
    this.getAllCourses();
  }
  goBack() {
    window.history.back();
  }
  onItemSelect(item: any) {
    if (!this.studentModel.courseId) {
      this.studentModel.courseId = [];
    }
    this.studentModel.courseId.push(item.id);
  }
  onSelectAll(items: any) {
    if (!this.studentModel.courseId) {
      this.studentModel.courseId = [];
    }
    items.forEach((item: any) => {
      if (!this.studentModel.courseId!.includes(item.id)) {
        this.studentModel.courseId!.push(item.id);
        console.log(this.studentModel.courseId);
      }
    });
  }
  toggleSelection(course: any) {
    debugger;
    if (course.selected) {
      this.selectedCourses.push(course);
    } else {
      this.selectedCourses = this.selectedCourses.filter(
        (selectedCourse) => selectedCourse.id !== course.id
      );
    }
  }
  getAllCourses() {
    const responseObj = JSON.parse(localStorage.getItem('responseObj') || '{}');
    const userRole = responseObj.userRole;
    if (userRole === 2 || userRole === 3) {
      let idToUse: string | undefined;

      if (userRole === 2) {
        idToUse = this.userId;
      } else if (userRole === 3) {
        idToUse = this.academyIdByInstructor;
      }
      if (idToUse) {
        this.courseService.courseList(idToUse).subscribe((courses) => {
          this.courses = courses.result;
          console.log(this.courses);
        });
      } else {
        console.error('ID is not defined');
      }
    } else {
      console.error('Invalid userRole');
    }
  }
  getInstructorAcademyCourses() {
    this.courseService
      .courseList(this.academyIdByInstructor)
      .subscribe((courses) => {
        this.courses = courses.result;
        console.log(this.courses);
      });
  }
  getUserIdFromLocalStorage(): void {
    const responseObjStr = localStorage.getItem('responseObj');

    if (responseObjStr) {
      try {
        const responseObj = JSON.parse(responseObjStr);

        this.userId = responseObj.userId;

        console.log('User ID:', this.userId);
      } catch (error) {
        console.error('Error parsing local storage object:', error);
      }
    } else {
      console.warn('No responseObj found in local storage.');
    }
  }
  getAllCountries() {
    this.countryService.getCountries().subscribe((countries) => {
      this.countries = countries.result;
    });
  }
  getAllStates() {
    this.countryService.getStates().subscribe((res) => {
      this.states = res.result;
    });
  }
  getAllCities() {
    this.countryService.getCities().subscribe((res) => {
      this.cities = res.result;
    });
  }
  filterStates(event: any) {
    this.selectedCountryId = event.target.value;
    this.filteredStates = this.states.filter(
      (state) => state.countryId === this.selectedCountryId
    );
  }
  filteredCities(event: any) {
    this.selectedStateId = event.target.value;
    this.filteredCitiesList = this.cities.filter(
      (city) => city.sateId === this.selectedStateId
    );
  }

  addStudent() {
    console.log(this.studentModel);
    this.loadSpinner = true;
    this.studentService.saveStudent(this.studentModel).subscribe({
      next: (data) => {
        if (data.isSuccess) {
          this.sharedService.showSuccessToast(data.message);
          this.loadSpinner = false;
          this.router.navigate(['/academy/student-list']);
        } else {
          this.sharedService.showErrorToast(data.message);
          this.loadSpinner = false;
        }
      },
      error: (err: HttpErrorResponse) => {
        this.loadSpinner = false;
        console.log(err);
      },
    });
  }
}
