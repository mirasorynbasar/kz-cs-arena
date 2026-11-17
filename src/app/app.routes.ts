import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { TournamentsComponent } from './features/tournaments/tournaments.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Басты бет
  { path: 'tournaments', component: TournamentsComponent }, // Турнирлер беті
  { path: '**', redirectTo: '' } // Қате жол болса басты бетке лақтыру
];