export interface formItem {
  formControlName: string;
  type: string;
  placeholder: string;
  autocomplete?: string;
}

export const formEmailPassFields: formItem[] = [
  {
    formControlName: 'password',
    type: 'password',
    placeholder: 'Password',
    autocomplete: 'password',
  },
  {
    formControlName: 'email',
    type: 'email',
    placeholder: 'E-Mail',
    autocomplete: 'email',
  },
];

export const formNameFields: formItem[] = [
  {
    formControlName: 'firstName',
    type: 'string',
    placeholder: 'First Name',
  },
  {
    formControlName: 'lastName',
    type: 'string',
    placeholder: 'Last Name',
  },
];

export const formDisplayNameField: formItem = {
  formControlName: 'displayName',
  type: 'string',
  placeholder: 'Display Name',
};

export const formAddressFields: formItem[] = [
  {
    formControlName: 'country',
    type: 'text',
    placeholder: 'Land',
  },

  {
    formControlName: 'ort',
    type: 'text',
    placeholder: 'Ort',
  },
  {
    formControlName: 'plz',
    type: 'number',
    placeholder: 'PLZ',
  },
  { formControlName: 'streetName', type: 'text', placeholder: 'Straße...' },
  { formControlName: 'streetNumber', type: 'number', placeholder: 'Nummer' },
];

export const formNameFieldWithDisplayName = [
  formDisplayNameField,
  ...formNameFields,
];
