import { useState, type ReactNode } from "react";
import { DEFAULT_DATE, SelectedDateContext } from "@/lib/selected-date";

export const SelectedDateProvider = ({ children }: { children: ReactNode }) => {
  const [date, setDate] = useState(DEFAULT_DATE);
  return <SelectedDateContext.Provider value={{ date, setDate }}>{children}</SelectedDateContext.Provider>;
};
