import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { DeleteObjectResponse } from '@modules/common/responses/delete-object.response';
import { Plant } from './models/plant.model';
import { PlantResponse } from './responses/plant.response';
import { FindPlantInput } from './dto/find-plant.input';
import { PlantsResponse } from './responses/plants.response';
import { CreatePlantInput } from './dto/create-plant.input';
import { UpdatePlantInput } from './dto/update-plant.input';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '@modules/auth/guards/gql-auth.guard';
import { PlantsService } from './plants.service';

@Resolver(() => Plant)
@UseGuards(GqlAuthGuard)
export class PlantsResolver {
  constructor(private plantsService: PlantsService) {}

  @Query(() => PlantResponse)
  async findPlant(
    @Args('input') input: FindPlantInput,
  ): Promise<PlantResponse> {
    return await this.plantsService.findPlant(input);
  }

  @Query(() => PlantsResponse)
  async findPlants(
    @Args('input') input: FindPlantInput,
  ): Promise<PlantsResponse> {
    return await this.plantsService.findPlants(input);
  }

  @Mutation(() => PlantResponse)
  async createPlant(
    @Args('input') input: CreatePlantInput,
  ): Promise<PlantResponse> {
    return await this.plantsService.createPlant(input);
  }

  @Mutation(() => DeleteObjectResponse)
  async deletePlant(
    @Args('input') input: FindPlantInput,
  ): Promise<DeleteObjectResponse> {
    return await this.plantsService.deletePlant(input);
  }

  @Mutation(() => PlantResponse)
  async updatePlant(
    @Args('input') input: UpdatePlantInput,
  ): Promise<PlantResponse> {
    return await this.plantsService.updatePlant(input);
  }
}
