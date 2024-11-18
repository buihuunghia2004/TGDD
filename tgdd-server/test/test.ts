import 'reflect-metadata';

import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  
  @Expose()
  bio?: string;

  @Expose()
  image: string;
}

const exposedKeys = Reflect.getMetadata('fields', UserResDto);

console.log(exposedKeys)