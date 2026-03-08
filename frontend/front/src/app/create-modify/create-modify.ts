import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { VoitureService } from '../services/voiture.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GarageService } from '../services/garage.service';

@Component({
  selector: 'app-create-modify',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-modify.html'
})
export class CreateModify implements OnInit {

  entite!: string;
  id?: number;

  title!: string;
  buttonText!: string;

  placeholder1!: string;
  placeholder2!: string;
  placeholder3?: string;
  name1!:string;
  name2!:string;
  name3?:any;

  constructor(
    private voitureService: VoitureService,
    private garageService: GarageService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {

    this.entite = this.route.snapshot.paramMap.get('entite')!;
    console.log(this.entite);
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
    }

    this.configureForm();
  }

  configureForm(){

    if(this.entite === "voiture"){

      this.title = "Créer une voiture";
      this.buttonText = "Créer la voiture";

      this.placeholder1 = "Modèle";
      this.placeholder2 = "Couleur";
      this.name1 = "modele";
      this.name2 = "couleur";

    }

    if(this.entite === "garage"){

      this.title = "Créer un garage";
      this.buttonText = "Créer le garage";

      this.placeholder1 = "Nom du garage";
      this.placeholder2 = "Adresse";
      this.placeholder3 = "Description";
      this.name1 = "nom";
      this.name2 = "adresse";
      this.name3 = "description";

    }

  }

  onSubmit(form: NgForm) {

    if (!form.valid) return;

    if (this.entite === "voiture") {

      this.voitureService.createVoiture(form.value).subscribe(() => {
        alert("Voiture créée");
        this.router.navigate(['/voiture']);
      });

    }

    if (this.entite === "garage") {

      this.garageService.createGarage(form.value).subscribe(() => {
        alert("Garage créé");
        this.router.navigate(['/garages']);
      });

    }

  }

}