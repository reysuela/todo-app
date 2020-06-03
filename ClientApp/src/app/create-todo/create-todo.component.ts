import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TodoService } from '../todo.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {
  constructor(
    private todoService: TodoService,
    private stateService: StateService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  createTodo(value: string): void {
    if (value !== "") {
      this.todoService.createTodo({ name: value, isComplete: false })
        .subscribe(newTodo => {
          this.stateService.addTodo(newTodo);
          this.openSnackBar("Todo added!");
        });
    }
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, null, { duration: 2000 });
  }
}
