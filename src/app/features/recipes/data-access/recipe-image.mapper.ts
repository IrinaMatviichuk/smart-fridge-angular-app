import { RecipeImage } from '../domain/recipe-image.model';
import { RecipeImageDto } from './recipe-image.dto';

export const mapRecipeImageDto = (dto: RecipeImageDto | null): RecipeImage | null => {
  if (dto === null) {
    return null;
  }

  return {
    url: dto.url,
    unsplashUrl: dto.unsplash_url,
    photographerName: dto.photographer_name,
    photographerUrl: dto.photographer_url,
  };
};
