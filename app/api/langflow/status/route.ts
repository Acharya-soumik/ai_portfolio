import { NextResponse } from "next/server";
import { LANGFLOW_CONFIG } from "../config";
import { LangflowClient } from "../utils";

export async function GET() {
  try {
    const client = new LangflowClient(
      LANGFLOW_CONFIG.BASE_URL,
      LANGFLOW_CONFIG.APPLICATION_TOKEN
    );

    // You could implement a health check or status endpoint here
    const status = {
      status: "operational",
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get status", message: error.message },
      { status: 500 }
    );
  }
}
