import { Controller, type SubmitHandler, useForm } from "react-hook-form";

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

interface FormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
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
      <AppButton type="submit" fullWidth variant="contained" sx={{ mb: 3 }}>
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
