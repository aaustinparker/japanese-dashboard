'use client';

import { useState } from "react";
import Google from "@/components/Google";
import WaniKani from "@/components/WaniKani";
import Bunpro from "@/components/Bunpro";
import Jisho from "@/components/Jisho";
import Typography from '@mui/material/Typography';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"jisho" | "bunpro" | "wanikani" | "google">("wanikani");

  return (
    <> 
      <Typography variant="h4" component="h1" gutterBottom>
        Japanese Learning Dashboard
      </Typography>
      <div id="dashboard-container" className="w-full">
          <div id="dashboard-tabs" className="flex items-center justify-around">  
              <div className="flex-col"><button onClick={() => setActiveTab("wanikani")}>Wani Kani</button></div>
              <div className="flex-col"><button onClick={() => setActiveTab("bunpro")}>Bunpro</button></div>
              <div className="flex-col"><button onClick={() => setActiveTab("jisho")}>Jisho</button></div>
              <div className="flex-col"><button onClick={() => setActiveTab("google")}>Google Translate</button></div>
          </div>
          
          <div id="dashboard-content">
            <div style={{ display: activeTab === "wanikani" ? "block" : "none" }}>
              <WaniKani />
            </div>
            <div style={{ display: activeTab === "bunpro" ? "block" : "none" }}>
              <Bunpro />
            </div>
            <div style={{ display: activeTab === "jisho" ? "block" : "none" }}>
              <Jisho />
            </div>
            <div style={{ display: activeTab === "google" ? "block" : "none" }}>
              <Google />
            </div>
          </div>
      </div>

      <style jsx>{`
        #dashboard-content {
          margin-top: 20px;
        }
      `}</style>
    </>
  );

}