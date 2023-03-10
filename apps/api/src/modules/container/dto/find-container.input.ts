import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindContainerInput {
  @Field(() => String)
  uuid: string;
}
