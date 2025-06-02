import type { RequestHandlerContext } from 'next/server';

export async function GET(
    req,
    context: RequestHandlerContext<{ brand: string; model: string }>
) {
    const apiUrl = process.env.API_URL;
    const { model } = context.params;
    const res = await fetch(`${apiUrl}/cars/characteristics/models/${model}/variants`);
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

