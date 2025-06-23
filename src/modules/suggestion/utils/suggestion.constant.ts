/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

export const SYSTEM_PROMPT = `
You generate personalized activity suggestions in structured JSON format.
Suggestions are based on user preferences, weather, nearby events, and the user's health data.
For each suggestion:
- Set "healthDataMatch" to true if the activity fits the user's health data (e.g. if the user needs more activity, relaxation, better sleep, etc.), otherwise set it to false.
- If "healthDataMatch" is true, provide up to 4 short comma-separated reasons in "healthDataMatchReason" (e.g. "Low activity today, High stress, Little sleep last night").
- If there is no match, set "healthDataMatchReason" to empty string.
`; // Health data im Systemprompt erwähnt

export const ANZAHL_VORSCHLAEGE = 10; // Anzahl der Vorschläge, die generiert werden sollen

function healthDataPromptBlock(healthData?: any): string {
    if (!healthData) return 'No recent health data available.';
    return `
Latest Health Data:
- Steps today: ${healthData.steps_today ?? 'n/a'}
- Avg steps (week): ${healthData.steps_week_average ?? 'n/a'}
- Activity minutes today: ${healthData.activity_minutes_today ?? 'n/a'}
- Activity minutes (week): ${healthData.activity_minutes_week_average ?? 'n/a'}
- Resting heart rate: ${healthData.resting_heart_rate ?? 'n/a'}
- Sleep last night: ${healthData.sleep_hours_last_night ?? 'n/a'}
- Sleep (week avg): ${healthData.sleep_hours_week_average ?? 'n/a'}
- Sleep quality: ${healthData.sleep_quality ?? 'n/a'}
- Calories burned today: ${healthData.calories_burned_today ?? 'n/a'}
- Last workout: ${healthData.workout_type_last ?? 'n/a'} (${healthData.workout_duration_last ?? 'n/a'} min)
- Workouts this week: ${healthData.workout_frequency_week ?? 'n/a'}
- Stress level: ${healthData.stress_level ?? 'n/a'}
- Weight: ${healthData.weight_kg ?? 'n/a'} kg
- BMI: ${healthData.bmi ?? 'n/a'}
- Blood pressure: ${healthData.blood_pressure?.systolic ?? 'n/a'}/${healthData.blood_pressure?.diastolic ?? 'n/a'}
- Active energy burned: ${healthData.active_energy_burned_today ?? 'n/a'} kcal
- Hydration: ${healthData.hydration_ml_today ?? 'n/a'} ml
- Mood today: ${healthData.mood_today ?? 'n/a'}
- Menstruation phase: ${healthData.menstruation_phase ?? 'n/a'}
  `.trim();
}

export const USERPROMPT = (context) => {
    // context.healthData ist ein ARRAY, die neuste ist [0]
    const latestHealthData = Array.isArray(context.healthData)
        ? context.healthData[0]
        : context.healthData;
    return `Generate ${ANZAHL_VORSCHLAEGE} personalized suggestions for a user in ${context.city} on ${context.date}.
Preferences:
- Vibes: ${context.preferences.selectedVibes.join(', ')}
- LifeVibes: ${context.preferences.selectedLifeVibes.join(', ')}
- Experience types: ${context.preferences.selectedExperienceTypes.join(', ')}
- Time windows: ${context.preferences.selectedTimeWindows.join(', ')}
- Group sizes: ${context.preferences.selectedGroupSizes.join(', ')}
- Budget: ${context.preferences.budget} €
- Max distance: ${context.preferences.distanceRadius} km

${healthDataPromptBlock(latestHealthData)}

Generate activities that match as many preferences **and** health needs as possible.`;
};
