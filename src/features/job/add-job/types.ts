import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

export interface WizardSteps {
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  Component: () => JSX.Element;
}
