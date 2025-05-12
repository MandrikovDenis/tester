'use server';

/**
 * @fileOverview Suggests relevant test scenarios based on the input URL.
 *
 * - suggestTestScenarios - A function that suggests test scenarios.
 * - SuggestTestScenariosInput - The input type for the suggestTestScenarios function.
 * - SuggestTestScenariosOutput - The return type for the suggestTestScenarios function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SuggestTestScenariosInputSchema = z.object({
  url: z.string().url().describe('The URL of the website to test.'),
});
export type SuggestTestScenariosInput = z.infer<typeof SuggestTestScenariosInputSchema>;

const SuggestTestScenariosOutputSchema = z.object({
  scenarios: z.array(z.string()).describe('A list of suggested test scenarios.'),
});
export type SuggestTestScenariosOutput = z.infer<typeof SuggestTestScenariosOutputSchema>;

export async function suggestTestScenarios(input: SuggestTestScenariosInput): Promise<SuggestTestScenariosOutput> {
  return suggestTestScenariosFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTestScenariosPrompt',
  input: {
    schema: z.object({
      url: z.string().url().describe('The URL of the website to test.'),
    }),
  },
  output: {
    schema: z.object({
      scenarios: z.array(z.string()).describe('A list of suggested test scenarios.'),
    }),
  },
  prompt: `You are an AI assistant that suggests test scenarios for a given website URL.

  Based on the URL: {{{url}}},
  suggest a list of common test scenarios that should be performed.  Consider common web application functionality and potential vulnerabilities.
  Be as comprehensive as possible in your suggestions.
  Format each test scenario as a string in an array.
  `,
});

const suggestTestScenariosFlow = ai.defineFlow<
  typeof SuggestTestScenariosInputSchema,
  typeof SuggestTestScenariosOutputSchema
>({
  name: 'suggestTestScenariosFlow',
  inputSchema: SuggestTestScenariosInputSchema,
  outputSchema: SuggestTestScenariosOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
