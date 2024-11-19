import { Options, PageOptionsDto } from '@/common/dto/offset-pagination/page-options.dto';
import { BRAND_RES_FIELDS } from './brand.res.dto';
export class ListBrandReqDto extends PageOptionsDto {
  get _options(): Options {
    return this.getOptions(BRAND_RES_FIELDS);
  }
}
