import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useLocation } from "react-router-dom";

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
import { useAppDispatch, useAppSelector } from "@store/index";

import { selectAuth, selectUser } from "../store/authSlice";
import { loginUser } from "../store/authThunk";

interface FormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const user = useAppSelector(selectUser);
  const auth = useAppSelector(selectAuth);
  const { handleSubmit, control, onSubmit } = useLoginForm();
  const location = useLocation();

  if (user) {
    // Send them back to the page they tried to visit when they were
    // redirected to the login page.
    // This means that when they get to the protected page and click the back button, they
    // won't end up back on the login page, which is also really nice for the
    // user experience.
    const from = location.state?.from?.pathname || AppRoutes.dashboard;
    return <Navigate to={from} replace />;
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%", mt: 3 }}
    >
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
        Login
      </AppButton>
      <Stack direction="row" spacing={1}>
        <Typography>Don't have an account?</Typography>
        <Link
          href={AppRoutes.signUp}
          variant="h5"
          sx={{ textDecoration: "none" }}
        >
          Sign Up
        </Link>
      </Stack>
    </Box>
  );
}

function useLoginForm() {
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(
      loginUser({
        email: data.email,
        password: data.password,
      }),
    );
  };

  return { handleSubmit, control, onSubmit };
}
