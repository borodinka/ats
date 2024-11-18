import { FormInput } from ".";

interface FormFields {
  name: keyof FormInput;
  title: string;
  subtitle: string;
  placeholder: string;
  rules: { required: string };
}

export const FORM_FIELDS: FormFields[] = [
  {
    name: "description",
    title: "Description",
    subtitle:
      "Provide a detailed overview of the role, including its purpose, scope, and key objectives",
    placeholder: "job description",
    rules: { required: "Please specify job description" },
  },
  {
    name: "responsibilities",
    title: "Responsibilities",
    subtitle: "Outline the core responsibilities of the position",
    placeholder: "job responsibilities",
    rules: { required: "Please specify responsibilities" },
  },
  {
    name: "qualifications",
    title: "Who You Are",
    subtitle: "Add your preferred candidates qualifications",
    placeholder: "qualifications",
    rules: { required: "Please specify qualifications" },
  },
  {
    name: "niceToHaves",
    title: "Nice-To-Haves",
    subtitle:
      "Add nice-to-have skills and qualifications for the role to encourage a more diverse set of candidates to apply",
    placeholder: "nice-to-haves",
    rules: { required: "Please specify nice-to-haves" },
  },
];
