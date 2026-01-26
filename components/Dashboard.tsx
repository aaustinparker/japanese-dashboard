'use client';

import { useState } from "react";
import GoogleTab from "@/components/tab/GoogleTab";
import WaniTab from "@/components/tab/WaniTab";
import BunproTab from "@/components/tab/BunproTab";
import JishoTab from "@/components/tab/JishoTab";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"jisho" | "bunpro" | "wanikani" | "google">("wanikani");
 
  const tabComponents = {
    jisho: JishoTab,
    bunpro: BunproTab,
    wanikani: WaniTab,
    google: GoogleTab
  };

  const ActiveTabComponent = tabComponents[activeTab];
  return (
    <div id="dashboard-container" className="w-full">
        <div id="tab-buttons" className="flex items-center justify-around">  
            <div className="flex-col"><button onClick={() => setActiveTab("wanikani")}>Wani Kani</button></div>
            <div className="flex-col"><button onClick={() => setActiveTab("bunpro")}>Bunpro</button></div>
            <div className="flex-col"><button onClick={() => setActiveTab("jisho")}>Jisho</button></div>
            <div className="flex-col"><button onClick={() => setActiveTab("google")}>Google Translate</button></div>
        </div>
        <br/>
        <ActiveTabComponent />
    </div>
  );

}