import { NextRequest, NextResponse } from "next/server";
import { LANGFLOW_CONFIG } from "../config";
import { LangflowClient } from "../utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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
      LANGFLOW_CONFIG.BASE_URL,
      LANGFLOW_CONFIG.APPLICATION_TOKEN
    );

    const response = await client.initiateSession(
      LANGFLOW_CONFIG.FLOW_ID,
      LANGFLOW_CONFIG.LANGFLOW_ID,
      inputValue,
      inputType,
      outputType,
      stream,
      tweaks
    );

    if (!stream && response?.outputs) {
      const output = response.outputs[0].outputs[0].outputs.message;
      return NextResponse.json({ message: output.message.text });
    }

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to run flow", message: error.message },
      { status: 500 }
    );
  }
}
