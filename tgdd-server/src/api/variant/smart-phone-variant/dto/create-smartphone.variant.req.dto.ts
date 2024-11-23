import {
  StringField,
} from '@/decorators/field.decorators';

export class CreateSmartPhoneVariantReqDto {

  @StringField()
  os?: string;

  @StringField()
  cpu?: string;

  @StringField()
  ram?: string;

  @StringField()
  rom?: string;

  @StringField()
  screenSize?: string;

  @StringField()
  screenTech?: string;

  @StringField()
  screenResolution?: string;

  @StringField()
  battery?: string;

  @StringField()
  fontCam?: string;

  @StringField()
  backCam?: string;

  @StringField()
  pin?: string;

  @StringField()
  sim?: string;

  @StringField()
  charge?: string;

  @StringField()
  wifi?: string

  @StringField()
  design?: string
  
  @StringField()
  material?: string
}
