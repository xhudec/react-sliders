export type TRangeTuple = [number, number]

export interface IRangeMarker {
  value: number

  label?: string
}

export enum KeyCodes {
  pageUp = 33,
  pageDown = 34,
  end = 35,
  home = 36,
  left = 37,
  up = 38,
  right = 39,
  down = 40,
}
