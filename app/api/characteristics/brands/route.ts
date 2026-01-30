export async function GET() {
    const apiUrl = process.env.CARQUERY_API_URL;
    if (!apiUrl) {
        return new Response(JSON.stringify({ message: 'CARQUERY_API_URL is not set' }), { status: 500 });
    }
    const url = `${apiUrl}?cmd=getMakes&year=2022`;
    const res = await fetch(url);
    if (!res.ok) {
        return new Response(JSON.stringify({ message: 'Failed to fetch brands' }), { status: 502 });
    }

    const data = await res.json();

    if (!data || !Array.isArray(data.Makes)) {
        return new Response(JSON.stringify([]), {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const values = data.Makes.map(({ make_display: label, make_id: value }) => ({
        value,
        label,
    }));

    return new Response(JSON.stringify(values), {
        headers: { 'Content-Type': 'application/json' },
    });
}