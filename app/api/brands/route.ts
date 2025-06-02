// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req) {
  const apiUrl = process.env.API_URL;
  const res = await fetch(`${apiUrl}/cars/characteristics/brands`);
  const data = await res.json();

  if (!data.success) {
    return new Response(JSON.stringify({ data: 'failed' }), { status: 500 });
  }

  const values = data.data.map(({ make_display: label, make_id: value }) => ({
    value,
    label,
  }));

  return new Response(JSON.stringify(values), {
    headers: { 'Content-Type': 'application/json' },
  });
}
