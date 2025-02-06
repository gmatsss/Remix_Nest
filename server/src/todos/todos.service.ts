import { Injectable } from '@nestjs/common';
import { NeonService } from '../neon.service';

@Injectable()
export class TodosService {
  constructor(private readonly neonService: NeonService) {}

  async findAll(): Promise<any[]> {
    return await this.neonService.sql`SELECT * FROM todos`;
  }

  async findOne(id: number): Promise<any> {
    const result = await this.neonService.sql`SELECT * FROM todos WHERE id = ${id}`;
    return result[0] || null;
  }

  async create(todo: { task: string; completed: boolean; startDate: string; endDate: string }): Promise<any> {
    const result = await this.neonService.sql`
      INSERT INTO todos (task, completed, start_date, end_date)
      VALUES (${todo.task}, ${todo.completed}, ${todo.startDate}, ${todo.endDate})
      RETURNING *`;
    return result[0];
  }

  async update(
    id: number,
    todo: { task?: string; completed?: boolean; startDate?: string; endDate?: string }
  ): Promise<any> {
    const result = await this.neonService.sql`
      UPDATE todos
      SET task = COALESCE(${todo.task}, task),
          completed = COALESCE(${todo.completed}, completed),
          start_date = COALESCE(${todo.startDate}, start_date),
          end_date = COALESCE(${todo.endDate}, end_date)
      WHERE id = ${id}
      RETURNING *`;
    return result[0];
  }

  async delete(id: number): Promise<{ id: number; message: string }> {
    const result = await this.neonService.sql`DELETE FROM todos WHERE id = ${id} RETURNING *`;
  
    if (result.length > 0) {
      return { id, message: `Todo with ID ${id} has been deleted.` };
    } else {
      throw new Error(`Todo with ID ${id} not found.`);
    }
  }
  
}
