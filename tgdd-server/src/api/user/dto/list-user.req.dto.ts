import { PageOptionsDto } from '@/common/dto/offset-pagination/page-options.dto';
import { Order } from '@/constants/app.constant';

const FIELDS = ['id','username','email','bio','image','createdAt','updatedAt']
export class ListUserReqDto extends PageOptionsDto {
  // readonly _only: string[] = this.getOnlyRequest(FIELDS, TABLE_NAME);
  readonly _sort: [string, Order] = this.getSortRequest(FIELDS);
}