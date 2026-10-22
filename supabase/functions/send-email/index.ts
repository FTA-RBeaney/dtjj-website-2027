const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY")!;

const SENDER_EMAIL = Deno.env.get("SENDER_EMAIL")!;

const corsHeaders = {

  "Access-Control-Allow-Origin": "*",

  "Access-Control-Allow-Headers":

    "authorization, x-client-info, apikey, content-type, x-retry-count, traceparent, tracestate, baggage",

  "Access-Control-Allow-Methods": "POST, OPTIONS",

};

Deno.serve(async (req) => {

  if (req.method === "OPTIONS") {

    return new Response("ok", { headers: corsHeaders });

  }

  const { to, subject, html } = await req.json();

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {

    method: "POST",

    headers: {

      "api-key": BREVO_API_KEY,

      "content-type": "application/json",

      accept: "application/json",

    },

    body: JSON.stringify({

      sender: { email: SENDER_EMAIL, name: "My App" },

      to: [{ email: to }],

      subject,

      htmlContent: html,

    }),

  });

  const data = await res.json();

  return Response.json(data, { status: res.status, headers: corsHeaders });

});
