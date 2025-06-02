export async function GET() {
    const apiUrl = process.env.API_URL;
    const res = await fetch(`${apiUrl}/cars/characteristics/brands`);
    const data = await res.json();

    if (!data.success) {

        return Response.json({ data: 'failed'});
    }

    const values = data.data.map(({ make_display: label, make_id: value }) => ({
        value,
        label,
    }))

    return Response.json(values);
}

