import { createContext, useContext } from "react";

/** Year the app opens on until the user picks a date in the navbar calendar */
export const DEFAULT_YEAR = 2023;
export const DEFAULT_DATE = new Date(DEFAULT_YEAR, 8, 30); // Sep 30, as in the design

type SelectedDate = { date: Date; setDate: (date: Date) => void };

export const SelectedDateContext = createContext<SelectedDate>({ date: DEFAULT_DATE, setDate: () => {} });

/** The date picked in the navbar calendar; its year drives the year-based data hooks */
export const useSelectedDate = () => useContext(SelectedDateContext);
