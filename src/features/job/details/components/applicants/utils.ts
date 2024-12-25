import { ref, uploadBytesResumable } from "firebase/storage";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { useState } from "react";
import { z } from "zod";

import {
  type Applicant,
  type FileUpload,
  type ResumeFile,
} from "@features/applicant/types";
import { selectUser } from "@features/auth/store/authSlice";
import useToast from "@hooks/useToast";
import { storage } from "@services/firebase";
import { useAppSelector } from "@store/index";

import type { ResumeExtraction } from "./types";

export function useResumeUpload() {
  const [state, setState] = useState<{
    uploadProgress: number | undefined;
    uploadedFile: ResumeFile | null;
  }>({ uploadProgress: 0, uploadedFile: null });

  const user = useAppSelector(selectUser);
  const { showErrorMessage } = useToast();

  const uploadResume = async (
    file: FileUpload,
    jobRole: Applicant["jobRole"],
  ): Promise<ResumeFile | null> => {
    if (!file?.file) {
      return null;
    }

    const formattedJobRole = jobRole
      ? `${jobRole.replace(/\s+/g, "_").toLowerCase()}/`
      : "";
    const path = `applicants-data/${user?.uid}/`;
    const storageRef = ref(
      storage,
      `${path}${formattedJobRole}/${file.fileName}`,
    );
    const uploadTask = uploadBytesResumable(storageRef, file.file);

    return new Promise((resolve) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setState((prevState) => ({ ...prevState, uploadProgress: progress }));
        },
        (error) => {
          showErrorMessage(`Oops! Something went wrong: ${error.message}`);
          setState((prevState) => ({
            ...prevState,
            uploadProgress: undefined,
          }));
          resolve(null);
        },
        async () => {
          const storagePath = uploadTask.snapshot.ref.fullPath;
          setState((prevState) => ({
            ...prevState,
            uploadProgress: undefined,
          }));
          resolve({ fileName: file.fileName, storagePath });
        },
      );
    });
  };

  return { ...state, uploadResume };
}

export const extractTextFromPDF = async (file: File): Promise<string> => {
  const { GlobalWorkerOptions, getDocument } = await import("pdfjs-dist");
  GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.9.155/pdf.worker.min.mjs`;

  const pdf = await getDocument(await file.arrayBuffer()).promise;
  if (pdf.numPages === 0) return "";

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");
  }

  return text;
};

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const ResumeExtractionSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  address: z.string(),
  aboutMe: z.string(),
  education: z.string(),
  phone: z.string(),
  yearsOfExperience: z.number(),
  jobRole: z.string(),
});

export const getStructuredDataFromPDF = async (
  text: string,
): Promise<ResumeExtraction | null> => {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
      {
        role: "system",
        content:
          "You are an expert at structured data extraction. You will receive unstructured text from a resume and format it according to the specified structure. Fields: fullName, email, phone, address, about me, education, yearsOfExperience, and jobRole. Return null or an empty string for missing fields.",
      },
      { role: "user", content: text },
    ],
    response_format: zodResponseFormat(
      ResumeExtractionSchema,
      "resume_extraction",
    ),
  });

  return completion.choices[0]?.message.parsed ?? null;
};
