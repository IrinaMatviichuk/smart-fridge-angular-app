export const DASHBOARD_PRODUCT_ERROR_MESSAGES = {
  load: {
    defaultMessage: 'Unable to load products.',
    connectionErrorMessage: 'Unable to connect to the server.',
    statusMessages: {
      401: 'Your session has expired. Please log in again.',
      403: 'You do not have permission to view these products.',
      500: 'Something went wrong on the server.',
    },
  },

  create: {
    defaultMessage: 'Unable to add product.',
    connectionErrorMessage: 'Unable to connect to the server.',
  },

  update: {
    defaultMessage: 'Unable to update product.',
    connectionErrorMessage: 'Unable to connect to the server.',
  },

  delete: {
    defaultMessage: 'Unable to delete product.',
    connectionErrorMessage: 'Unable to connect to the server.',
  },
} as const;
