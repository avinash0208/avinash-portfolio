import { create } from "zustand";

type LabStore = {
  selectedTechnique: string;
  setSelectedTechnique: (technique: string) => void;
};

export const useLabStore = create<LabStore>((set) => ({
  selectedTechnique: "SSR + CSR boundary",
  setSelectedTechnique: (selectedTechnique) => set({ selectedTechnique }),
}));
