import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { Applicant } from "@features/applicant/types";
import { auth, firestore } from "@services/firebase";

function authenticate<T>(authenticatedFn: () => Promise<T>) {
  if (!auth.currentUser) {
    throw Error(
      "You need to be logged in to perform this action. Please log in or create an account to continue",
    );
  }

  return authenticatedFn();
}

export async function addApplicant(applicant: Applicant) {
  return authenticate(async () => {
    await setDoc(doc(firestore, "applicants", applicant.id), {
      ...applicant,
      userUid: auth.currentUser!.uid,
    });
  });
}

export async function getApplicants() {
  return authenticate(async () => {
    const userApplicantsQuery = query(
      collection(firestore, "applicants"),
      where("userUid", "==", auth.currentUser!.uid),
    );

    const querySnapshot = await getDocs(userApplicantsQuery);

    return querySnapshot.docs.map((doc) => doc.data() as Applicant);
  });
}

export async function getApplicantsByJobId(jobId?: string) {
  return authenticate(async () => {
    if (!jobId) {
      throw new Error("Job not found");
    }

    const applicantsQuery = query(
      collection(firestore, "applicants"),
      where("jobId", "==", jobId),
      where("userUid", "==", auth.currentUser!.uid),
    );

    const querySnapshot = await getDocs(applicantsQuery);

    return querySnapshot.docs.map((doc) => doc.data() as Applicant);
  });
}

export async function getApplicantById(applicantId?: string) {
  return authenticate(async () => {
    if (!applicantId) {
      throw new Error("Applicant not found");
    }

    const applicantRef = doc(firestore, "applicants", applicantId);
    const applicantSnap = await getDoc(applicantRef);

    if (!applicantSnap.exists()) {
      throw new Error("Applicant not found");
    }

    return applicantSnap.data() as Applicant;
  });
}
