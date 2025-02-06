// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { NeonService } from './neon.service';

@Controller()
export class AppController {
  constructor(private readonly neonService: NeonService) {}

  @Get('version')
  async getVersion(): Promise<string> {
    return await this.neonService.getVersion();
  }
}
