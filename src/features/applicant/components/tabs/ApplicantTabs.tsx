import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Box, Tab, Tabs } from "@mui/material";

import { FontFamilies } from "@config/styles/FontFamilies";
import { FontWeights } from "@config/styles/FontWeights";

import type { Applicant } from "../../types";
import HiringProgress from "./HiringProgress";
import Profile from "./Profile";

interface Props {
  isJobView: boolean;
  applicant: Applicant;
  onUpdate: (data: Partial<Applicant>) => void;
  isLoading: boolean;
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
      id={`applicant-tabpanel-${index}`}
      aria-labelledby={`applicant-tab-${index}`}
    >
      <Box sx={{ p: 1, pt: 3 }}>{children}</Box>
    </div>
  );
}

export default function ApplicantTabs({
  isJobView,
  applicant,
  onUpdate,
  isLoading,
}: Props) {
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
    <Box sx={{ width: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="applicant info tabs"
          selectionFollowsFocus
        >
          <Tab
            label="Applicant Profile"
            id={`applicant-tab-1`}
            sx={{
              textTransform: "none",
              fontFamily: FontFamilies.epilogue,
              fontWeight: FontWeights.semibold,
            }}
          />
          {isJobView && (
            <Tab
              label="Hiring Progress"
              id={`applicant-tab-2`}
              sx={{
                textTransform: "none",
                fontFamily: FontFamilies.epilogue,
                fontWeight: FontWeights.semibold,
              }}
            />
          )}
        </Tabs>
      </Box>
      <CustomTabPanel value={selectedTab} index={0}>
        <Profile applicant={applicant} />
      </CustomTabPanel>
      {isJobView && (
        <CustomTabPanel value={selectedTab} index={1}>
          <HiringProgress
            stages={applicant.stages}
            currentStage={applicant.currentStage}
            onUpdate={onUpdate}
            isLoading={isLoading}
            status={applicant.status}
          />
        </CustomTabPanel>
      )}
    </Box>
  );
}
