type TestResult = {
  status: string;
  logs: string[];
};

const testResults = new Map<string, TestResult>();

export function saveTestResult(id: string, result: TestResult) {
  testResults.set(id, result);
}

export function getTestResult(id: string): TestResult | null {
  return testResults.get(id) || null;
}
