`import { PageOptionsDto } from '@/common/dto/offset-pagination/page-options.dto';
import { Order } from '@/constants/app.constant';

const FIELDS = ['id','createdAt','updatedAt']
export class ListyxxReqDto extends PageOptionsDto {
  readonly _sort: [string, Order] = this.getSortRequest(FIELDS);
}`