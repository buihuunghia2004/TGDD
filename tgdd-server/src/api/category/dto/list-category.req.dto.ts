import { Options, PageOptionsDto } from '@/common/dto/offset-pagination/page-options.dto';
import { CATEGORY_RES_FIELDS } from './category.res.dto';
export class ListCategoryReqDto extends PageOptionsDto {
  get _options(): Options {
    return this.getOptions(CATEGORY_RES_FIELDS);
  }
}
