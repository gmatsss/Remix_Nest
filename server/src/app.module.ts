// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NeonService } from './neon.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule],
  controllers: [AppController],
  providers: [NeonService],
})
export class AppModule {}
