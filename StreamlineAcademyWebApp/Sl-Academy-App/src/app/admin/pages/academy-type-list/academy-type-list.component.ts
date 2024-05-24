import { Component } from '@angular/core';
import { AcademyTypeResponse } from '../../../Models/Academy/AcademyType';
import { AcademyService } from '../../../Services/academy.service';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-academy-type-list',
  templateUrl: './academy-type-list.component.html',
  styleUrl: './academy-type-list.component.css',
})
export class AcademyTypeListComponent {
  constructor(private academyService: AcademyService,
              private sharedService:SharedService
  ) {}
  academyTypeList: AcademyTypeResponse[] = [];
  ngOnInit() {
    this.loadAllAcademyTypes();
  }
  loadAllAcademyTypes() {
    this.academyService.getAcademyTypes().subscribe({
      next: (response) => {
        this.academyTypeList = response.result;
      },
    });
  }
  deleteType(id:any){}
 
}
