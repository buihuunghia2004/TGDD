import { Options, PageOptionsDto } from '@/common/dto/offset-pagination/page-options.dto';
import { PRODUCT_RES_FIELDS } from './product.res.dto';
export class ListProductReqDto extends PageOptionsDto {
  get _options(): Options {
    return this.getOptions(PRODUCT_RES_FIELDS);
  }
}