'use client';

import { useState } from "react";
import Translate from "@/components/Translate";
import WaniKani from "@/components/WaniKani";
import Bunpro from "@/components/Bunpro";
import Typography from '@mui/material/Typography';
import TabContent from "./TabContent";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Box } from "@mui/material";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setActiveTab(newTab);
  }

  return (
    <> 
      <Typography className="text-center" variant="h4" component="h1" gutterBottom>
        Japanese Learning Dashboard
      </Typography>
      <div id="dashboard-container" className="w-full">
          <Box id="dashboard-tabs" className="flex items-center justify-around"> 
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Wani Kani"/>
                <Tab label="Bunpro" />
                <Tab label="Translate" />
              </Tabs>
          </Box>
          
          <div id="dashboard-content" className='mt-4'>
            <TabContent myIndex={0} activeIndex={activeTab}>
              <WaniKani />
            </TabContent>
            <TabContent myIndex={1} activeIndex={activeTab}>
              <Bunpro />
            </TabContent>
            <TabContent myIndex={2} activeIndex={activeTab}>
              <Translate />
            </TabContent>
          </div>
      </div>
    </>
  );

}