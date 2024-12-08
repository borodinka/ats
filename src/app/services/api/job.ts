import { doc, setDoc } from "firebase/firestore";

import type { Job } from "@features/job/types";
import { auth, firestore } from "@services/firebase";

export async function addJob(job: Job) {
  if (!auth.currentUser) {
    throw Error(
      "You need to be logged in to perform this action. Please log in or create an account to continue",
    );
  }

  await setDoc(doc(firestore, "jobs", job.id), {
    ...job,
    userUid: auth.currentUser.uid,
  });
}
