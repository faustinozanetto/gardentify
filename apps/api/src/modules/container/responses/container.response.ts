import { Error } from '@modules/common/models/error.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { Container } from '../models/container.model';

@ObjectType()
export class ContainerResponse {
  @Field(() => Container, { nullable: true })
  container?: Container;

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}
