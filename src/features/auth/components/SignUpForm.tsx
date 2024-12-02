import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import {
  Box,
  FormControl,
  InputLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { AppRoutes } from "@config/routes";
import AppButton from "@features/ui/AppButton";
import { auth } from "@services/firebase";
import { useAppDispatch, useAppSelector } from "@store/index";

import { selectAuth, selectUser, setUserName } from "../store/authSlice";
import { registerUser } from "../store/authThunk";

interface FormInput {
  name: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
  const user = useAppSelector(selectUser);
  const auth = useAppSelector(selectAuth);
  const { handleSubmit, control, onSubmit } = useSignUpForm();

  if (user) {
    return <Navigate to={AppRoutes.dashboard} replace />;
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%", mt: 3 }}
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: "Please specify your full name" }}
        render={({ field, fieldState }) => (
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="name" shrink>
              Full name
            </InputLabel>
            <TextField
              required
              id="name"
              placeholder="Enter your full name"
              autoComplete="name"
              autoFocus
              helperText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
              sx={{ mt: 2 }}
              {...field}
            />
          </FormControl>
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{ required: "Please specify your email address" }}
        render={({ field, fieldState }) => (
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="email" shrink>
              Email Address
            </InputLabel>
            <TextField
              required
              id="email"
              placeholder="Enter email address"
              autoComplete="email"
              helperText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
              sx={{ mt: 2 }}
              {...field}
            />
          </FormControl>
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: "Please specify your password" }}
        render={({ field, fieldState }) => (
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="password" shrink>
              Password
            </InputLabel>
            <TextField
              required
              placeholder="Enter password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
              sx={{ mb: 3, mt: 2 }}
              {...field}
            />
          </FormControl>
        )}
      />
      <AppButton
        loading={auth.status === "loading"}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mb: 3 }}
      >
        Continue
      </AppButton>
      <Stack direction="row" spacing={1}>
        <Typography>Already have an account?</Typography>
        <Link
          href={AppRoutes.login}
          variant="h5"
          sx={{ textDecoration: "none" }}
        >
          Login
        </Link>
      </Stack>
    </Box>
  );
}

function useSignUpForm() {
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    await dispatch(
      registerUser({
        full_name: data.name,
        email: data.email,
        password: data.password,
      }),
    ).unwrap();
    dispatch(setUserName(auth.currentUser?.displayName));
  };

  return { handleSubmit, control, onSubmit };
}
