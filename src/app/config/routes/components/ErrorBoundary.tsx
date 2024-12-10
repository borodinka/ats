import React, { Component } from "react";

import { Alert, AlertTitle, Button, Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
  href?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  componentDidCatch(error: Error) {
    this.setState({ hasError: true, error });
  }
  componentDidUpdate(previousProps: Props) {
    if (previousProps.children !== this.props.children) {
      this.setState({ hasError: false, error: null });
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <Typography>
            {this.state.error?.message ?? "Please try again later"}
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Reload
          </Button>
        </Alert>
      );
    }
    return this.props.children;
  }
}
