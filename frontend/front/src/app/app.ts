import { Component, signal } from '@angular/core';
import { Accueil } from './accueil/accueil';
import { Header } from './header/header';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Accueil, Header]
})
export class App {
}
