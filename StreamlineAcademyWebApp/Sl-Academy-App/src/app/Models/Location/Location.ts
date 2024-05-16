export class LocationRequestModel {
  address?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  countryId?: string = '';
  stateId?: string = '';
  cityId?: string = '';
}
export class LocationResponseModel {
  id?: string;
  academyName?: string;
  address?: string;
  cityName?: string=''
  countryName?: string=''
  stateName?: string=''
  isActive?: boolean;
  latitude?: number;
  longitude?: number;
  postalCode?: string;
  countryId?:string=''
  stateId?:string=''
  cityId?:string=""
}
export class UpdateLocationModel {
    id?:string=''
    address?: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
    countryId?: string = '';
    stateId?: string = '';
    cityId?: string = '';
  }
