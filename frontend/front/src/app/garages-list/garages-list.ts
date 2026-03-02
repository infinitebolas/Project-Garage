import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarageService } from '../services/garage.service';
import { GarageModel } from '../models/garage.models';

@Component({
  selector: 'app-garages-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './garages-list.html',
  styleUrl: './garages-list.scss',
})
export class GaragesList implements OnInit {

  garages: GarageModel[] = [];

  constructor(
    private garageService: GarageService,
    private cdr: ChangeDetectorRef      
  ) {}

  ngOnInit(): void {
    this.garageService.getGarages().subscribe(data => {
      this.garages = data;
      this.cdr.detectChanges();        
    });
  }
}