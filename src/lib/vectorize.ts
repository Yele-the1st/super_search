import { hf } from "./huggingFace";
import { openai } from "./openai";

export const openaiVectorize = async (input: string): Promise<number[]> => {
  const embeddingResponse = await openai.embeddings.create({
    input,
    model: "text-embedding-ada-002",
  });

  const vector = embeddingResponse.data[0].embedding;

  return vector;
};

export const hfVectorize = async (input: string): Promise<number[]> => {
  const embeddingResponse = await hf.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: input,
  });

  // Check if embeddingResponse is a number or an array of numbers
  if (typeof embeddingResponse === "number") {
    // If it's a single number, convert it into a single-element array
    return [embeddingResponse];
  } else if (
    Array.isArray(embeddingResponse) &&
    embeddingResponse.length > 0 &&
    typeof embeddingResponse[0] === "number"
  ) {
    // If it's an array of numbers, return it directly
    return embeddingResponse as number[];
  } else {
    // If it's neither, throw an error or handle the case appropriately
    throw new Error("Invalid response from featureExtraction");
  }
};
