import type { Job } from "../../../../types";

export const RECRUITMENT_STAGES: Job["stages"] = [
  {
    id: "1",
    title: "Application Review",
    description:
      "Review candidates' resumes and application forms to assess qualifications, skills, and experience",
  },
  {
    id: "2",
    title: "Initial Screening",
    description:
      "A brief interview or phone call to gauge the candidate's interest, availability, and suitability for the role",
  },
  {
    id: "3",
    title: "Technical Interview",
    description:
      "Evaluate the candidate's technical knowledge and problem-solving abilities through coding tests, case studies, or technical questions",
  },
  {
    id: "4",
    title: "Portfolio Evaluation",
    description:
      "Review the candidate's portfolio (if applicable) to assess their previous work and suitability for the role",
  },
  {
    id: "5",
    title: "Task/Assessment",
    description:
      "Assign a task or problem relevant to the role to evaluate how the candidate handles real-world challenges",
  },
  {
    id: "6",
    title: "Behavioral Interview",
    description:
      "Assess how the candidate reacts to different situations by discussing their past experiences, work ethics, and behavioral traits",
  },
  {
    id: "7",
    title: "Team Interview",
    description:
      "Interview with the team to assess collaboration and communication skills, and determine how the candidate fits into the team dynamic",
  },
  {
    id: "8",
    title: "Final Interview",
    description:
      "A final interview to confirm the candidate's qualifications, clarify any remaining questions, and assess their fit within the company culture",
  },
  {
    id: "9",
    title: "Cultural Fit Assessment",
    description:
      "Evaluate whether the candidate aligns with the company's values, mission, and overall workplace culture",
  },
  {
    id: "10",
    title: "Offer Discussion",
    description:
      "Discuss job terms, salary expectations, and any other conditions of the job offer with the candidate",
  },
  {
    id: "11",
    title: "Background Check",
    description:
      "Verify the candidate's employment history, educational background, and check references to confirm their suitability for the role",
  },
  {
    id: "12",
    title: "Contract Signing",
    description:
      "Prepare and finalize the employment contract for the candidate, including all agreed-upon terms and conditions",
  },
];
