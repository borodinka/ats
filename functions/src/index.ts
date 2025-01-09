import * as functions from "firebase-functions";
import { OpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const ResumeExtractionSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  address: z.string().optional(),
  aboutMe: z.string().optional(),
  education: z.string(),
  phone: z.string(),
  yearsOfExperience: z.number().optional(),
  jobRole: z.string(),
});

type ResumeExtraction = z.infer<typeof ResumeExtractionSchema>;

interface ExtractStructuredDataRequest {
  text: string;
}

export const extractStructuredData = functions.https.onCall(
  { secrets: ["OPENAI_API_KEY"] },
  async (
    request: functions.https.CallableRequest<ExtractStructuredDataRequest>,
  ) => {
    try {
      const apiKey = process.env.OPENAI_API_KEY;

      if (!apiKey) {
        console.error("OPENAI_KEY environment variable is not set!");
        throw new functions.https.HttpsError(
          "internal",
          "OPENAI_KEY environment variable is not set!",
        );
      }

      const openai = new OpenAI({ apiKey });

      const { text } = request.data;

      if (!text) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          'Missing required field: "text"',
        );
      }

      const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
          {
            role: "system",
            content:
              "You are an expert at structured data extraction. You will receive unstructured text from a resume and format it according to the specified structure. Fields: fullName, email, phone, address, about me, education, yearsOfExperience, and jobRole. Return null or an empty string for missing fields.",
          },
          { role: "user", content: text },
        ],
        response_format: zodResponseFormat(
          ResumeExtractionSchema,
          "resume_extraction",
        ),
      });

      const extractedData: ResumeExtraction | null =
        completion.choices?.[0]?.message.parsed ?? null;

      return { data: extractedData };
    } catch (error) {
      console.error("Error in extractStructuredData:", error);
      throw new functions.https.HttpsError("internal", "An error occurred");
    }
  },
);
