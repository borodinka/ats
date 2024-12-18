import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Box, Tab, Tabs } from "@mui/material";

import { FontFamilies } from "@config/styles/FontFamilies";
import { FontWeights } from "@config/styles/FontWeights";

import type { Job } from "../../../types";
import ApplicantsTab from "./ApplicantsTab";
import DetailsTab from "./DetailsTab";

interface Props {
  job: Job;
  onUpdate: (data: Partial<Job>) => void;
}

function CustomTabPanel({
  children,
  value,
  index,
}: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`job-tabpanel-${index}`}
      aria-labelledby={`job-tab-${index}`}
    >
      <Box
        sx={{
          pt: 1,
          overflowY: "scroll",
          minHeight: { xs: "50vh", md: "auto" },
          maxHeight: { xs: "50vh", md: "65vh" },
        }}
      >
        {children}
      </Box>
    </div>
  );
}

export default function JobTabs({ job, onUpdate }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(() => {
    const tabParam = searchParams.get("selectedTab");
    return tabParam !== null ? Number(tabParam) : 0;
  });

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("selectedTab", newValue.toString());
    setSearchParams(newSearchParams);
  };

  return (
    <Box sx={{ width: 1, mt: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="job info tabs"
          selectionFollowsFocus
        >
          <Tab
            label="Details"
            id={`job-tab-1`}
            sx={{
              textTransform: "none",
              fontFamily: FontFamilies.epilogue,
              fontWeight: FontWeights.semibold,
            }}
          />
          <Tab
            label="Applicants"
            id={`job-tab-2`}
            sx={{
              textTransform: "none",
              fontFamily: FontFamilies.epilogue,
              fontWeight: FontWeights.semibold,
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={selectedTab} index={0}>
        <DetailsTab job={job} onUpdate={onUpdate} />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={1}>
        <ApplicantsTab />
      </CustomTabPanel>
    </Box>
  );
}
