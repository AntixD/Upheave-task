"use client";

import type { Label } from "@prisma/client";

import { selectedLabelsAtom } from "@/lib/state";

import { useAtom } from "jotai";

import { LABEL_ALL_ID } from "@/lib/constants";
import LabelSelectorTag from "./LabelSelectorTag";

function LabelSelector({ labels }: { labels: Label[] }) {
  const [selectedLabels, setSelectedLabels] = useAtom(selectedLabelsAtom);

  function handleLabelClicked(labelId: string) {
    if (labelId === LABEL_ALL_ID) {
      setSelectedLabels([labelId]);
      return;
    }

    if (selectedLabels.includes(labelId)) {
      if (selectedLabels.length === 1) setSelectedLabels([LABEL_ALL_ID]);
      else setSelectedLabels(selectedLabels.filter((e) => e !== labelId));
    } else {
      setSelectedLabels([
        ...selectedLabels.filter((e) => e !== LABEL_ALL_ID),
        labelId,
      ]);
    }
  }

  return (
    <div className="flex flex-row gap-2">
      {labels.map((label) => {
        return (
          <LabelSelectorTag
            key={label.id}
            label={label}
            selectedLabels={selectedLabels}
            handleLabelClicked={handleLabelClicked}
          />
        );
      })}
    </div>
  );
}

export default LabelSelector;
