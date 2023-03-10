import { Field, InputType } from '@nestjs/graphql';
import { PlantType } from '../models/plant.model';

@InputType()
export class FindPlantInput {
  @Field(() => String, { nullable: true })
  uuid?: string;

  @Field(() => String, { nullable: true })
  variety?: string;

  @Field(() => PlantType, { nullable: true })
  type?: PlantType;
}
