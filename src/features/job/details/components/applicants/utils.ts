import { httpsCallable } from "firebase/functions";
import { ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";

import {
  type Applicant,
  type FileUpload,
  type ResumeFile,
} from "@features/applicant/types";
import { selectUser } from "@features/auth/store/authSlice";
import useToast from "@hooks/useToast";
import { functions, storage } from "@services/firebase";
import { useAppSelector } from "@store/index";

import { ResumeExtraction } from "./types";

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

export const getStructuredDataFromPDF = async (
  text: string,
): Promise<ResumeExtraction | null> => {
  const extractStructuredDataFunction = httpsCallable(
    functions,
    "extractStructuredData",
  );
  const result = await extractStructuredDataFunction({ text });

  const structuredData = result.data as { data: ResumeExtraction };
  return structuredData.data;
};
