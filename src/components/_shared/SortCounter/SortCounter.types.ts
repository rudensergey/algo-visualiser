import { SUPPORTED_ALGORITMS } from "@templates/Sort/Sort.types";

export enum SORT_COUNTER {
  COUNTER = "counter",
}

export interface ISortCounterProps {
  counter: number;
  algorithm: SUPPORTED_ALGORITMS;
}

export const mapAlogrithm: Record<SUPPORTED_ALGORITMS, string> = {
  [SUPPORTED_ALGORITMS.BUBBLE]: "N2",
  [SUPPORTED_ALGORITMS.INSERTION]: "N2",
  [SUPPORTED_ALGORITMS.SELECTION]: "N2",
  [SUPPORTED_ALGORITMS.QUICK]: "NlogN",
  [SUPPORTED_ALGORITMS.MERGE]: "NlogN",
};
