"use client";

import { atom } from "jotai";
import { Provider } from "jotai";

import { LABEL_ALL_ID } from "./constants";

export const selectedLabelsAtom = atom<string[]>([LABEL_ALL_ID]);

interface Props extends React.PropsWithChildren {}

export function JotaiProvider({ children }: Props) {
  return <Provider>{children}</Provider>;
}

export type { Props as JotaiProviderProps };
