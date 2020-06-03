import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { TodoItem, NewTodoItem } from '../utils/TodoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosBaseUrl = 'api/TodoItems';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.todosBaseUrl).pipe(
      tap(_ => this.log(`Fetched todo items`)),
      catchError(this.handleError<TodoItem[]>('getTodos', []))
    );
  }

  createTodo(newTodo: NewTodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.todosBaseUrl, newTodo, this.httpOptions).pipe(
      tap(_ => this.log(`Created todo item`)),
      catchError(this.handleError<any>('createTodo', {}))
    );
  }

  updateTodo(updatedTodo: TodoItem, todoId: number): Observable<TodoItem> {
    return this.http.put<TodoItem>(`${this.todosBaseUrl}/${todoId}`, updatedTodo, this.httpOptions).pipe(
      tap(_ => this.log(`Updated todo item`)),
      catchError(this.handleError<any>('updateTodo', {}))
    );
  }

  deleteTodo(todoId: number): Observable<TodoItem> {
    return this.http.delete<TodoItem>(`${this.todosBaseUrl}/${todoId}`, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted todo item`)),
      catchError(this.handleError<any>('deleteTodo', {}))
    );
  }

  private log(message: string): void {

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
