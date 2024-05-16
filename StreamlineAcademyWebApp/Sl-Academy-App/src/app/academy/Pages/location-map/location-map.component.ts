import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrl: './location-map.component.css'
})
export class LocationMapComponent {
  latitude: number=0
  longitude: number=0
  constructor(private activatedRoute:ActivatedRoute){}
  ngOnInit(){
    this.activatedRoute.params.subscribe(paramVal=>{
      this.latitude=paramVal['latitude'];
      this.longitude=paramVal['longitude']
  })
}
}
