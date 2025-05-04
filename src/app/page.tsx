import { UrlInputForm } from '@/components/app/url-input-form';
import { ScenarioSelector } from '@/components/app/scenario-selector';
import { TestResultsDisplay } from '@/components/app/test-results-display';
import { AISuggestions } from '@/components/app/ai-suggestions';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-primary">
          WebTest Pilot
        </h1>
        <p className="text-muted-foreground mt-2">
          Automated Web Testing with AI-Powered Scenario Suggestions
        </p>
      </header>

      <div className="w-full max-w-4xl space-y-8">
        {/* URL Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>1. Enter Website URL</CardTitle>
            <CardDescription>Provide the URL of the website you want to test.</CardDescription>
          </CardHeader>
          <CardContent>
            <UrlInputForm />
          </CardContent>
        </Card>

        {/* AI Suggestions Section */}
         <Card>
          <CardHeader>
            <CardTitle>Need Inspiration? Get AI Suggestions</CardTitle>
             <CardDescription>Enter a URL above and click suggest to get AI-powered test scenario ideas.</CardDescription>
          </CardHeader>
          <CardContent>
            <AISuggestions />
          </CardContent>
        </Card>

        {/* Scenario Selection Section */}
        <Card>
          <CardHeader>
            <CardTitle>2. Select Test Scenario</CardTitle>
            <CardDescription>Choose the type of test you want to perform.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScenarioSelector />
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Test Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>3. Test Results</CardTitle>
            <CardDescription>View the outcome of the selected test scenario.</CardDescription>
          </CardHeader>
          <CardContent>
            <TestResultsDisplay />
          </CardContent>
        </Card>
      </div>

      <footer className="mt-12 text-center text-muted-foreground text-sm">
        Powered by Firebase Studio & Genkit AI
      </footer>
    </main>
  );
}
