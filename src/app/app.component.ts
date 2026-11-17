import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
// 1. AI КӨМЕКШІ КОМПОНЕНТІН ИМПОРТТАУ:
import { AiHelperComponent } from './components/ai-helper/ai-helper.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    AiHelperComponent // 2. ОСЫНДА ҚОСЫҢЫЗ
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kz-cs-arena';
}