import { IsDate, IsEmail, IsString, IsUrl } from 'class-validator';

export class CustomerDTO {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  secondLastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  cellPhone: string;

  @IsString()
  phone: string;

  @IsString()
  rfc: string;

  @IsString()
  address1: string;

  @IsString()
  address2: string;

  @IsString()
  birthday: string;

  gender: string;

  @IsUrl()
  avatar: string;
}
