import { Component, inject } from '@angular/core';
import { CountryService } from '../../../Services/country.service';
import { SharedService } from '../../../Services/shared.service';
import { Router } from '@angular/router';
import { InstructorRequestModel, InstructorResponseModel } from '../../../Models/Instructor/Instructor';
import { InstructorService } from '../../../Services/instructor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Skill } from '../../../Enums/skill';

@Component({
  selector: 'app-create-instructor',
  templateUrl: './create-instructor.component.html',
  styleUrl: './create-instructor.component.css'
})
export class CreateInstructorComponent {
  instructorService=inject(InstructorService)
  countryService = inject(CountryService);
  dropDownVal:number=0
  router=inject(Router)
  sharedService=inject(SharedService)
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  filteredStates: any[] = [];
  filteredCitiesList: any[] = [];
  selectedCountryId: string = '';
  selectedStateId: string = '';
  instructorModel: InstructorRequestModel = new InstructorRequestModel();
  instructors:InstructorResponseModel[]=[];
//   skill: Skill[] = Object.values(Skill)
// .filter(value => typeof value === 'number') as Skill[];

// getSkillName(type: Skill): string {
//   return Skill[type];
// }

  constructor(
  ) {}
  ngOnInit(): void {
    this.getAllCountries();
    this.getAllStates();
    this.getAllCities();
   
  }
  getDrpDownValue(event:any){
  this.dropDownVal=event.target.value
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
  addInstructor() {
    console.log("btn clicked");
    
    this.instructorModel.postalCode=this.instructorModel.postalCode?.toString();
    this.instructorModel.skill=this.dropDownVal
    this.instructorService.addinstructor(this.instructorModel).subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.sharedService.showSuccessToast(response.message)
          this.router.navigate(['/academy/instuctor-list'])
        }
        else{
          this.sharedService.showErrorToast(response.message)
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
