import { Component, inject } from '@angular/core';
import { LocationService } from '../../../Services/location.service';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css'
})
export class LocationListComponent {
  locationService=inject(LocationService)
  sharedService=inject(SharedService)
  locationList:any[]=[]
  ngOnInit(){
    this.getAllLocations()
  }
getAllLocations(){
this.locationService.getAllLocations().subscribe(res=>{
  console.log(res)
  this.locationList=res.result
})
}
  deleteLocation(locationId:any){
    this.sharedService
    .fireConfirmSwal('Are You sure you want to delete this Content ')
    .then((result:any) => {
      if (result.isConfirmed) {
        this.locationService.deleteLocation(locationId).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.sharedService.showSuccessToast(response.message);
              this.getAllLocations();
            } else {
              this.sharedService.showErrorToast(response.message);
            }
          },
        });
      }
    });
  }
}
