import type { PersonaConfig } from "./types";
import { photographerConfig } from "./photographer";

// The registry. Add a persona = import its config and register here.
// The other 7 personas (mua, mehendi, cake, coach, designer, dj, architect)
// land in step 13 of the build sequence.
export const personas: Record<string, PersonaConfig> = {
  photographer: photographerConfig,
};

export type { PersonaConfig } from "./types";
export { photographerConfig };
