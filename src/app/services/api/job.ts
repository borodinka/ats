import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import type { Job } from "@features/job/types";
import { auth, firestore } from "@services/firebase";

import { authenticate } from "./utils";

export async function addJob(job: Job) {
  return authenticate(async () => {
    await setDoc(doc(firestore, "jobs", job.id), {
      ...job,
      userUid: auth.currentUser!.uid,
    });
  });
}

export async function getJobs() {
  return authenticate(async () => {
    const userJobsQuery = query(
      collection(firestore, "jobs"),
      where("userUid", "==", auth.currentUser!.uid),
    );

    const querySnapshot = await getDocs(userJobsQuery);

    return querySnapshot.docs.map((doc) => doc.data() as Job);
  });
}

export async function getJobById(jobId?: string) {
  return authenticate(async () => {
    if (!jobId) {
      throw new Error("Job not found");
    }

    const jobRef = doc(firestore, "jobs", jobId);
    const jobSnap = await getDoc(jobRef);

    if (!jobSnap.exists()) {
      throw new Error("Job not found");
    }

    return jobSnap.data() as Job;
  });
}

export async function updateJob(jobId: string, data: Partial<Job>) {
  return authenticate(async () => {
    const jobRef = doc(firestore, "jobs", jobId);
    await updateDoc(jobRef, data);

    return true;
  });
}

export async function deleteJob(jobId: string) {
  return authenticate(async () => {
    const jobRef = doc(firestore, "jobs", jobId);
    await deleteDoc(jobRef);

    return true;
  });
}
