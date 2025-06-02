import type { NextApiRequest } from 'next';

export async function GET(
    req: NextApiRequest,
    { params }: { params: { brand: string } }
) {
    const apiUrl = process.env.API_URL;
    const { model} = params;
    const res = await fetch(`${apiUrl}/cars/characteristics/models/${model}/variants`);
    const data = await res.json();

    if (!data.success) {
        return Response.json({ data: 'failed'});
    }
console.log('data', data);
    const values = data.data.map(({ model_name }) => ({
        value: model_name,
        label: model_name,
    }))

    return Response.json(values);
}

