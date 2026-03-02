import { Component } from '@angular/core';
import { Garage } from '../garage/garage';
import { GarageModel } from '../models/garage.models';
import { GarageService } from '../services/garage.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-garages-list',
  standalone: true,
  imports: [Garage],
  templateUrl: './garages-list.html',
  styleUrls: ['./garages-list.scss'],
})
export class GaragesList implements OnInit {

  garages: GarageModel[] = [];

  constructor(private garageService: GarageService) {}

  ngOnInit(): void {
    this.garageService.getGarages().subscribe((data) => {
      this.garages = data;
    });
  }
}