type idTypes = 'username' | 'password';

export interface FormField {
  id: idTypes;
  type: string;
  label: string;
  formOptions: {
    required?: string | boolean;
    minLength?: {
      value: number;
      message: string;
    };
  };
}