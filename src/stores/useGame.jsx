import { create } from 'zustand'

const useGame = create((set) => ({
  phase: 'ready',
  setPhase: (newPhase) => set(() => ({ phase: newPhase })),
}))

export default useGame