import { GoogleGenAI, Type } from "@google/genai";
import { AIProjectSuggestion } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateProjectDetails = async (rawInput: string): Promise<AIProjectSuggestion> => {
  if (!apiKey) {
    throw new Error("API Key tidak ditemukan. Pastikan process.env.API_KEY telah diatur.");
  }

  const model = "gemini-2.5-flash";
  
  const prompt = `
    Saya ingin menambahkan project ke portofolio saya.
    Berdasarkan catatan kasar berikut: "${rawInput}".
    
    Tolong buatkan:
    1. Judul yang menarik dan profesional.
    2. Deskripsi yang persuasif (maksimal 200 karakter).
    3. Kategori yang sesuai (Pilih salah satu: Web Dev, Mobile App, UI/UX Design, Writing, Lainnya).
    4. 3-4 teknologi atau skill tags yang relevan.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            category: { type: Type.STRING },
            tags: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "description", "category", "tags"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("Tidak ada respon dari AI.");
    
    return JSON.parse(jsonText) as AIProjectSuggestion;

  } catch (error) {
    console.error("Error generating project details:", error);
    throw error;
  }
};
