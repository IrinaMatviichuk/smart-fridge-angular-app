import { IconName } from '../../../core/icons/icon-name';

export interface RecipeCardModel {
  readonly id: number;
  readonly title: string;
  readonly imageUrl: string;
  readonly imageAlt: string;
  readonly ingredientsLabel: string;
  readonly metaLabel: string;
  readonly metaIcon: IconName;
  readonly favorite: boolean;
}
