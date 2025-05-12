import { create } from 'zustand';

interface TestResult {
  scenario: string | null;
  passed: boolean;
  message: string | null;
  logs?: string[] | string | null; // Allow string or array for logs
  timestamp: string | null; // ISO string timestamp
}

interface AppState {
  url: string | null;
  selectedScenario: string | null;
  testResult: TestResult | null;
  isLoading: boolean; // Added loading state
  setUrl: (url: string) => void;
  setSelectedScenario: (scenario: string) => void;
  setTestResult: (result: TestResult | null) => void;
  setLoading: (loading: boolean) => void; // Action to set loading state
}

export const useStore = create<AppState>((set) => ({
  url: null,
  selectedScenario: null,
  testResult: null,
  isLoading: false, // Default loading state to false
  setUrl: (url) => set({ url }),
  setSelectedScenario: (scenario) => set({ selectedScenario: scenario }),
  setTestResult: (result) => set({ testResult: result }),
  setLoading: (loading) => set({ isLoading: loading }), // Implement setLoading action
}));
