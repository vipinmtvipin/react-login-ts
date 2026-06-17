import { TodoDataSource } from "../../../Data/DataSources/Todo/TodoDataSource";
import { Todo } from "../../../../../../../../Downloads/a-react/src/Domain/Models/Todo";
import { Http } from "../../../../../../../../Downloads/a-react/src/Services/Http";

export class TodoDataSourceImpl implements TodoDataSource {
  async getTodos() {
    const res = await Http.get<Todo[]>("/todos");
    return res.data;
  }

  async createTodo(todo: Omit<Todo, "id">) {
    const res = await Http.post<Todo>("/todos", todo);
    return res.data;
  }

  /**
   * The massive delete is not available in those APIs
   */
  async clearTodos() {
    return new Promise<void>((resolve) => resolve());
  }
}
