export type PrayerId = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";

export type Prayer = {
  id: PrayerId;
  name: string;
  subtitle: string;
  done: boolean;
  journal: string;
};

export type Narration = {
  id: string;
  label: string;
  quote: string;
  ref: string;
  body: string;
};

export type TrainingModule = {
  id: string;
  title: string;
  description: string;
  chip: string;
  chipTone: "gold" | "emerald";
  level: string;
  duration: string;
};

export type WorkoutStep = {
  id: string;
  title: string;
  detail: string;
  done: boolean;
};

export const mockPreparation = {
  percent: 78,
  status: "ON TRACK",
  caption: "Daily Goals",
  state: "Prepared",
};

/** @deprecated Use mockPreparation */
export const mockReadiness = mockPreparation;

export const mockCommandment = {
  label: "Daily Commandment",
  quote: "Prepare for that which is coming by refining that which is within.",
  ref: "Kitab al-Ghaybah — Nu'mani",
};

export const mockPillars = {
  physical: { label: "Physical", metric: "85% STRENGTH", value: 85 },
  intellect: { label: "Intellect", metric: "62% DEPTH", value: 62 },
  spiritual: {
    label: "Spiritual Awareness",
    subtitle: "Muhasaba completed: 14 Days",
    score: 91,
  },
};

export const mockWeeklyLoad = {
  percent: 84,
  label: "OPTIMAL",
  days: [
    { day: "MON", height: 40, highlight: false as const },
    { day: "TUE", height: 65, highlight: false as const },
    { day: "WED", height: 90, highlight: "primary" as const },
    { day: "THU", height: 50, highlight: false as const },
    { day: "FRI", height: 75, highlight: false as const },
    { day: "SAT", height: 100, highlight: "secondary" as const },
    { day: "SUN", height: 30, highlight: false as const },
  ],
};

export const mockTrainingModules: TrainingModule[] = [
  {
    id: "endurance",
    title: "Companion Endurance",
    description:
      "Long-duration metabolic conditioning to sustain focus under physical fatigue.",
    chip: "ENDURANCE",
    chipTone: "gold",
    level: "LVL 04",
    duration: "45 MINS",
  },
  {
    id: "agility",
    title: "Functional Agility",
    description:
      "Multi-planar movement and reactive drills for immediate tactical response.",
    chip: "AGILITY",
    chipTone: "emerald",
    level: "LVL 07",
    duration: "30 MINS",
  },
];

export const mockStillness = {
  title: "The Stillness of Action",
  quote: "Strength is not in the struggle, but in the readiness to struggle.",
};

export const mockPrayers: Prayer[] = [
  {
    id: "fajr",
    name: "FAJR",
    subtitle: "Pre-Dawn Connection",
    done: false,
    journal: "",
  },
  {
    id: "dhuhr",
    name: "DHUHR",
    subtitle: "Mid-Day Resilience",
    done: true,
    journal: "Work thoughts pulled at the ruku.",
  },
  {
    id: "asr",
    name: "ASR",
    subtitle: "Afternoon Steadiness",
    done: true,
    journal: "",
  },
  {
    id: "maghrib",
    name: "MAGHRIB",
    subtitle: "Evening Threshold",
    done: false,
    journal: "",
  },
  {
    id: "isha",
    name: "ISHA",
    subtitle: "Night Seal",
    done: false,
    journal: "",
  },
];

export const mockSpiritual = {
  hijriDate: "14th Rabi' al-Thani",
  readyIndex: 88,
  readyBlurb:
    "Your spiritual alertness is elevated. Discipline in Fajr and Nightly Reflection has improved by 12%.",
  prompt:
    "If you found yourself at the threshold of the Final Moment this evening, what is the one act of service you would regret leaving undone?",
  reading: "45 / 60 min",
  journaling: "Completed",
};

export const mockAudit = {
  weekOf: "Week of 8 Rabi' al-Thani",
  diagnostic:
    "Distraction clusters around mid-day prayers, often after prolonged screen work. The heart arrives tired, not rebellious.",
  remedy:
    "Before Dhuhr, wash with intention and sit two minutes in silence facing Qibla. Leave the phone in another room. Recite a short salawat before Takbir.",
  prescription:
    "From Sahifa al-Sajjadiyya — Du'a for Morning and Evening: seek steadiness of the heart and protection from heedlessness. Pair with 100× Astaghfirullah after Maghrib.",
};

export const mockNarrations: Narration[] = [
  {
    id: "ghaybah-01",
    label: "Daily Commandment",
    quote: "Prepare for that which is coming by refining that which is within.",
    ref: "Kitab al-Ghaybah — Nu'mani",
    body: "The companions of the Qa'im are not forged in spectacle but in quiet discipline. Patience during occultation is an active craft: purify intention, strengthen the body, and keep the heart awake for the call.",
  },
  {
    id: "ghaybah-02",
    label: "Firmness in Occultation",
    quote:
      "Blessed are those who remain steadfast upon their faith in the time of the occultation of their Imam.",
    ref: "Kitab al-Ghaybah — Tusi",
    body: "Steadfastness is not stillness alone. It is returning to prayer when distraction wins, returning to community when isolation tempts, and returning to hope when the wait feels long.",
  },
  {
    id: "ghaybah-03",
    label: "Community Resilience",
    quote:
      "The believer in the time of occultation is like one who keeps vigil with a lamp that must not go out.",
    ref: "Kitab al-Ghaybah — Nu'mani",
    body: "Your lamp is guarded by salah, knowledge, and mutual care. Tend it daily. The night is long, but the dawn belongs to those who did not abandon their post.",
  },
];

export const mockWorkoutSteps: WorkoutStep[] = [
  {
    id: "w1",
    title: "Breath & mobility openers",
    detail: "5 min — hips, thoracic spine, ankles",
    done: false,
  },
  {
    id: "w2",
    title: "Core brace series",
    detail: "3 rounds — dead bug, side plank, bird dog",
    done: false,
  },
  {
    id: "w3",
    title: "Loaded carry",
    detail: "4 × 40m farmer carry or backpack walk",
    done: false,
  },
  {
    id: "w4",
    title: "Zone 2 endurance",
    detail: "20 min brisk walk or easy jog",
    done: false,
  },
  {
    id: "w5",
    title: "Cool-down stillness",
    detail: "3 min seated breath, intention for service",
    done: false,
  },
];

/** Mock flag: show questionnaire entry on Physical when true */
export const mockFirstRunQuestionnaire = true;

export function getNarration(id: string) {
  return mockNarrations.find((n) => n.id === id);
}
