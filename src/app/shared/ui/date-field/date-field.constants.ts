import { MatDateFormats } from '@angular/material/core';

export const DATE_FIELD_LOCALE = 'en-US';

export const DATE_FIELD_FORMATS: MatDateFormats = {
  parse: {
    dateInput: null,
  },
  display: {
    dateInput: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
    monthYearLabel: {
      year: 'numeric',
      month: 'long',
    },
    dateA11yLabel: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    monthYearA11yLabel: {
      year: 'numeric',
      month: 'long',
    },
  },
};
