import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
  @Input() data?: { key: string, value: number };
  dataPerYear: number = 0;
  
  ngOnInit(): void {
    if (this.data) {
      const rawResult = (this.data.value / 12) * 100 + 1;
      this.dataPerYear = parseFloat(rawResult.toFixed(0)); 
    }
  
  }
  


}
