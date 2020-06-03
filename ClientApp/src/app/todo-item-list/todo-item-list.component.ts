import { Component, Input, OnInit } from '@angular/core';

import { TodoItem } from '../../utils/TodoItem';
import { TodoService } from '../todo.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-todo-item-list',
  templateUrl: './todo-item-list.component.html',
  styleUrls: ['./todo-item-list.component.css']
})
export class TodoItemListComponent implements OnInit {
  @Input() todosAreComplete: boolean;
  public todoItems: TodoItem[]; 
  
  constructor(
    private todoService: TodoService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    if ((this.todosAreComplete && this.stateService.getCompleteTodos() === undefined
      || (!this.todosAreComplete && this.stateService.getIncompleteTodos() === undefined))) {
        this.getTodosFromService(); 
      } else {
        this.getTodosFromState();
      }
  }

  getTodosFromService(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.stateService.setTodos(todos);
      this.getTodosFromState();
    });
  }

  getTodosFromState(): void {
    if (this.todosAreComplete) {
      this.todoItems = this.stateService.getCompleteTodos();
    } else {
      this.todoItems = this.stateService.getIncompleteTodos();
    }
  }

}
