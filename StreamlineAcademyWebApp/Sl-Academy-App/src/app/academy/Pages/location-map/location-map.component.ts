import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrl: './location-map.component.css'
})
export class LocationMapComponent {
  lng: number=0
  lat: number=0
  mapUrl:string=''
 
  constructor(private activatedRoute:ActivatedRoute,
    private sanitizer:DomSanitizer ){
  }
  ngOnInit(){
    this.activatedRoute.params.subscribe(paramVal=>{
      this.lng=paramVal['latitude'];
      this.lat=paramVal['longitude']
  })
}
getMapUrl(): SafeResourceUrl {
  const url = `https://www.openstreetmap.org/export/embed.html?${this.lat},${this.lng}&marker=${this.lat},${this.lng}`;
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
}
