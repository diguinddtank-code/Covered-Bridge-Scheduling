import { GoogleGenAI, Schema, Type } from "@google/genai";
import { MatchResult } from "../types";

const API_KEY = "AIzaSyArrRftYNITbDwRSs6HEzTVrnbepXlaw2Q";
const genAI = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    status: {
      type: Type.STRING,
      enum: ["success", "missing_info", "not_eligible", "location_unavailable"],
      description: "The outcome of the match logic."
    },
    identified_location: {
      type: Type.STRING,
      enum: ["Gainesville", "Euharlee", "Marietta", "Cumming"],
      nullable: true,
      description: "The location extracted from user input."
    },
    identified_age: {
      type: Type.NUMBER,
      nullable: true,
      description: "The age extracted from user input."
    },
    recommended_class_name: {
      type: Type.STRING,
      nullable: true,
      description: "The name of the class (e.g. Tiny Kickers) if found."
    },
    recommended_options: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of available time slots for the class."
    },
    reply_message_en: {
      type: Type.STRING,
      description: "A polite, objective response message to the user in English."
    },
    booking_action: {
      type: Type.STRING,
      enum: ["show_form"],
      nullable: true,
      description: "Set to 'show_form' ONLY if status is 'success'."
    },
    class_id: {
      type: Type.STRING,
      nullable: true,
      description: "The unique ID of the recommended class from the database."
    }
  },
  required: ["status", "recommended_options", "reply_message_en"]
};

const SYSTEM_INSTRUCTION = `
You are the "Class Matcher AI" for the Soccer Academy. Your function is to receive information about a child (age and location) and find the perfect class in our schedule.

**YOUR PERSONA:**
- You are objective, polite, and American.
- You do NOT invent times. Use ONLY the database below.

**DATABASE (SCHEDULE):**

1. LOCATION: GAINESVILLE (Allen Creek Soccer Complex)
   - "Tiny Kickers" (Ages 3-5): 
     * Tuesdays @ 5:00 PM (ID: gainesville_tiny_tue_5pm)
   - "Junior Academy" (Ages 6-9): 
     * Thursdays @ 6:00 PM (ID: gainesville_jr_thu_6pm)
   - "Pro Development" (Ages 10-13): 
     * Fridays @ 6:30 PM (ID: gainesville_pro_fri_630pm)

2. LOCATION: EUHARLEE (Joe Cowan Park)
   - "Tiny Kickers" (Ages 3-5): 
     * Saturdays @ 9:00 AM (ID: euharlee_tiny_sat_9am)
   - "Junior Academy" (Ages 6-9): 
     * Saturdays @ 10:00 AM (ID: euharlee_jr_sat_10am)
   - "Pro Development" (Ages 10-13): 
     * Mondays @ 6:00 PM (ID: euharlee_pro_mon_6pm)

3. LOCATION: MARIETTA (Outdoor Complex)
   - "Tiny Kickers" (Ages 3-5): 
     * Saturdays @ 9:00 AM (ID: marietta_tiny_sat_9am)
   - "Junior Academy" (Ages 6-9): 
     * Saturdays @ 10:30 AM (ID: marietta_jr_sat_1030am)
   - "Pro Development" (Ages 10-13): 
     * Tuesdays @ 6:00 PM (ID: marietta_pro_tue_6pm)

4. LOCATION: CUMMING (Central Park)
   - "Tiny Kickers" (Ages 3-5): 
     * Wednesdays @ 4:30 PM (ID: cumming_tiny_wed_430pm)
   - "Junior Academy" (Ages 6-9): 
     * Wednesdays @ 5:30 PM (ID: cumming_jr_wed_530pm)
   - "Pro Development" (Ages 10-13): 
     * Thursdays @ 6:30 PM (ID: cumming_pro_thu_630pm)

**LOGIC RULES:**
1. If the child is an age we do not serve (e.g., < 3 or > 13), return status "not_eligible".
2. If the user location is not in our list, return "location_unavailable".
3. If information is missing (e.g., user said age but not location), return status "missing_info".
4. If a match is found (status="success"):
   - Populate "recommended_class_name" and "recommended_options".
   - Set "booking_action" to "show_form".
   - Select the most appropriate "class_id" from the database list above.

**OUTPUT:**
You must return a valid JSON object matching the provided schema.
`;

export const matchClass = async (userInput: string): Promise<MatchResult> => {
  try {
    const model = "gemini-3-flash-preview";
    
    const response = await genAI.models.generateContent({
      model: model,
      contents: userInput,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as MatchResult;
    } else {
      throw new Error("Empty response from AI");
    }
  } catch (error) {
    console.error("Error matching class:", error);
    throw error;
  }
};