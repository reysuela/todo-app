import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TodoItem } from '../../utils/TodoItem';
import { TodoService } from '../todo.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todoItem: TodoItem;

  private observableTodo$: Observable<any>;
  private putTodo = new Subject<string>();

  constructor(
    private todoService: TodoService,
    private stateService: StateService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.observableTodo$ = this.putTodo.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((updatedValue: string) => {
        const updatedTodo = { id: this.todoItem.id, name: updatedValue, isComplete: this.todoItem.isComplete };
        return this.todoService.updateTodo(updatedTodo, this.todoItem.id);
      })
    );
    this.observableTodo$.subscribe((updatedTodo) =>  {
      this.stateService.updateTodo(updatedTodo);
      this.openSnackBar("Updated todo!");
    });
  }

  completeTodo(): void {
    setTimeout(() => {
      const updatedTodo = { ...this.todoItem, isComplete: true };
      this.todoService.updateTodo(updatedTodo, this.todoItem.id).subscribe((completedTodo) => {
        this.stateService.completeTodo(completedTodo);
        this.openSnackBar("Completed todo!");
      });
    }, 300);
  }

  updateTodo(value: string): void {
    if (value !== "") {
      this.putTodo.next(value);
    }
  }

  deleteTodo(): void {
    this.todoService.deleteTodo(this.todoItem.id).subscribe((deletedTodo) => {
      this.stateService.deleteTodo(deletedTodo);
      this.openSnackBar("Deleted todo!");
    });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, null, { duration: 2000 });
  }

}
