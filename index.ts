export type DayPart = "mañana" | "mediodía" | "tarde" | "atardecer";

export interface RouteStop {
  /** Stable id, also used as the localStorage key suffix */
  id: string;
  /** Position in the route, 1-indexed — this is a real sequence, so numbering it is meaningful */
  order: number;
  name: string;
  dayPart: DayPart;
  /** One-line hook, shown on the card front */
  summary: string;
  /** What exactly to look at / do here */
  whatToSee: string;
  /** Minutes recommended to spend at this stop */
  minutesHere: number;
  /** Practical, non-generic advice for this specific stop */
  tip: string;
  /** Whether this stop is optional / can be skipped if short on time */
  optional?: boolean;
  lat: number;
  lng: number;
  /** Distance in km to the NEXT stop (undefined for the last stop) */
  distanceToNextKm?: number;
  /** Estimated cycling minutes to the NEXT stop */
  bikeMinutesToNext?: number;
  /** Short note about the leg to the next stop — tram rails, busy street, etc. */
  legNote?: string;
}

export interface RouteMeta {
  title: string;
  tagline: string;
  totalKm: number;
  totalDurationLabel: string;
  difficulty: "Fácil" | "Moderada" | "Exigente";
}
