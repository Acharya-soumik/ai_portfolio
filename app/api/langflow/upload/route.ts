import { NextRequest, NextResponse } from "next/server";
import { LANGFLOW_CONFIG } from "../config";
import { LangflowClient } from "../utils";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert the file to base64 for processing
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64File = buffer.toString("base64");

    const client = new LangflowClient(
      LANGFLOW_CONFIG.BASE_URL,
      LANGFLOW_CONFIG.APPLICATION_TOKEN
    );

    // You might need to adjust this endpoint based on Langflow's file upload API
    const response = await client.post("/upload", {
      file: base64File,
      filename: file.name,
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload file", message: error.message },
      { status: 500 }
    );
  }
}
