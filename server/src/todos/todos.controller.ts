import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.todosService.findOne(id);
  }

  @Post()
  async create(
    @Body() createDto: { task: string; completed: boolean; startDate: string; endDate: string }
  ) {
    return this.todosService.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDto: { task?: string; completed?: boolean; startDate?: string; endDate?: string }
  ) {
    return this.todosService.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.todosService.delete(id);
  }
}
