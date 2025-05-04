import {genkitApi} from '@genkit-ai/next';
import '@/ai/dev'; // Ensure flows are loaded

export const {GET, POST} = genkitApi();
