/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
export const ANZAHL_VORSCHLAEGE = 10; // Anzahl der Vorschläge, die generiert werden sollen

export const USERPROMPT = (
    context,
) => `Generate ${ANZAHL_VORSCHLAEGE} personalized suggestions for a user in ${context.city} on ${context.date}.
Preferences:
- Vibes: ${context.preferences.data.selectedVibes.join(', ')}
- LifeVibes: ${context.preferences.data.selectedLifeVibes.join(', ')}
- Experience types: ${context.preferences.data.selectedExperienceTypes.join(', ')}
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
- Time windows: ${context.preferences.data.selectedTimeWindows.join(', ')}
- Group sizes: ${context.preferences.data.selectedGroupSizes.join(', ')}
- Budget: ${context.preferences.data.budget} €
- Max distance: ${context.preferences.data.distanceRadius} km

Generate activities that match as many preferences as possible.`;

export const SYSTEM_PROMPT = `You generate personalized activity suggestions in structured JSON format. Suggestions are based on user preferences, weather, and nearby events.`;
