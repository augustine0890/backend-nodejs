import { RequestHandler } from 'express';
import { Todo } from '../models/todos';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  let id: Number = Math.floor(Math.random() * 10 );
  const newTodo = new Todo(id.toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: 'Created the todo.', createTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error('Could not find the todo.');
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.status(200).json({ message: 'Successfully updated!', updateTodo: TODOS[todoIndex] });
};

export const removeTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const todoId = req.params.id;
  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error('Could not find the todo.');
  }

  TODOS.splice(todoIndex, 1);

  res.status(200).json({ message: 'Successfully removed!' });
};