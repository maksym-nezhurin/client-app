export async function GET(
    _request: Request,
    context
) {
    const apiUrl = process.env.CARQUERY_API_URL;
    let url = `${apiUrl}?cmd=getMakes`;

    const { params } = await context.params;
    const parts = params || [];
    console.log('par', params);
    try {
        if (parts.length === 1) {
            const [brand] = parts;
            url = `${apiUrl}?cmd=getModels&make=${brand}`;
        }
        if (parts.length === 2) {
            const [brand, year] = parts;
            url = `${apiUrl}?cmd=getModels&make=${brand}&year=${year}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        const values = data.Models.map(({ model_name }) => ({
            value: model_name,
            label: model_name,
        }));

        return new Response(JSON.stringify(values), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log('e', error);
        return new Response(JSON.stringify({ error: error }), { status: 400 });
    }
}