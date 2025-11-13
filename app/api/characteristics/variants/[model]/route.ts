function mpgToL100km(mpg: number): number {
  return +(235.214583 / parseInt(String(mpg))).toFixed(1); // округляємо до 1 знака
}

const convertCarItemInfo = (item) => {
    const {
        model_id,
        model_make_id,
        model_name,
        model_trim,
        model_year,
        model_body,
        model_engine_position,
        model_engine_cc,
        model_engine_cyl,
        model_engine_type,
        model_engine_valves_per_cyl,
        model_engine_power_ps,
        model_engine_power_rpm,
        model_engine_torque_nm,
        model_engine_torque_rpm,
        model_engine_bore_mm,
        model_engine_stroke_mm,
        model_engine_compression,
        model_engine_fuel,
        model_top_speed_kph,
        model_0_to_100_kph,
        model_drive,
        model_transmission_type,
        model_seats,
        model_doors,
        model_weight_kg,
        model_length_mm,
        model_width_mm,
        model_height_mm,
        model_wheelbase_mm,
        model_lkm_hwy,
        model_lkm_mixed,
        model_lkm_city,
        model_fuel_cap_l,
        model_sold_in_us,
        model_co2,
        model_make_display,
        make_display,
        make_country,
    } = item;

    return {
        id: model_id,
        makeId: model_make_id,
        name: model_name,
        trim: model_trim,
        year: model_year,
        body: model_body,
        enginePosition: model_engine_position,
        engineCc: model_engine_cc,
        engineCylinders: model_engine_cyl,
        engineType: model_engine_type,
        engineValvesPerCylinder: model_engine_valves_per_cyl,
        enginePowerPs: model_engine_power_ps,
        enginePowerRpm: model_engine_power_rpm,
        engineTorqueNm: model_engine_torque_nm,
        engineTorqueRpm: model_engine_torque_rpm,
        engineBoreMm: model_engine_bore_mm,
        engineStrokeMm: model_engine_stroke_mm,
        engineCompression: model_engine_compression,
        engineFuel: model_engine_fuel,
        topSpeedKph: model_top_speed_kph,
        zeroTo100Kph: model_0_to_100_kph,
        drive: model_drive,
        transmissionType: model_transmission_type,
        seats: model_seats,
        doors: model_doors,
        weightKg: model_weight_kg,
        lengthMm: model_length_mm,
        widthMm: model_width_mm,
        heightMm: model_height_mm,
        wheelbaseMm: model_wheelbase_mm,
        lkmHwy: mpgToL100km(model_lkm_hwy),
        lkmMixed: mpgToL100km(model_lkm_mixed),
        lkmCity: mpgToL100km(model_lkm_city),
        fuelCapL: model_fuel_cap_l,
        soldInUs: model_sold_in_us === '1',
        co2: model_co2,
        makeDisplay: model_make_display || make_display,
        makeCountry: make_country,
    }
};

const generateYearsFromRange = (from: number, to: number): number[] => {
    const years: number[] = [];
    for (let year = from; year <= to; year++) {
        years.push(year);
    }
    return years;
};

export async function GET(
    req,
    context,
) {
    const { model } = await context.params;
    const apiUrl = process.env.CARQUERY_API_URL;
    const url = `${apiUrl}?cmd=getTrims&model=${model}`;
    const reqUrl = new URL(req.url);
    const search = reqUrl.searchParams;
    const qFrom = search.get('from') || undefined;
    const qTo = search.get('to') || undefined;

    if (qFrom && qTo) {
        const years = generateYearsFromRange(parseInt(qFrom), parseInt(qTo));
        const results = [];

        for (const year of years) {
            try {
                const url = `https://www.carqueryapi.com/api/0.3/?cmd=getTrims&model=${model}&year=${year}`;
                const res = await fetch(url);
                const text = await res.text();
                const cleanText = text.replace(/^callback\(|\);?$/g, '');
                const data = JSON.parse(cleanText);

                console.log(`📅 ${year}: знайдено ${data.Trims.length} варіантів`);
                const preparedItems = data.Trims.map(convertCarItemInfo);
                results.push(...preparedItems);
            } catch (error) {
                console.error(`❌ Помилка при отриманні даних за ${year}:`, error);
                continue;
            }
        }

        return new Response(JSON.stringify(results), {
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        const res = await fetch(url);
        const data = await res.json();

        if (!data) {
            return new Response(JSON.stringify({ data: 'failed' }), { status: 500 });
        }


        const values = data.Trims.map(convertCarItemInfo);

        return new Response(JSON.stringify(values), {
            headers: { 'Content-Type': 'application/json' },
        });
    }
}