import React from "react";

interface TabContentProps {
    children: React.ReactNode;
    myIndex: number;
    activeIndex: number;
}

export default function TabContent({ children, myIndex, activeIndex, ...other }: TabContentProps) {
  return (
    <div 
        role="tabpanel"
        hidden={myIndex !== activeIndex}
        {...other}
    >
        {children}
    </div>
  );
}