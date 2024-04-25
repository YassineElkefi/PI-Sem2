import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  teamMembers = [
    { name: 'John Doe', role: 'Frontend Developer', imageUrl: 'testimonial-1.jpg' },
    { name: 'Jane Smith', role: 'Backend Developer', imageUrl: 'testimonial-1.jpg' },
    { name: 'Alice Johnson', role: 'UI/UX Designer', imageUrl: 'testimonial-1.jpg' },
    { name: 'Bob Brown', role: 'Project Manager', imageUrl: 'testimonial-1.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'testimonial-1.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'testimonial-1.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'testimonial-1.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'testimonial-1.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'testimonial-1.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'testimonial-1.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'testimonial-1.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'testimonial-1.jpg' },
  ];
}
