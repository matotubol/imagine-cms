import {Field, InputType} from '@nestjs/graphql';
import {ConfigUpdateInputDTO} from '@imagine-cms/types';
import {IsAlphanumeric, IsOptional, IsUrl} from 'class-validator';

@InputType()
export class ConfigUpdateInput implements ConfigUpdateInputDTO {
  @Field({nullable: true})
  @IsAlphanumeric()
  @IsOptional()
  siteName?: string;

  @Field({nullable: true})
  @IsUrl()
  @IsOptional()
  logoURL?: string;

  @Field({nullable: true})
  @IsUrl()
  @IsOptional()
  nitroURL?: string;

  @Field({nullable: true})
  @IsUrl()
  @IsOptional()
  discordURL?: string;

  @Field({nullable: true})
  @IsOptional()
  discordWidget?: string;

  @Field({nullable: true})
  @IsUrl()
  @IsOptional()
  facebookURL?: string;

  @Field({nullable: true})
  @IsUrl()
  @IsOptional()
  instagramURL?: string;

  @Field({nullable: true})
  @IsUrl()
  @IsOptional()
  twitterURL?: string;

  @Field({nullable: true})
  @IsUrl()
  @IsOptional()
  snapchatURL?: string;
}
