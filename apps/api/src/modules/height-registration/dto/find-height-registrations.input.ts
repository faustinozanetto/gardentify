import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindHeightRegistrationsInput {
  @Field(() => Int)
  take: number;

  @Field(() => Boolean)
  includePlant: boolean;
}
