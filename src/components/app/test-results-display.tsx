"use client";

import * as React from "react";
import { CheckCircle, XCircle, Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStore } from '@/store/store'; // Import Zustand store
import { format } from 'date-fns'; // For formatting timestamp

export function TestResultsDisplay() {
  const { testResult, isLoading } = useStore(); // Get result and loading state

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2 text-muted-foreground p-6">
        <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
        <span>Running test, please wait...</span>
      </div>
    );
  }

  if (!testResult) {
    return (
      <div className="text-center text-muted-foreground p-6">
        <AlertCircle className="mx-auto h-8 w-8 mb-2" />
        No test results available. Run a test to see the outcome.
      </div>
    );
  }

  const { scenario, passed, message, logs, timestamp } = testResult;
  const formattedTimestamp = timestamp ? format(new Date(timestamp), "PPPppp") : 'N/A'; // Format date

  return (
    <Card className={`border-2 ${passed ? 'border-green-500' : 'border-destructive'}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">
          Test Result: {scenario?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Unknown Scenario'}
        </CardTitle>
        {passed ? (
          <CheckCircle className="h-6 w-6 text-green-500" />
        ) : (
          <XCircle className="h-6 w-6 text-destructive" />
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant={passed ? "default" : "destructive"} className={passed ? "bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300" : ""}>
          {passed ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          <AlertTitle>{passed ? "Passed" : "Failed"}</AlertTitle>
          <AlertDescription>
            {message || (passed ? "Test completed successfully." : "Test encountered errors.")}
          </AlertDescription>
        </Alert>

        {logs && logs.length > 0 && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="logs">
              <AccordionTrigger className="text-sm font-medium">View Logs ({logs.length})</AccordionTrigger>
              <AccordionContent>
                <ScrollArea className="h-40 w-full rounded-md border p-3 bg-muted/50">
                  <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                    {Array.isArray(logs) ? logs.join('\n') : logs}
                  </pre>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
       <CardFooter className="text-xs text-muted-foreground">
        Test completed on: {formattedTimestamp}
      </CardFooter>
    </Card>
  );
}
