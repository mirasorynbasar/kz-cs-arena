import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ОСЫНЫ ҚОСУ КЕРЕК
import { RouterModule } from '@angular/router'; // routerLink үшін қажет
import { TournamentService, Team, Player, UserProfile } from '../../core/services/tournament.service';

@Component({
  selector: 'app-home',
  standalone: true, // Сенде осы жер true болып тұрған сияқты
  imports: [CommonModule, RouterModule], // ОСЫ ЖЕРГЕ CommonModule МЕН RouterModule ҚОС
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topTeams: Team[] = [];
  newRegistrations: Player[] = [];
  currentUser!: UserProfile; 

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    // Командаларды алу
    this.tournamentService.getTopTeams().subscribe(teams => {
      this.topTeams = teams;
    });

    // Тіркелген ойыншыларды алу
    this.tournamentService.players$.subscribe(players => {
      this.newRegistrations = players;
    });

    // Қолданушы профилін алу
    this.tournamentService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  getLevel(elo: number): number {
    if (elo >= 2001) return 10;
    if (elo >= 1851) return 9;
    if (elo >= 1701) return 8;
    if (elo >= 1551) return 7;
    if (elo >= 1401) return 6;
    if (elo >= 1251) return 5;
    if (elo >= 1101) return 4;
    if (elo >= 951) return 3;
    if (elo >= 801) return 2;
    return 1;
  }
}