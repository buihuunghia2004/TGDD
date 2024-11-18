import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_LIMIT,
  Order,
} from '@/constants/app.constant';
import {
  NumberFieldOptional,
  StringFieldOptional,
} from '@/decorators/field.decorators';

export interface Options {
  take?: number;
  skip?: number;
  order?: { [key: string]: Order };
}

export class PageOptionsDto {
  @NumberFieldOptional({
    minimum: 1,
    default: DEFAULT_PAGE_LIMIT,
    int: true,
  })
  readonly limit?: number = DEFAULT_PAGE_LIMIT;

  @NumberFieldOptional({
    minimum: 1,
    default: DEFAULT_CURRENT_PAGE,
    int: true,
  })
  readonly page?: number = DEFAULT_CURRENT_PAGE;

  @StringFieldOptional()
  readonly q?: string;

  @StringFieldOptional()
  readonly "is-paginate"?: string;

  @StringFieldOptional()
  private sort?: string;

  get offset() {
    return this.page ? (this.page - 1) * this.limit : 0;
  }

  get isPaginate() {
    return this["is-paginate"] !== 'false';
  }

  protected getSortRequest(fileds: string[]): [string, Order] {
    const result = this.sort?.split(',') || [];    
    return (result.length === 2 && fileds.includes(result[0])) ? [result[0] as string, result[1] === 'asc' ? Order.ASC : Order.DESC] : ['createdAt', Order.DESC];
  }
  
  protected getOptions(fileds: string[]) {
    let options: Options = this.isPaginate ? {
      take: this.limit,
      skip: this.offset,
    } : {};
    options.order = {[this.getSortRequest(fileds)[0]]: this.getSortRequest(fileds)[1]}
    return options;
  }
}
