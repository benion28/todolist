import { TodoService } from './../../services/todo.service';
import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { filter } from 'minimatch';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todo) {
    // Delete From UI
    this.todos = this.todos.filter(filteredTodo => filteredTodo.id !== todo.id);
    // Delete From Server
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    });
  }

}
