import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-accueil',
  imports: [],
  standalone: true,
  templateUrl: './accueil.html',
  styleUrl: './accueil.scss',
})
export class Accueil {
  constructor(private router: Router) {}
  onContinue() {
    this.router.navigate(['/garages']);
}
}
