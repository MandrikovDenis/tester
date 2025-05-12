"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Wand2, Lightbulb } from "lucide-react";
import { suggestTestScenarios } from "@/ai/flows/suggest-test-scenarios";
import { useToast } from "@/hooks/use-toast";
import { useStore } from '@/store/store'; // Import Zustand store
import { ScrollArea } from "@/components/ui/scroll-area";

export function AISuggestions() {
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();
  const { url, setSelectedScenario } = useStore(); // Get URL and scenario setter from store

  const handleSuggestScenarios = async () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a website URL first to get suggestions.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuggestions([]); // Clear previous suggestions

    try {
      const result = await suggestTestScenarios({ url });
      if (result && result.scenarios) {
        setSuggestions(result.scenarios);
        toast({
          title: "Suggestions Generated",
          description: `Found ${result.scenarios.length} potential test scenarios.`,
        });
      } else {
         setError("Received an empty or invalid response from the AI.");
         toast({
          title: "Error",
          description: "Failed to get suggestions. Invalid response.",
          variant: "destructive",
        });
      }
    } catch (err) {
       console.error("Error fetching suggestions:", err);
       const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
       setError(`Failed to fetch suggestions: ${errorMessage}`);
       toast({
         title: "Error Fetching Suggestions",
         description: errorMessage,
         variant: "destructive",
       });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to map suggestions to known scenario IDs if possible
  const mapSuggestionToScenarioId = (suggestion: string): string | null => {
      const lowerSuggestion = suggestion.toLowerCase();
      if (lowerSuggestion.includes("login") || lowerSuggestion.includes("auth")) return "auth";
      if (lowerSuggestion.includes("form") || lowerSuggestion.includes("input") || lowerSuggestion.includes("validation")) return "form_validation";
      if (lowerSuggestion.includes("link") || lowerSuggestion.includes("broken")) return "link_check";
      if (lowerSuggestion.includes("responsive") || lowerSuggestion.includes("mobile")) return "responsive_design";
      if (lowerSuggestion.includes("performance") || lowerSuggestion.includes("load")) return "performance_load";
      // Add more mappings as needed
      return null;
  }

  const handleSelectSuggestion = (suggestion: string) => {
      const scenarioId = mapSuggestionToScenarioId(suggestion);
      if (scenarioId) {
          setSelectedScenario(scenarioId);
          toast({
              title: "Scenario Selected",
              description: `Selected: ${suggestion}`,
          });
           // Optionally scroll to the scenario selector or results area
          const scenarioElement = document.getElementById(scenarioId);
          scenarioElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Check the radio button visually
          const radioElement = document.getElementById(scenarioId) as HTMLInputElement | null;
          if (radioElement) {
            radioElement.click(); // Simulate click to check radio
          }
      } else {
           toast({
              title: "Scenario Not Directly Mappable",
              description: "This suggestion doesn't directly map to a predefined test. You may need to configure a custom test.",
              variant: "default" // Use default variant for info
          });
      }

  }

  return (
    <div className="space-y-4">
      <Button
        onClick={handleSuggestScenarios}
        disabled={isLoading || !url}
        className="w-full md:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/80"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-4 w-4" />
            Suggest Test Scenarios
          </>
        )}
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {suggestions.length > 0 && (
         <div className="space-y-3">
            <h4 className="font-medium flex items-center"><Lightbulb className="mr-2 h-5 w-5 text-yellow-500"/>Suggested Scenarios:</h4>
             <ScrollArea className="h-48 w-full rounded-md border p-3 bg-muted/30">
                <ul className="space-y-2 list-disc list-inside">
                {suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm group">
                         <span className="text-muted-foreground">{suggestion}</span>
                        {mapSuggestionToScenarioId(suggestion) && (
                             <Button
                                variant="link"
                                size="sm"
                                className="ml-2 p-0 h-auto text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleSelectSuggestion(suggestion)}
                            >
                                Select this test
                            </Button>
                        )}
                    </li>
                ))}
                </ul>
            </ScrollArea>
         </div>
      )}
       {!isLoading && !error && suggestions.length === 0 && url && (
           <p className="text-sm text-muted-foreground pt-2">Click the button above to get AI-powered suggestions based on the URL.</p>
       )}
    </div>
  );
}
