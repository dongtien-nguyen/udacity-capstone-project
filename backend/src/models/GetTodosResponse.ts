import { TodoItem } from '../models/TodoItem'

export interface GetTodosResponse {
  items: TodoItem[]
  nextKey: string
}