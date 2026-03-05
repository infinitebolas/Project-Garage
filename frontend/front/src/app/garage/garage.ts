import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GarageModel } from '../models/garage.models';
import { GarageService } from '../services/garage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VoitureModel } from '../models/voiture.models';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './garage.html',
  styleUrls: ['./garage.scss'],
})
export class Garage implements OnInit {

  constructor(
    private garageService: GarageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,    
  ) {}  

  garage!: GarageModel ;
  voitures!: VoitureModel[];
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadGarage(id);
    this.loadVoitures(id);
  }
  deleteGarage(id: number) {
    this.garageService.deleteGarage(id).subscribe(() => {
      this.retourGarages();
    });
  }

  loadGarage(id:number) {
    this.garageService.getGarageById(id).subscribe(data => {
      this.garage = data;
      this.cdr.detectChanges();
    });
  }

  loadVoitures(id:number) {
    this.garageService.getVoitures(id).subscribe(data => {
      this.voitures = data;
      this.cdr.detectChanges();
    });
  }

  retourGarages(){
    this.router.navigate(['/garages']);
  }
}