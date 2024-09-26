// lib/progressColorUtil.ts

type ProgressColor = "success" | "warning" | "danger";

export function getProgressColor(winRate: number): ProgressColor {
  if (winRate >= 55) {
    return "success";
  } else if (winRate >= 40) {
    return "warning";
  } else {
    return "danger";
  }
}