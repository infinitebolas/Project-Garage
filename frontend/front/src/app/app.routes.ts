import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { GaragesList } from './garages-list/garages-list';
import { Garage } from './garage/garage';
export const routes: Routes = [
    {path: '', component:Accueil},
    {path: 'garages', component:GaragesList},
    {path: 'garages/:id', component:Garage}
];
