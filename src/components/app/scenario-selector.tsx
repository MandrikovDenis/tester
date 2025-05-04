"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { useStore } from '@/store/store'; // Import Zustand store
import { Loader2 } from "lucide-react"; // Import Loader icon

// Define more specific scenarios
const scenarios = [
  { id: "auth", label: "Login Authentication Test" },
  { id: "form_validation", label: "Form Input Validation" },
  { id: "link_check", label: "Broken Link Check" },
  { id: "responsive_design", label: "Responsive Design Test (Mobile View)" },
  { id: "performance_load", label: "Basic Page Load Performance" },
  // Add more relevant scenarios as needed
];

export function ScenarioSelector() {
  const { url, selectedScenario, setSelectedScenario, setTestResult, setLoading } = useStore(); // Get state and actions
  const [isRunning, setIsRunning] = React.useState(false);

  const handleRunTest = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL first.",
        variant: "destructive",
      });
      return;
    }
    if (!selectedScenario) {
      toast({
        title: "Error",
        description: "Please select a test scenario.",
        variant: "destructive",
      });
      return;
    }

    setIsRunning(true);
    setLoading(true); // Set loading state in store
    setTestResult(null); // Clear previous results

    toast({
      title: "Test Started",
      description: `Running "${scenarios.find(s => s.id === selectedScenario)?.label}" on ${url}`,
    });

    // --- Placeholder for actual test execution ---
    // Replace this with your actual call to the backend (FastAPI/Selenium)
    console.log(`Running test: ${selectedScenario} on ${url}`);
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate test duration

    // Simulate results (replace with actual results from backend)
    const success = Math.random() > 0.3; // Random success/fail
    const resultMessage = success
      ? `Test "${scenarios.find(s => s.id === selectedScenario)?.label}" passed successfully.`
      : `Test "${scenarios.find(s => s.id === selectedScenario)?.label}" failed. Check logs for details.`;
    const logs = success ? "All checks passed." : ["Error: Element 'login-button' not found.", "Timeout waiting for page load."];

    setTestResult({
      scenario: selectedScenario,
      passed: success,
      message: resultMessage,
      logs: logs, // Include simulated logs
      timestamp: new Date().toISOString(),
    });

    toast({
        title: success ? "Test Passed" : "Test Failed",
        description: resultMessage,
        variant: success ? "default" : "destructive",
     });
    // --- End Placeholder ---

    setIsRunning(false);
    setLoading(false); // Clear loading state in store
  };

  return (
    <div className="space-y-6">
      <RadioGroup
        value={selectedScenario ?? ""}
        onValueChange={setSelectedScenario} // Update selected scenario in store
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {scenarios.map((scenario) => (
          <div key={scenario.id} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-accent/50 transition-colors">
            <RadioGroupItem value={scenario.id} id={scenario.id} />
            <Label htmlFor={scenario.id} className="cursor-pointer flex-1">{scenario.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <Button
        onClick={handleRunTest}
        disabled={isRunning || !url || !selectedScenario}
        className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white"
        style={{ backgroundColor: '#008080' }} // Explicit Teal color for accent
      >
        {isRunning ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Running Test...
          </>
        ) : (
          "Run Selected Test"
        )}
      </Button>
    </div>
  );
}
