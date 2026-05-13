export const prerender = false;
import type { APIRoute } from "astro";

const AIRTABLE_BASE = import.meta.env.AIRTABLE_BASE;
const AIRTABLE_TOKEN = import.meta.env.AIRTABLE_TOKEN;

const buildResult = (data: any) => ({
  id: data.id,
  name: data.fields?.candidate_name ?? null,
  jobTitle: data.fields?.job_title ?? null,
  applyDate: data.createdTime ?? null,
  status: data.fields?.["Application Status"] ?? null,
  candidateId: data.id,
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as { id?: string };
    const { id } = body;

    if (!id || typeof id !== "string") {
      return new Response(
        JSON.stringify({
          error: "Missing or invalid id",
          received: { id, type: typeof id },
        }),
        {
          status: 400,
        },
      );
    }

    if (!AIRTABLE_TOKEN) {
      return new Response(
        JSON.stringify({
          error: "Server misconfiguration: AIRTABLE_TOKEN missing",
        }),
        { status: 500 },
      );
    }

    if (!AIRTABLE_BASE) {
      return new Response(
        JSON.stringify({
          error: "Server misconfiguration: AIRTABLE_BASE missing",
        }),
        { status: 500 },
      );
    }
    if (id){
      console.log(`[API] Fetching application status for ID: ${id}`);
    }

    const recordUrl = `${AIRTABLE_BASE}Applications/${encodeURIComponent(id)}`;

    const response = await fetch(recordUrl, {
      method: "GET",
      headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
    });

    if (!response.ok) {
      console.error(`[Airtable API Error] Status: ${response.status} ${response.statusText}`);
      const detail = await response.text();
      if (response.status === 404) {
        return new Response(
          JSON.stringify({ error: "Application not found", detail }),
          { status: 404 },
        );
      }
      return new Response(
        JSON.stringify({ error: "Airtable request failed", detail }),
        { status: 502 },
      );
    }

    const data = await response.json();

    return new Response(JSON.stringify(buildResult(data)), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error("[API Error]", error);
    return new Response(
      JSON.stringify({
        error: "Invalid request body",
        details: error,
      }),
      {
        status: 400,
      },
    );
  }
};
