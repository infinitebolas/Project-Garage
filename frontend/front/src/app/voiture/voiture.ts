import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VoitureService } from '../services/voiture.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VoitureModel } from '../models/voiture.models';
import { GarageService } from '../services/garage.service';
import { GarageModel } from '../models/garage.models';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-voiture',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './voiture.html',
  styleUrl: './voiture.scss',
})
export class Voiture implements OnInit{

  constructor(
    private voitureService: VoitureService,
    private garageService: GarageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  voiture!: VoitureModel ;
  garage!: GarageModel;
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadVoiture(id);    
  }

  loadVoiture(id:number) {
    this.voitureService.getVoitureById(id).subscribe(data => {
      this.voiture = data;

      if (this.voiture.garage) {
        this.loadGarage(this.voiture.garage);
      }
    });
  }

  loadGarage(id:number) {
    this.garageService.getGarageById(id).subscribe(data => {
      this.garage = data;
      this.cdr.detectChanges();
    });
  }

  deleteVoiture(id: number) {
    this.voitureService.deleteVoiture(id).subscribe(() => {
      this.retourVoitures();
    });
  }

  retourVoitures(){
    this.router.navigate(['/voiture']);
  }

  accesGarage(id:number){
    this.router.navigate(['/garages'+id]);
  }

}
