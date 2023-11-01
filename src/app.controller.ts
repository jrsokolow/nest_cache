import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.appService.readFromCache();
  }

  @Get('/cache')
  async checkCacheStatus(): Promise<string[]> {
    return await this.appService.getCacheState()
  }

  @Get('/todos')
  async getTodos(): Promise<Response> {
    return (await fetch('https://jsonplaceholder.typicode.com/todos')).json();
  }
}
