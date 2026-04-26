export const config = {
  runtime: "edge",
};

const encoder = new TextEncoder();

function sseChunk(payload) {
  return encoder.encode(`data: ${JSON.stringify(payload)}\n\n`);
}

export default async function handler(request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const summaryLines = Array.isArray(body.summaryLines) ? body.summaryLines : [];
  const delayMs = Number(body.delayMs) > 0 ? Math.min(Number(body.delayMs), 1200) : 220;
  const fallbackLines = [
    "GridSense API stream initialized.",
    "No remote model output was provided, so the function is replaying the structured fallback summary.",
    "This still demonstrates incremental token delivery on Vercel rather than blocking on one long response.",
  ];

  const lines = summaryLines.length ? summaryLines : fallbackLines;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for (const line of lines) {
          controller.enqueue(sseChunk({ text: line }));
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
        controller.enqueue(sseChunk({ done: true }));
        controller.close();
      } catch (error) {
        controller.enqueue(
          sseChunk({
            error: error instanceof Error ? error.message : "Streaming failed",
          }),
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
