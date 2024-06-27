import { Component } from '@angular/core';
import { InstructorService } from '../../../Services/instructor.service';
import { StudentService } from '../../../Services/student.service';
import { SharedService } from '../../../Services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../../Services/country.service';
import { AddStudent, StudentResponseModel, UpdateStudentModel } from '../../../Models/student/students';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css'
})
export class UpdateStudentComponent {
  studentId: string = '';
  student: StudentResponseModel = new StudentResponseModel();
  updateStudentModel: UpdateStudentModel = new UpdateStudentModel();
  dropDownVal:number=0
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  filteredStates: any[] = [];
  filteredCitiesList: any[] = [];
  selectedCountryId: string = '';
  selectedStateId: string = '';
  previousPassword: string = '';
  loadSpinner:boolean=false

  constructor(
    private studentService: StudentService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router,
    private countryService:CountryService,
  ) { }
  ngOnInit(): void {
    this.getAllCountries();
    this.getAllStates();
    this.getAllCities();
   
    this.route.params.subscribe(params => {
      this.studentId = params['id'];
      this.studentService.getStudentById(this.studentId).subscribe(response => {
        if (response.isSuccess) {
          this.student = response.result;
             this.student.dateOfBirth = this.student.dateOfBirth ? new Date(this.student.dateOfBirth).toISOString().substring(0, 10) : '';
          console.log(this.student);
        } else {
          this.sharedService.showErrorToast(response.message);
        }
      });
    });
  }
  
  getDrpDownValue(event:any){
  this.dropDownVal=event.target.value
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
  updateStudent(): void {
    this.loadSpinner=true;
    this.updateStudentModel=this.student;
  this.studentService.updateStudent(this.updateStudentModel).subscribe({
    next:(response)=>{
      if(response.isSuccess){
        this.sharedService.showSuccessToast(response.message);
        this.loadSpinner=false;
        this.router.navigate(['/academy/student-list'])
      }
      else{
        this.sharedService.showErrorToast(response.message)
        this.loadSpinner=false;

      }
    },
    error:(err)=>{
      console.log(err)
      this.loadSpinner=false
    }
  })
  }
}
