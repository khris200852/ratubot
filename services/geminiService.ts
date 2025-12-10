import { GoogleGenAI, Type, Schema } from "@google/genai";
import { MedicalCondition } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const medicalSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    titulo: {
      type: Type.STRING,
      description: "Nombre oficial de la condición médica o tema consultado.",
    },
    definicion: {
      type: Type.STRING,
      description: "Una definición clara, concisa y profesional de qué es la condición.",
    },
    sintomas: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista de los síntomas principales y comunes.",
    },
    tratamiento: {
      type: Type.STRING,
      description: "Resumen general de las opciones de tratamiento estándar.",
    },
  },
  required: ["titulo", "definicion", "sintomas", "tratamiento"],
};

export const fetchMedicalInfo = async (topic: string): Promise<MedicalCondition> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Eres un doctor experto. Proporciona información precisa sobre: "${topic}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: medicalSchema,
        systemInstruction: "Eres un asistente médico experto, empático y preciso. Tu objetivo es educar al paciente. No uses markdown en la respuesta JSON.",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response content received from Gemini.");
    }

    return JSON.parse(text) as MedicalCondition;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};