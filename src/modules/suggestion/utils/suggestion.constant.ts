/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
export const ANZAHL_VORSCHLAEGE = 10; // Anzahl der Vorschläge, die generiert werden sollen

export const USERPROMPT = (
    context,
) => `Generate ${ANZAHL_VORSCHLAEGE} personalized suggestions for a user in ${context.city} on ${context.date}.
Preferences:
- Vibes: ${context.preferences.selectedVibes.join(', ')}
- LifeVibes: ${context.preferences.selectedLifeVibes.join(', ')}
- Experience types: ${context.preferences.selectedExperienceTypes.join(', ')}
- Time windows: ${context.preferences.selectedTimeWindows.join(', ')}
- Group sizes: ${context.preferences.selectedGroupSizes.join(', ')}
- Budget: ${context.preferences.budget} €
- Max distance: ${context.preferences.distanceRadius} km

Generate activities that match as many preferences as possible.`;

export const SYSTEM_PROMPT = `You generate personalized activity suggestions in structured JSON format. Suggestions are based on user preferences, weather, and nearby events.`;
