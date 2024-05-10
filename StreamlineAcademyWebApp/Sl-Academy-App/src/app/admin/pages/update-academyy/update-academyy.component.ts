import { Component } from '@angular/core';
import { AcademyService } from '../../../Services/academy.service';
import {
  AcademyResponse,
  RegisterAcademy,
  UpdateAcademy,
} from '../../../Models/Academy/Academy';
import { SharedService } from '../../../Services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademyTypeResponse } from '../../../Models/Academy/AcademyType';
import { CountryService } from '../../../Services/country.service';

@Component({
  selector: 'app-update-academyy',
  templateUrl: './update-academyy.component.html',
  styleUrl: './update-academyy.component.css',
})
export class UpdateAcademyyComponent {
  constructor(
    private academyService: AcademyService,
    private sharedService: SharedService,
    private countryService:CountryService,
    private route: ActivatedRoute,
    private router:Router
  ) {
    this.route.params.subscribe((params) => {
      this.academyId = params['id'];
      this.academyService.getAcademyById(this.academyId).subscribe(academy=>{
        this.academy=academy.result;
      })
    });
  }
  academyId: string = '';
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  academy:AcademyResponse = new AcademyResponse();
  filteredStates: any[] = [];
  filteredCitiesList: any[] = [];
  academyTypeList:AcademyTypeResponse[]=[];
  selectedCountryId: string = '';
  selectedStateId: string = '';
  updateAcademyModel: UpdateAcademy = new UpdateAcademy();


  ngOnInit(): void {
    this.getAllCountries();
    this.getAllStates();
    this.getAllCities();
    this.getAllAcademyTypes();
  }
  getAllAcademyTypes(){
    this.academyService.getAcademyTypes().subscribe(academyTypes=>{
      this.academyTypeList=academyTypes.result
    })
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
  updateAcademy(){
    this.updateAcademyModel=this.academy;
    this.updateAcademyModel.postalCode?.toString();
    this.academyService.updateAcademy(this.updateAcademyModel).subscribe({
      next:(response)=>{
        if(response.isSuccess){
          this.sharedService.showSuccessToast(response.message);
          this.router.navigate(['/admin/academylist'])
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
