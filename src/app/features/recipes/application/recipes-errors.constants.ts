export const RECIPES_ERROR_MESSAGES = {
  products: {
    defaultMessage: 'Unable to load available ingredients.',
    connectionErrorMessage: 'Unable to connect to the server.',
  },

  generate: {
    defaultMessage: 'Unable to generate recipes.',
    connectionErrorMessage: 'Unable to connect to the server.',
  },

  saved: {
    defaultMessage: 'Unable to load saved recipes.',
    connectionErrorMessage: 'Unable to connect to the server.',
  },

  save: {
    defaultMessage: 'Unable to save recipe.',
    connectionErrorMessage: 'Unable to connect to the server.',
  },

  unsave: {
    defaultMessage: 'Unable to remove recipe from saved recipes.',
    connectionErrorMessage: 'Unable to connect to the server.',
  },
} as const;
