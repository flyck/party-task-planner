import { ReactNode } from "react";

export default function Scrollable({ children }: { children: ReactNode }) {
  return (<div className="flex flex-col h-72 overflow-y-auto">
    {children}
  </div>)
}
