// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req) {
  const apiUrl = process.env.API_URL;
  console.log('Fetching brands from', `${apiUrl}/cars/characteristics/brands`);
  try {
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
  } catch (error) {
    console.error('Error fetching brands:', error);
    return new Response(JSON.stringify({ data: 'failed' }), { status: 500 });
  }
}
