export const PRODUCT_FORM_DIALOG_TEXT = {
  create: {
    title: 'Add Product',
    subtitle: 'Add a new product to your inventory',
    submitLabel: 'Add Product',
  },
  edit: {
    title: 'Edit Product',
    subtitle: 'Update product information',
    submitLabel: 'Save Changes',
  },
} as const;

export const PRODUCT_FORM_VALIDATION_MESSAGES = {
  name: {
    required: 'Product name is required',
  },
  category: {
    required: 'Category is required',
  },
  storage: {
    required: 'Storage is required',
  },
  quantity: {
    required: 'Quantity is required',
  },
  expiryDate: {
    required: 'Expiry date is required',
  },
} as const;
