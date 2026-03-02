import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { GaragesList } from './garages-list/garages-list';
import { Garage } from './garage/garage';
import { VoituresList } from './voitures-list/voitures-list';
import { Voiture } from './voiture/voiture';

export const routes: Routes = [
    { path: '', redirectTo: 'accueil', pathMatch: 'full' },

    { path: 'accueil', component: Accueil },
    { path: 'garages', component: GaragesList },
    { path: 'garages/:id', component: Garage },
    { path: 'voitures', component: VoituresList },
    { path: 'voitures/:id', component: Voiture }

];

