import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

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

export async function getJobs() {
  if (!auth.currentUser) {
    throw Error(
      "You need to be logged in to perform this action. Please log in or create an account to continue",
    );
  }

  const userJobsQuery = query(
    collection(firestore, "jobs"),
    where("userUid", "==", auth.currentUser.uid),
  );

  const querySnapshot = await getDocs(userJobsQuery);

  return querySnapshot.docs.map((doc) => doc.data() as Job);
}

export async function getJobById(jobId?: string) {
  if (!auth.currentUser) {
    throw Error(
      "You need to be logged in to perform this action. Please log in or create an account to continue",
    );
  }

  if (!jobId) {
    throw new Error("Job not found");
  }

  const jobRef = doc(firestore, "jobs", jobId);
  const jobSnap = await getDoc(jobRef);

  if (!jobSnap.exists()) {
    throw new Error("Job not found");
  }

  return jobSnap.data() as Job;
}
