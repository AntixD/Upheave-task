"use client";

import { atom } from "jotai";
import { Provider } from "jotai";
import { LABEL_ALL_ID } from "./constants";
import { Passenger } from "@/types";
import { atomWithStorage } from "jotai/utils";

export const selectedLabelsAtom = atom<string[]>([LABEL_ALL_ID]);

export const passengersAtom = atomWithStorage<Passenger[]>("Passengers", [
  {
    id: "Adult passenger 1",
    meals: [],
  },
  {
    id: "Adult passenger 2",
    meals: [],
  },
]);

export const selectedPassangerAtom = atom<string>("Adult passenger 1");

interface Props extends React.PropsWithChildren {}

export function JotaiProvider({ children }: Props) {
  return <Provider>{children}</Provider>;
}

export type { Props as JotaiProviderProps };
