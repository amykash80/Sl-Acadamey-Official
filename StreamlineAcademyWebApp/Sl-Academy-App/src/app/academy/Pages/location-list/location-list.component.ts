import { Component, inject } from '@angular/core';
import { LocationService } from '../../../Services/location.service';
import { SharedService } from '../../../Services/shared.service';
import { LocationResponseModel } from '../../../Models/Location/Location';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css'
})
export class LocationListComponent {
  locationService=inject(LocationService)
  sharedService=inject(SharedService)
  locationList:any[]=[]
  searchText=''
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pages: number[] = [];
  displayedBatchList: LocationResponseModel[] = [];
  filteredLocationList: LocationResponseModel[] = [];
  ngOnInit(){
    this.getAllLocations()
  }
getAllLocations(){
this.locationService.getAllLocations().subscribe(res=>{
  console.log(res)
  this.locationList=res.result
  this.filteredLocationList = this.locationList;
  this.totalItems = this.filteredLocationList.length;
      this.currentPage = 1; 
      this.updatePagination();
})
}
filterInstructors(): void {
  if (!this.searchText.trim()) {
    this.filteredLocationList = this.locationList.slice();
  } else {
    const searchTerm = this.searchText.toLowerCase();
    this.filteredLocationList = this.locationList.filter(
      (location) =>
        location.address!.toLowerCase().startsWith(searchTerm) ||
      location.countryName!.toLowerCase().startsWith(searchTerm) ||
      location.cityName!.toLowerCase().startsWith(searchTerm)||
      location.stateName!.toLowerCase().startsWith(searchTerm) 
    );
  }

  // Reset pagination to the first page after filtering
  this.totalItems = this.filteredLocationList.length;
  this.currentPage = 1;
  this.updatePagination();
}


updatePagination(): void {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
  this.displayedBatchList = this.filteredLocationList.slice(startIndex, endIndex);
  this.pages = Array(Math.ceil(this.totalItems / this.itemsPerPage))
    .fill(0)
    .map((x, i) => i + 1);
}

goToPage(page: number): void {
  if (page < 1 || page > this.pages.length) {
    return;
  }
  this.currentPage = page;
  this.updatePagination();
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
