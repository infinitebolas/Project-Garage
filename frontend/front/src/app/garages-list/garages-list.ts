import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarageService } from '../services/garage.service';
import { GarageModel } from '../models/garage.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-garages-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './garages-list.html',
  styleUrl: './garages-list.scss',
})
export class GaragesList implements OnInit {
  
  constructor(
    private garageService: GarageService,
    private cdr: ChangeDetectorRef,
    private router:Router     
  ) {}  
  garages: GarageModel[] = [];

  ngOnInit(): void {
    this.loadGarages();
  }
  deleteGarage(id: number) {
    this.garageService.deleteGarage(id).subscribe(() => {
      this.loadGarages();
    });
  }

  loadGarages() {
    this.garageService.getGarages().subscribe(data => {
      this.garages = data;
      this.cdr.detectChanges();
    });
  }

  afficherGarage(id:number){
    this.router.navigate(['/garages/'+id]);
  }

}