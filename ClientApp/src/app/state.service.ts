import { Injectable } from '@angular/core';

import { TodoItem } from '../utils/TodoItem';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private incompleteTodos: TodoItem[];
  private completeTodos: TodoItem[];

  constructor() { }

  setTodos(todos: TodoItem[]): void {
    this.incompleteTodos = todos.filter(todo => todo.isComplete === false);
    this.completeTodos = todos.filter(todo => todo.isComplete === true);
  }

  getIncompleteTodos(): TodoItem[] {
    return this.incompleteTodos;
  }

  getCompleteTodos(): TodoItem[] {
    return this.completeTodos;
  }

  addTodo(todo: TodoItem): void {
    this.incompleteTodos.push(todo);
  }

  updateTodo(todo: TodoItem): void {
    this.incompleteTodos[this.incompleteTodos.findIndex(curTodo => curTodo.id === todo.id)] = todo;
  }

  completeTodo(todo: TodoItem): void {
    this.incompleteTodos.splice(this.incompleteTodos.findIndex(curTodo => curTodo.id === todo.id), 1);
    this.completeTodos.push(todo);
  }

  deleteTodo(todo: TodoItem): void {
    this.completeTodos.splice(this.completeTodos.findIndex(curTodo => curTodo.id === todo.id), 1);
  }
}
