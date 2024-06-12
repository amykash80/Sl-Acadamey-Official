import { Component, inject } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { CountryService } from '../../../Services/country.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../Services/shared.service';
import { AddStudent } from '../../../Models/student/students';
import { Skill } from '../../../Enums/skill';
import { CourseService } from '../../../Services/course.service';
import { CourseResponse } from '../../../Models/Academy/Course';
import { HttpErrorResponse } from '@angular/common/http';

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
  selectedItems=''
  dropdownList:any
  dropdownSettings:any
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
  selectedCourses: any[] = [];
  constructor() {
    
  }
 
  ngOnInit(): void {
    this.getAllCountries();
    this.getAllStates();
    this.getAllCities();
    this.getAllCourses();
  }
  onItemSelect(event:any){

  }
  onSelectAll(event:any){

  }

  toggleSelection(course: any) {
    debugger;
    if (course.selected) {
      this.selectedCourses.push(course);
    } else {
      this.selectedCourses = this.selectedCourses.filter(selectedCourse => selectedCourse.id !== course.id);
    }
  }
  getAllCourses() {
    this.courseService.courseList().subscribe((courses) => {
      this.courses = courses.result;
    });
  }
  getAllCountries() {
    this.countryService.getCountries().subscribe((countries) => {
      this.countries = countries.result;
      console.log(this.countries);
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
      console.log(this.cities);
    });
  }
  filterStates(event: any) {
    this.selectedCountryId = event.target.value;
    this.filteredStates = this.states.filter(
      (state) => state.countryId === this.selectedCountryId
    );
    console.log(this.filteredStates);
  }
  filteredCities(event: any) {
    this.selectedStateId = event.target.value;
    this.filteredCitiesList = this.cities.filter(
      (city) => city.sateId === this.selectedStateId
    );
    console.log(this.filteredCitiesList);
  }
 
  addStudent() {
    this.studentModel.courseId=["ED504AB1-A5AD-4B01-0180-08DC7BC476E6"]
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
        this.loadSpinner=false
        console.log(err);
      },
    });
  }
}
