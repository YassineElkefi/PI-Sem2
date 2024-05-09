import { Component, Input } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  @Input() Data?: { key: string, value: number }[];
}
