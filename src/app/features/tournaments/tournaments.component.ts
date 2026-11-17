import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TournamentService, Team } from '../../core/services/tournament.service'; // Team интерфейсін қосамыз
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  regForm!: FormGroup;

  // Командалар тізімін сақтайтын айнымалы
topTeams: Team[] = [
  { id: 1, name: 'Natus Vincere', rank: 1, logo: '/assets/teams/navi.jpg', winRate: 85 },
  { id: 2, name: 'Team Spirit', rank: 2, logo: '/assets/teams/spirit.jpeg', winRate: 78 },
  { id: 3, name: 'Virtus.pro', rank: 3, logo: '/assets/teams/virtuspro.jpg', winRate: 72 },
  { id: 4, name: 'FURIA Esports', rank: 4, logo: '/assets/teams/furia.jpg', winRate: 65 },
  { id: 5, name: 'Astralis', rank: 5, logo: '/assets/teams/astralis.jpg', winRate: 60 }
];

  constructor(private service: TournamentService, private router: Router) {}

  ngOnInit() {
    this.regForm = new FormGroup({
      nickname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      faceitElo: new FormControl('', [Validators.required, Validators.min(100), Validators.max(5000)]),
      teamName: new FormControl('', Validators.required), // Бұл жерде команда аты таңдалады
      faceitUrl: new FormControl('', [
        Validators.required, 
        Validators.pattern('https://www.faceit.com/.*')
      ])
    });
  }

  submit() {
    if (this.regForm.valid) {
      this.service.registerPlayer(this.regForm.value);
      this.router.navigate(['/']); 
    }
  }
}