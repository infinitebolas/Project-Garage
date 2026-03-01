import { Component, signal } from '@angular/core';
import { Accueil } from './accueil/accueil';
import { Header } from './header/header';
import { RouterOutlet } from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Accueil, Header, RouterOutlet]
})
export class App {
}
