"use client";

import type { Label } from "@prisma/client";
import { twMerge } from "tailwind-merge";

function LabelSelectorTag({
  label,
  selectedLabels,
  handleLabelClicked,
}: {
  label: Label;
  selectedLabels: string[];
  handleLabelClicked: (labelId: string) => void;
}) {
  const isLabelSelected = (labelId: string) => selectedLabels.includes(labelId);
  return (
    <button
      onClick={() => handleLabelClicked(label.id)}
      className={twMerge(
        "py-2 px-4 rounded-full border border-gray-500",
        isLabelSelected(label.id) ? "border-indigo-500 bg-indigo-500/10" : ""
      )}
    >
      {label.label}
    </button>
  );
}

export default LabelSelectorTag;
