import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VoitureService } from '../services/voiture.service';
import { GarageService } from '../services/garage.service';
import { VoitureModel } from '../models/voiture.models';
import { GarageModel } from '../models/garage.models';

@Component({
  selector: 'app-create-modify',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-modify.html',
  styleUrl:'./create-modify.scss'
})
export class CreateModify implements OnInit {

  entite!: string;
  id?: number;
  title?: string;
  voiture?: VoitureModel;
  garage?: GarageModel;
  fields: any[] = []; // une liste de champs de type any pour prendre tous les types

  constructor(
    private voitureService: VoitureService,
    private garageService: GarageService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.entite = this.route.snapshot.paramMap.get('entite')!;
    const idParam = this.route.snapshot.paramMap.get('id');
    if(idParam){
      this.id = Number(idParam); // si on a un id cela veut dire que l'on est dans le modify, sinon create
    }
    if(this.id){
      this.loadEntity();
    }else{
      this.configureFields();
    }
  }

  loadEntity(){
    if(this.entite === "voiture" && this.id){
      this.voitureService.getVoitureById(this.id).subscribe(data=>{
        this.voiture = data;
        this.configureFields();
        this.cdr.detectChanges();
        this.title = "Modification";
      });
      
    }
    if(this.entite === "garage" && this.id){
      this.garageService.getGarageById(this.id).subscribe(data=>{
        this.garage = data;
        this.configureFields();
        this.cdr.detectChanges();
      });
    }
  }

  onSubmit(form: NgForm){
    if(!form.valid) return; // on ne retourne rien si le formulaire n'est pas valide
    if(this.entite === "voiture"){
      this.voitureService.createVoiture(form.value).subscribe(()=>{ // on créé une voiture avec la valeur du formulaire
        alert("Voiture créée");
        this.router.navigate(['/voiture']);
      });
    }
    if(this.entite === "garage"){
      this.garageService.createGarage(form.value).subscribe(()=>{
        alert("Garage créé");
        this.router.navigate(['/garages']);
      });
    }
  }

  configureFields(){
    this.title = "Création";
    if(this.entite === "voiture"){
      this.fields = [
        {
          name: "modele",
          placeholder: "Modèle",
          value: this.voiture?.modele || "",
          patchMethod: "patchModele"
        },
        {
          name: "couleur",
          placeholder: "Couleur",
          value: this.voiture?.couleur || "",
          patchMethod: "patchCouleur"
        }
      ]; // on définit les différentes valeurs des champs, par exemple si un élément est chargé on prend sa couleur, sinon la valeur est nulle
    }
    if(this.entite === "garage"){
      this.fields = [
        {
          name: "nom",
          placeholder: "Nom",
          value: this.garage?.nom || "",
          patchMethod: "patchNom"
        },
        {
          name: "adresse",
          placeholder: "Adresse",
          value: this.garage?.adresse || "",
          patchMethod: "patchAdresse"
        },
        {
          name: "description",
          placeholder: "Description",
          value: this.garage?.description || "",
          patchMethod: "patchDescription"
        }
      ];
    }
  }

  submitField(field:any){
    if(!this.id) return;
    const value = field.value;
    // on vérifie quel champ doit être modifié pour le mettre à jour 
    if(this.entite === "voiture"){
      if(field.patchMethod === "patchModele"){
        this.voitureService.updateModele(this.id, value).subscribe(()=>{
          alert("Modèle modifié");
          this.router.navigate(['/voiture/'+this.id]);
        });
      }
      if(field.patchMethod === "patchCouleur"){
        this.voitureService.updateCouleur(this.id, value).subscribe(()=>{
          alert("Couleur modifiée");
          this.router.navigate(['/voiture/'+this.id]);
        });
      }
    }
    if(this.entite === "garage"){
      if(field.patchMethod === "patchNom"){
        this.garageService.updateNom(this.id, value).subscribe(()=>{
          alert("Nom modifié");
        });
      }
      if(field.patchMethod === "patchAdresse"){
        this.garageService.updateAdresse(this.id, value).subscribe(()=>{
          alert("Adresse modifiée");
        });
      }
      if(field.patchMethod === "patchDescription"){
        this.garageService.updateDescription(this.id, value).subscribe(()=>{
          alert("Description modifiée");
        });
      }
    }
  }
}