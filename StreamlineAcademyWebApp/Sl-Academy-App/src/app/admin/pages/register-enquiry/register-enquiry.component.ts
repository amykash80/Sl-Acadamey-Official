import { Component, inject } from '@angular/core';
import { Enquiry, EnquiryResponse } from '../../../Models/Common/enquiry';
import { EnquiryService } from '../../../Services/enquiry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademyService } from '../../../Services/academy.service';
import { CountryService } from '../../../Services/country.service';
import { SharedService } from '../../../Services/shared.service';
import { AcademyTypeResponse } from '../../../Models/Academy/AcademyType';
import { RegisterAcademy } from '../../../Models/Academy/Academy';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-enquiry',
  templateUrl: './register-enquiry.component.html',
  styleUrl: './register-enquiry.component.css'
})
export class RegisterEnquiryComponent {
  enquiryId:string=''
  pending:boolean = false
  academyService = inject(AcademyService);
  countryService = inject(CountryService);
  enquiryService = inject(EnquiryService);
  router=inject(Router)
  route=inject(ActivatedRoute)
  sharedService=inject(SharedService)
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  filteredStates: any[] = [];
  filteredCitiesList: any[] = [];
  academyTypeList:AcademyTypeResponse[]=[];
  selectedCountryId: string = '';
  selectedStateId: string = '';
  enquiry:EnquiryResponse=new EnquiryResponse()
  academyRegistrationModel: RegisterAcademy = new RegisterAcademy();
  loadSpinner: boolean = false;
  constructor() {
this.route.params.subscribe(params => {
  this.enquiryId=params['id']
  this.enquiryService.getEnquiryById(this.enquiryId).subscribe(res=>{
    this.enquiry=res.result;
    console.log(this.enquiry)
  })
})
  }

  ngOnInit(): void {
    this.getAllCountries();
    this.getAllStates();
    this.getAllCities();
    this.getAllAcademyTypes();
  }
  getAllAcademyTypes(){
    this.academyService.getAcademyTypes().subscribe(academyTypes=>{
      this.academyTypeList=academyTypes.result
      console.log(this.academyTypeList)
    })
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

  registerAcademy() {
   this.academyRegistrationModel.name=this.enquiry.name;
   this.academyRegistrationModel.email=this.enquiry.email;
   this.academyRegistrationModel.phoneNumber=this.enquiry.phoneNumber;
    this.academyRegistrationModel.postalCode=this.academyRegistrationModel.postalCode?.toString();
    this.academyService.createAcademy(this.academyRegistrationModel).subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.sharedService.showSuccessToast(response.message)
          this.loadSpinner = false;
          this.router.navigate(['/admin/academylist'])
        }
        else{
          this.sharedService.showErrorToast(response.message)
          this.loadSpinner = false;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.loadSpinner = false;
      },
    });
  }
}
