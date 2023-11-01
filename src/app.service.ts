import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async initCache() {
    await this.cacheManager.set('my_item', 'Hello World');
  }
  
  async readFromCache(): Promise<string> {
    const value = await this.cacheManager.get<string>('my_item');
    if(value) {
      return value;
    } else {
      return 'Cache is empty';
    }
  }

  async getCacheState(): Promise<string []> {
    return await this.cacheManager.store.keys();
  }
}
