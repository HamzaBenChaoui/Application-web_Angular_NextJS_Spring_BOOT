export async function POST(req) {
  const data = await req.json();

  console.log("Received form data:", data);

  return new Response(JSON.stringify({ message: "Form received (mock)" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
