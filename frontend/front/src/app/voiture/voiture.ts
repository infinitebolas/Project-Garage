import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VoitureService } from '../services/voiture.service';
import { GarageService } from '../services/garage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VoitureModel } from '../models/voiture.models';
import { GarageModel } from '../models/garage.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voiture',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './voiture.html',
  styleUrl: './voiture.scss',
})
export class Voiture implements OnInit {

  voiture?: VoitureModel;
  garage?: GarageModel;
  garages: GarageModel[] = []; //liste de garages

  constructor(
    private voitureService: VoitureService,
    private garageService: GarageService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef, 
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // récupération de l'id dans l'url

    this.loadVoiture(id);   
    this.loadGarages();     
  }
  loadVoiture(id: number) {
    this.voitureService.getVoitureById(id).subscribe(data => {
      console.log('Voiture chargée:', data);
      this.voiture = data;

      if (data.garage !== null) {
        this.loadGarage(data.garage);
      } else {
        this.garage = undefined;
      }
      this.cdr.detectChanges();
    });
  }

  loadGarage(id: number) {
    this.garageService.getGarageById(id).subscribe(data => {
      this.garage = data;
      this.cdr.detectChanges();
    });
  }

  loadGarages() {
    this.garageService.getGarages().subscribe(data => {
      this.garages = data;
      this.cdr.detectChanges();
    });
  }

  deleteVoiture(id: number) {
    this.voitureService.deleteVoiture(id).subscribe(() => {
      this.retourVoitures();
    });
  }

  retourVoitures() {
    this.router.navigate(['/voiture']);
  }

  accesGarage(id: number) {
    this.router.navigate(['/garages', id]);
  }


  updateGarage(id: number, garageId: number) {
    this.voitureService.updateGarage(id, garageId).subscribe(() => {
      this.loadVoiture(id); 
    });
  }

  changeGarage(event: Event) {
    const value = (event.target as HTMLSelectElement).value; // on récupère la valeur du ng-template
    const garageId = value ? Number(value) : -1; // on change la valeur, ou on met -1 si on veut supprimer le garage
    if (this.voiture) {
      this.updateGarage(this.voiture.id, garageId);
    }
  }
}