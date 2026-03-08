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
  templateUrl: './create-modify.html'
})
export class CreateModify implements OnInit {

  entite!: string;
  id?: number;
  title?: string;
  voiture?: VoitureModel;
  garage?: GarageModel;
  buttonText?:string;
  fields: any[] = [];

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
      this.id = Number(idParam);
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
    if(!form.valid) return;
    if(this.entite === "voiture"){
      this.voitureService.createVoiture(form.value).subscribe(()=>{
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
          placeholder: "Modifier le modèle",
          value: this.voiture?.modele || "",
          patchMethod: "patchModele"
        },
        {
          name: "couleur",
          placeholder: "Modifier la couleur",
          value: this.voiture?.couleur || "",
          patchMethod: "patchCouleur"
        }
      ];
    }
    if(this.entite === "garage"){
      this.fields = [
        {
          name: "nom",
          placeholder: "Modifier le nom",
          value: this.garage?.nom || "",
          patchMethod: "patchNom"
        },
        {
          name: "adresse",
          placeholder: "Modifier l'adresse",
          value: this.garage?.adresse || "",
          patchMethod: "patchAdresse"
        },
        {
          name: "description",
          placeholder: "Modifier la description",
          value: this.garage?.description || "",
          patchMethod: "patchDescription"
        }
      ];
    }
  }

  submitField(field:any){
    if(!this.id) return;
    const value = field.value;
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