import type { TextInputField } from "./types";

export const TEXT_INPUT_FIELDS: TextInputField[] = [
  {
    title: "Description",
    name: "description",
    requireErrorText: "job description",
    placeholder: "job description",
  },
  {
    title: "Responsibilities",
    name: "responsibilities",
    requireErrorText: "responsibilities",
    placeholder: "job responsibilities",
  },
  {
    title: "Who You Are",
    name: "qualifications",
    requireErrorText: "qualifications",
    placeholder: "qualifications",
  },
  {
    title: "Nice-To-Haves",
    name: "niceToHaves",
    requireErrorText: "nice-to-haves",
    placeholder: "nice-to-haves",
  },
];
