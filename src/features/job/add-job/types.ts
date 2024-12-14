import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

export interface WizardStep {
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  Component: () => JSX.Element;
}
