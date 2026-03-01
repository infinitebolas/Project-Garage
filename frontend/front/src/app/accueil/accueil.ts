import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-accueil',
  imports: [RouterLink],
  templateUrl: './accueil.html',
  styleUrl: './accueil.scss',
})
export class Accueil {
  constructor(private router: Router) {}
  onContinue() {
    this.router.navigateByUrl('/garages');
}
}
