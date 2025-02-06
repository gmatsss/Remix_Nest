import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { NeonService } from '../neon.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService, NeonService],
})
export class TodosModule {}
