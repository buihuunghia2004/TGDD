import {
  StringField,
} from '@/decorators/field.decorators';

export class CreateLaptopVariantReqDto {

  @StringField()
  os: string;

  @StringField()
  cpu: string;

  @StringField()
  card: string;

  @StringField()
  cpuSpeed: string;

  @StringField()
  ram: string;

  @StringField()
  ramType: string;

  @StringField()
  storage: string;

  @StringField()
  screenSize: string;

  @StringField()
  screenResolution: string;

  @StringField()
  battery: string;

  @StringField()
  charge: string;

  @StringField()
  design?: string
  
  @StringField()
  material?: string
}
