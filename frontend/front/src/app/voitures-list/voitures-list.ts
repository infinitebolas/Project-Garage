import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VoitureService } from '../services/voiture.service';
import { VoitureModel } from '../models/voiture.models';

@Component({
  selector: 'app-voitures-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voitures-list.html',
  styleUrl: './voitures-list.scss',
})
export class VoituresList implements OnInit {
  
  constructor(
    private voitureService: VoitureService,
    private cdr: ChangeDetectorRef,
    private router:Router     
  ) {}  
  voitures: VoitureModel[] = [];

  ngOnInit(): void {
    this.loadVoitures();
  }
  deleteVoiture(id: number) {
    this.voitureService.deleteVoiture(id).subscribe(() => {
      this.loadVoitures();
    });
  }

  loadVoitures() {
    this.voitureService.getVoitures().subscribe(data => {
      this.voitures = data;
      this.cdr.detectChanges();
    });
  }

  afficherVoiture(id:number){
    this.router.navigate(['/voiture/'+id]);
  }

}