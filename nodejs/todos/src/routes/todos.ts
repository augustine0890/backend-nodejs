import { Router } from "express";
import { createTodo, getTodos, removeTodo, updateTodo } from '../controllers/todos';

const router = Router();

router.get('/', getTodos);

router.post('/', createTodo);

router.put('/:id', updateTodo);

router.delete('/:id', removeTodo);

export default router;
