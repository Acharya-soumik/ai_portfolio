import { NextRequest, NextResponse } from "next/server";
import { LANGFLOW_CONFIG } from "../config";
import { LangflowClient } from "../utils";
/* eslint-disable  @typescript-eslint/no-explicit-any */

export async function POST(req: NextRequest) {
  try {
    // Log incoming request
    console.log("Incoming request body:", await req.text());

    // Clone the request since we've read it once
    const clonedReq = req.clone();
    const body = await clonedReq.json();
    console.log({ body });

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
    console.log({ client });

    const response = await client.initiateSession(
      LANGFLOW_CONFIG.FLOW_ID as string,
      LANGFLOW_CONFIG.LANGFLOW_ID as string,
      inputValue,
      inputType,
      outputType,
      stream,
      tweaks
    );
    console.log({ response });

    // Handle streaming response
    if (stream) {
      if (!response) {
        throw new Error("No streaming response received");
      }
      return NextResponse.json(response);
    }

    // Handle non-streaming response
    if (!response?.outputs) {
      throw new Error("Invalid response structure: missing outputs");
    }

    try {
      const output = response.outputs[0].outputs[0].outputs.message;
      return NextResponse.json({ message: output.message.text });
    } catch (parseError) {
      console.error("Error parsing response outputs:", parseError);
      // Return the complete response if we can't parse the expected structure
      return NextResponse.json({
        message: "Could not parse structured output",
        fullResponse: response,
      });
    }
  } catch (error: any) {
    console.error(
      "API route error:",
      { error },
      {
        name: error.name,
        message: error.message,
        stack: error.stack,
      }
    );

    // Check if the error is related to JSON parsing
    if ((error as any) && error.message.includes("JSON")) {
      return NextResponse.json(
        {
          error: "Invalid JSON response from LangFlow",
          details: error.message,
          // Include the raw response if available
          rawResponse: error.rawResponse,
        },
        { status: 422 }
      );
    }

    // Handle other types of errors
    return NextResponse.json(
      {
        error: "Failed to run flow",
        message: error.message,
        type: error.constructor.name,
      },
      { status: 500 }
    );
  }
}
