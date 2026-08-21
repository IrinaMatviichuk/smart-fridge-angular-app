import { IconName } from '../../../../core/icons/icon-name';
import { Product } from '../../../../entities/product/domain/product.model';
import { TipFrameModel } from '../../../../shared/ui/tip-frame/tip-frame.model';

export interface RecipeIngredientsSection {
  readonly storage: Product['storage'];
  readonly label: string;
  readonly products: readonly Product[];
}

export const mapProductsToIngredientSections = (
  products: readonly Product[],
): readonly RecipeIngredientsSection[] => {
  const sections = new Map<
    Product['storage'],
    {
      label: string;
      products: Product[];
    }
  >();

  for (const product of products) {
    const section = sections.get(product.storage);

    if (section) {
      section.products.push(product);

      continue;
    }

    sections.set(product.storage, {
      label: product.storageDisplay,
      products: [product],
    });
  }

  return Array.from(sections, ([storage, section]): RecipeIngredientsSection => ({
    storage,
    label: section.label,
    products: section.products,
  }));
};

export const mapRecipeSuggestionsErrorTip = (title: string, message: string): TipFrameModel => ({
  variant: 'error',
  icon: IconName.Warning,
  title,
  description: message,
});
