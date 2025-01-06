import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import type { Event } from "@features/calendar/types";
import { auth, firestore } from "@services/firebase";

import { authenticate } from "./utils";

export async function addEvent(event: Event) {
  return authenticate(async () => {
    await setDoc(doc(firestore, "events", event.id), {
      ...event,
      userUid: auth.currentUser!.uid,
    });
  });
}

export async function getEvents() {
  return authenticate(async () => {
    const userEventsQuery = query(
      collection(firestore, "events"),
      where("userUid", "==", auth.currentUser!.uid),
    );

    const querySnapshot = await getDocs(userEventsQuery);

    return querySnapshot.docs.map((doc) => doc.data() as Event);
  });
}

export async function updateEvent(eventId: string, data: Partial<Event>) {
  return authenticate(async () => {
    const eventRef = doc(firestore, "events", eventId);
    await updateDoc(eventRef, data);

    return true;
  });
}

export async function deleteEvent(eventId: string) {
  return authenticate(async () => {
    const eventRef = doc(firestore, "events", eventId);
    await deleteDoc(eventRef);

    return true;
  });
}
