import { useSnackbar } from "notistack";

export default function useToast() {
  const { enqueueSnackbar } = useSnackbar();

  const showSuccessMessage = (message: string) => {
    enqueueSnackbar(message, {
      variant: "success",
    });
  };
  const showErrorMessage = (message: string) => {
    enqueueSnackbar(message, {
      variant: "error",
    });
  };

  return { showErrorMessage, showSuccessMessage };
}
