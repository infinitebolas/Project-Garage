import { Component, Input, OnInit } from '@angular/core';
import { GarageModel } from '../models/garage.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [],
  templateUrl: './garage.html',
  styleUrls: ['./garage.scss'],
})
export class Garage implements OnInit {
  @Input() garage!: GarageModel;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onViewGarage() {
    this.router.navigate(['/garage', this.garage.id]);
  }
}