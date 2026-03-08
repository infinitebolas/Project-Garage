import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { GaragesList } from './garages-list/garages-list';
import { Garage } from './garage/garage';
import { VoituresList } from './voitures-list/voitures-list';
import { Voiture } from './voiture/voiture';
import { CreateModify } from './create-modify/create-modify';

export const routes: Routes = [
    { path: '', redirectTo: 'accueil', pathMatch: 'full' },

    { path: 'accueil', component: Accueil },
    { path: 'garages', component: GaragesList },
    { path: 'garages/:id', component: Garage },
    { path: 'voiture', component: VoituresList },
    { path: 'voiture/:id', component: Voiture },
    { path: 'createmodify/:item', component: CreateModify},
    { path: 'createmodify/:item/:id', component: CreateModify}

];

