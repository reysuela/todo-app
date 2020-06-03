import { Component } from '@angular/core';

import { TodoItem } from 'src/utils/TodoItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", 
    "Saturday"
  ];
  private months = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  private date: string;
  public isViewingIncompleteTodos = true;

  ngOnInit(): void {
    this.date = this.getCurrentDate();
  }

  getCurrentDate(): string {
    const dateObj = new Date();
    return `${this.days[dateObj.getDay()]}, ${this.months[dateObj.getMonth()]} ${dateObj.getDate()}`
  }

  setIsViewingIncompleteTodos(value: boolean) {
    this.isViewingIncompleteTodos = value;
  }
}
