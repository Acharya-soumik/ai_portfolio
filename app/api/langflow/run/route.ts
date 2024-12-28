import { NextRequest, NextResponse } from "next/server";
import { LANGFLOW_CONFIG } from "../config";
import { LangflowClient } from "../utils";
/* eslint-disable  @typescript-eslint/no-explicit-any */

export async function POST(req: NextRequest) {
  try {
    // Parse incoming request body
    const body = await req.json().catch(() => {
      throw new Error("Invalid JSON in request body");
    });

    console.log("Parsed request body:", body);

    const {
      inputValue,
      inputType = "chat",
      outputType = "chat",
      stream = false,
    } = body;

    if (!inputValue) {
      return NextResponse.json(
        { error: "Input value is required" },
        { status: 400 }
      );
    }

    const tweaks = {
      "ChatInput-FUDQr": {},
      "ParseData-7bfYv": {},
      "Prompt-2F22V": {},
      "SplitText-dJugu": {},
      "ChatOutput-GmQL7": {},
      "AstraDB-OsHxM": {},
      "OpenAIEmbeddings-MsbPA": {},
      "AstraDB-Oo2kH": {},
      "OpenAIEmbeddings-ZzCRB": {},
      "File-XtC5K": {},
      "GroqModel-KShUl": {},
    };

    const client = new LangflowClient(
      LANGFLOW_CONFIG.BASE_URL as string,
      LANGFLOW_CONFIG.APPLICATION_TOKEN as string
    );
    console.log("Langflow Client Initialized:", { client });

    const response = await client.initiateSession(
      LANGFLOW_CONFIG.FLOW_ID as string,
      LANGFLOW_CONFIG.LANGFLOW_ID as string,
      inputValue,
      inputType,
      outputType,
      stream,
      tweaks
    );

    console.log("Langflow Response:", { response });

    if (!response) {
      throw new Error("No response received from Langflow");
    }

    if (stream) {
      return NextResponse.json(response);
    }

    if (!response.outputs || response.outputs.length === 0) {
      throw new Error("Invalid response structure: missing outputs");
    }

    // Safely parse the response outputs
    try {
      const output = response.outputs[0]?.outputs[0]?.outputs?.message;
      if (!output?.message?.text) {
        throw new Error("Malformed output structure");
      }
      return NextResponse.json({ message: output.message.text });
    } catch (parseError) {
      console.error("Error parsing response outputs:", parseError);
      return NextResponse.json({
        message: "Could not parse structured output",
        fullResponse: response,
      });
    }
  } catch (error: any) {
    console.error("API route error:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    const isJsonError = error.message?.includes("JSON");

    return NextResponse.json(
      {
        error: isJsonError
          ? "Invalid JSON response from Langflow"
          : "Failed to run flow",
        message: error.message,
        type: error.constructor.name,
        ...(isJsonError && { details: error.rawResponse }),
      },
      { status: isJsonError ? 422 : 500 }
    );
  }
}
