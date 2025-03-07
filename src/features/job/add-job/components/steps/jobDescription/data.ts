import type { FormField } from "./types";

export const FORM_FIELDS: FormField[] = [
  {
    name: "description",
    title: "Description",
    subtitle:
      "Provide a detailed overview of the role, including its purpose, scope, and key objectives",
    placeholder: "job description",
    requireErrorText: "job description",
  },
  {
    name: "responsibilities",
    title: "Responsibilities",
    subtitle: "Outline the core responsibilities of the position",
    placeholder: "job responsibilities",
    requireErrorText: "responsibilities",
  },
  {
    name: "qualifications",
    title: "Who You Are",
    subtitle: "Add your preferred candidates qualifications",
    placeholder: "qualifications",
    requireErrorText: "qualifications",
  },
  {
    name: "niceToHaves",
    title: "Nice-To-Haves",
    subtitle:
      "Add nice-to-have skills and qualifications for the role to encourage a more diverse set of candidates to apply",
    placeholder: "nice-to-haves",
    requireErrorText: "nice-to-haves",
  },
];
