import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { neon } from '@neondatabase/serverless';


config();


@Injectable()
export class NeonService {
  public sql: any; 

  constructor() {

    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in the environment variables');
    }
    this.sql = neon(process.env.DATABASE_URL);
  }

  async getVersion(): Promise<string> {
    const result = await this.sql`SELECT version()`;
    return result[0].version;
  }
}
