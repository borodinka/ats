import { enqueueSnackbar } from "notistack";

import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware, PayloadAction } from "@reduxjs/toolkit";

export const rtkQueryErrorLogger: Middleware =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  () => (next) => (action: PayloadAction | any) => {
    if (isRejectedWithValue(action) || "error" in action) {
      enqueueSnackbar(
        action.payload ?? action.error?.message ?? "Oops! Something went wrong",
        {
          variant: "error",
        },
      );
    }

    return next(action);
  };
