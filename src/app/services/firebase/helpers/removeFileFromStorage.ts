import { deleteObject, ref } from "firebase/storage";

import { storage } from "../firebase";

export async function removeFileFromStorage(storagePath?: string | null) {
  if (!storagePath) {
    return null;
  }

  const fileRef = ref(storage, storagePath);

  await deleteObject(fileRef);
}
