import { Options, PageOptionsDto } from '@/common/dto/offset-pagination/page-options.dto';
import { BRAND_RES_FIELDS } from './product.res.dto';
export class ListProductReqDto extends PageOptionsDto {
  get _options(): Options {
    return this.getOptions(BRAND_RES_FIELDS);
  }
}