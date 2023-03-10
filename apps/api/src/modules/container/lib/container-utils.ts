import { ContainerType as PrismaContainerType } from '@prisma/client';
import { ContainerType } from '../models/container.model';

/**
 *
 * @param plant plant type generated by PrismaJS.
 * @returns the parsed plant based on the model we created.
 */
export const parseContainerType = (
  type: PrismaContainerType,
): ContainerType => {
  let parsedType: ContainerType = ContainerType.Bag;

  // Parse enum type to the one in the plant model.
  Object.values(ContainerType).forEach((stype: string) => {
    if (type === stype) {
      parsedType = stype as ContainerType;
    }
  });

  return parsedType;
};
