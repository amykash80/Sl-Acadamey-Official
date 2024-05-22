import { Component } from '@angular/core';
import { InstructorResponseModel, InstructorUpdateModel } from '../../../Models/Instructor/Instructor';
import { InstructorService } from '../../../Services/instructor.service';
import { SharedService } from '../../../Services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../../Services/country.service';

@Component({
  selector: 'app-update-instructor',
  templateUrl: './update-instructor.component.html',
  styleUrl: './update-instructor.component.css'
})
export class UpdateInstructorComponent {
  instructorId: string = '';
  instructor: InstructorResponseModel = new InstructorResponseModel();
  updateInstructorModel: InstructorUpdateModel = new InstructorUpdateModel();
  dropDownVal:number=0
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  filteredStates: any[] = [];
  filteredCitiesList: any[] = [];
  selectedCountryId: string = '';
  selectedStateId: string = '';
  previousPassword: string = '';

  constructor(
    private instructorService: InstructorService,
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
      this.instructorId = params['id'];
      this.instructorService.getInstructorById(this.instructorId).subscribe(response => {
        if (response.isSuccess) {
          this.instructor = response.result;
             this.instructor.dateOfBirth = this.instructor.dateOfBirth ? new Date(this.instructor.dateOfBirth).toISOString().substring(0, 10) : '';
          console.log(this.instructor);
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
  updateInstructor(): void {
    this.updateInstructorModel=this.instructor;
  this.instructorService.updateInstructor(this.updateInstructorModel).subscribe({
    next:(response)=>{
      if(response.isSuccess){
        this.sharedService.showSuccessToast(response.message);
        this.router.navigate(['/academy/instructor-list'])
      }
      else{
        this.sharedService.showErrorToast(response.message)
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
  }
}

