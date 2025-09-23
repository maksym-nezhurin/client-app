export async function GET() {
    const apiUrl = process.env.CARQUERY_API_URL;
    const url = `${apiUrl}?cmd=getMakes`;
    console.log('Fetching brands from', url);
    const res = await fetch(url);
    const data = await res.json();

    if (!data) {
        return new Response(JSON.stringify({ data: 'failed' }), { status: 500 });
    }
    console.log('Fetched data:', data.Makes);

    const values = data.Makes.map(({ make_display: label, make_id: value }) => ({
        value,
        label,
    }));

    return new Response(JSON.stringify(values), {
        headers: { 'Content-Type': 'application/json' },
    });
}