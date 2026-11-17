import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Team {
  id: number;
  name: string;
  rank: number;
  logo: string;    
  winRate: number; 
}

export interface Player {
  nickname: string;
  faceitElo: number;
  teamName: string;
  faceitUrl: string;
}

export interface UserProfile {
  nickname: string;
  faceitElo: number;
  hoursPlayed: number;
  winRate: number;
  adr: number; 
  avgKills: number;
  tournamentsCount: number;
}

@Injectable({ providedIn: 'root' })
export class TournamentService {

  // ЖОЛДАРДЫ СЕНІҢ ПАПКАҢА (teams) СӘЙКЕС ТҮЗЕДІМ:
  private topTeams: Team[] = [
    { id: 1, name: 'Natus Vincere', rank: 1, logo: 'assets/teams/navi.jpg', winRate: 85 },
    { id: 2, name: 'Team Spirit', rank: 2, logo: 'assets/teams/spirit.jpeg', winRate: 78 },
    { id: 3, name: 'Virtus.pro', rank: 3, logo: 'assets/teams/virtuspro.jpg', winRate: 72 },
    { id: 4, name: 'FURIA Esports', rank: 4, logo: 'assets/teams/furia.jpg', winRate: 65 },
    { id: 5, name: 'Astralis', rank: 5, logo: 'assets/teams/astralis.jpg', winRate: 60 }
  ];

  private currentUser: UserProfile = {
    nickname: 'miras',
    faceitElo: 2850,
    hoursPlayed: 1452,
    winRate: 58.5,
    adr: 94.2,
    avgKills: 22.4,
    tournamentsCount: 12
  };

  private playersSource = new BehaviorSubject<Player[]>([]);
  players$ = this.playersSource.asObservable();

  constructor() {}

  getTopTeams(): Observable<Team[]> {
    return of(this.topTeams);
  }

  getCurrentUser(): Observable<UserProfile> {
    return of(this.currentUser);
  }

  registerPlayer(player: Player) {
    const current = this.playersSource.getValue();
    this.playersSource.next([...current, player]);
  }
}