import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ai-helper',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './ai-helper.component.html',
  styleUrls: ['./ai-helper.component.css']
})
export class AiHelperComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  // Чаттың күйін сақтайтын айнымалы
  isOpen: boolean = false; 

  messages: any[] = [
    { text: 'Сәлем! KZ CS Arena көмекшісімін. Сұрағыңыз бар ма?', sender: 'ai' }
  ];
  userInput: string = '';
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // Чатты ашу және жабу функциясы
  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  ngAfterViewChecked() {
    if (this.isOpen) {
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) {}
  }

  sendMessage() {
    const text = this.userInput.trim();
    if (text && !this.isLoading) {
      this.messages.push({ text: text, sender: 'user' });
      this.userInput = '';
      this.isLoading = true;

      this.http.post<any>('https://kz-cs-arena.onrender.com/chat', { prompt: text }).subscribe({
        next: (res) => {
          this.messages.push({ text: res.reply, sender: 'ai' });
          this.isLoading = false;
        },
        error: () => {
          this.messages.push({ text: 'Байланыс қатесі.', sender: 'ai' });
          this.isLoading = false;
        }
      });
    }
  }
}