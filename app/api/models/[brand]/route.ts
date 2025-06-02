import type { RequestHandlerContext } from 'next/server';

export async function GET(
    req,
    context: RequestHandlerContext<{ brand: string }>
) {
    const apiUrl = process.env.API_URL;
    const { brand } = context.params;
    const res = await fetch(`${apiUrl}/cars/characteristics/brands/${brand}/models`);
    const data = await res.json();

    if (!data.success) {

        return Response.json({ data: 'failed'});
    }

    const values = data.data.map(({ model_name }) => ({
        value: model_name,
        label: model_name,
    }))

    return Response.json(values);
}

