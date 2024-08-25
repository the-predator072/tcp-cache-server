import NodeCache from "node-cache";

interface ICacheMethods {
  cache: NodeCache;
}

interface ICache {
  key: string;
  val: any; 
  ttl?: number;
}
class CacheMethods implements ICacheMethods {
  public cache: NodeCache;

  constructor() {
    this.cache = new NodeCache();
  }

  public setSingle = ({
    key,
    val: value,
    ttl: expiration = 300,
  }: ICache): boolean => this.cache.set(key, value, expiration);

  public setMany = (params: ICache[]): boolean => this.cache.mset(params);

  public getSingle = (key: string): any => this.cache.get(key);

  public getAndDelete = (key: string): any => this.cache.take(key);

  public getMany = (keys: string[]): Record<string, any> =>
    this.cache.mget(keys);

  public deleteSingle = (key: string): number => this.cache.del(key);

  public deleteMany = (keys: string[]): number => this.cache.del(keys);

  public changeExpiration = (key: string, expiration: number): boolean =>
    this.cache.ttl(key, expiration);

  public getExpiration = (key: string): number | undefined =>
    this.cache.getTtl(key);

  public listKeys = (): string[] => this.cache.keys();

  public hasKey = (key: string): boolean => this.cache.has(key);

  public getStatistics = (): NodeCache.Stats => this.cache.getStats();

  public deleteAll = (): void => this.cache.flushAll();
}

export default CacheMethods;
