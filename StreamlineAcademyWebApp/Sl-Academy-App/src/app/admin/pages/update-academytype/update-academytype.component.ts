import { Component } from '@angular/core';
import { AcademyService } from '../../../Services/academy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademyResponse, UpdateAcademy } from '../../../Models/Academy/Academy';
import { AcademyTypeResponse, UpdateAcademyType } from '../../../Models/Academy/AcademyType';
import { CountryService } from '../../../Services/country.service';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-update-academytype',
  templateUrl: './update-academytype.component.html',
  styleUrl: './update-academytype.component.css'
})
export class UpdateAcademytypeComponent {

  constructor(
    private academyService: AcademyService,
    private sharedService: SharedService,
    private countryService:CountryService,
    private route: ActivatedRoute,
    private router:Router
  ) {
    this.route.params.subscribe((params) => {
      this.academyTypeId = params['id'];
      this.academyService.getAcademyTypeById(this.academyTypeId).subscribe(academy=>{
        this.academyType=academy.result;
        console.log(this.academyType);
        
      })
    });
  }
  academyTypeId: string = '';
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  academyType:AcademyTypeResponse = new AcademyTypeResponse();
  filteredStates: any[] = [];
  filteredCitiesList: any[] = [];
  academyTypeList:AcademyTypeResponse[]=[];
  selectedCountryId: string = '';
  selectedStateId: string = '';
  updateAcademyTypeModel: UpdateAcademyType = new UpdateAcademyType();
  loadSpinner: boolean = false;


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.academyTypeId = params['id'];
      this.getAcademyTypeById();
    });
    this.getAllAcademyTypes();
  }
  getAcademyTypeById() {
    this.academyService.getAcademyTypeById(this.academyTypeId).subscribe(academy => {
      this.academyType = academy.result;
    });
  }

  getAllAcademyTypes() {
    this.academyService.getAcademyTypes().subscribe(academyTypes => {
      this.academyTypeList = academyTypes.result;
    });
  }
 
  
  updateAcademyType() {
    this.loadSpinner = true;
    this.updateAcademyTypeModel = this.academyType;
    this.academyService.updateAcademyType(this.updateAcademyTypeModel).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.sharedService.showSuccessToast(response.message);
          this.loadSpinner = false;
          this.router.navigate(['/admin/academy-type-list']);
        } else {
          this.sharedService.showErrorToast(response.message);
          this.loadSpinner = false;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}



  

