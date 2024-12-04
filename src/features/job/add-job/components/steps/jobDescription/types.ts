import { FormInput } from ".";

export interface FormField {
  name: keyof FormInput;
  title: string;
  subtitle: string;
  placeholder: string;
  requireErrorText: string;
}
