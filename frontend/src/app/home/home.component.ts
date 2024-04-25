import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  teamMembers = [
    { name: 'John Doe', role: 'Frontend Developer', imageUrl: 'team-1.jpg' },
    { name: 'Jane Smith', role: 'Backend Developer', imageUrl: 'team-2.jpg' },
    { name: 'Alice Johnson', role: 'UI/UX Designer', imageUrl: 'team-3.jpg' },
    { name: 'Bob Brown', role: 'Project Manager', imageUrl: 'team-4.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-1.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-2.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-3.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-4.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-1.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-2.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-3.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-4.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-1.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-2.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-3.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-4.jpg' }
  ];
}
