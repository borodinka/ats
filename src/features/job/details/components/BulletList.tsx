import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { List, ListItem, ListItemIcon } from "@mui/material";

import { Colors } from "@config/styles";

import type { Job } from "../../types";

interface Props {
  items: Job["responsibilities"] | Job["qualifications"] | Job["niceToHaves"];
}

export default function BulletList({ items }: Props) {
  return (
    <List>
      {items.split("\n").map((item, index) => (
        <ListItem key={index} sx={{ pl: 0 }}>
          <ListItemIcon sx={{ minWidth: 0, pr: 1 }}>
            <CheckCircleOutlineOutlinedIcon sx={{ color: Colors.aquamarine }} />
          </ListItemIcon>
          {item}
        </ListItem>
      ))}
    </List>
  );
}
