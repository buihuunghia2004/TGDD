import { Options, PageOptionsDto } from '@/common/dto/offset-pagination/page-options.dto';
import { ADMIN_RES_FIELDS } from './admin.res.dto';
export class ListAdminReqDto extends PageOptionsDto {
  get _options(): Options {
    return this.getOptions(ADMIN_RES_FIELDS);
  }
}
