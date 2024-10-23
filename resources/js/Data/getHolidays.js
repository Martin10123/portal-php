const getEasterDate = (year) => {
    var f = Math.floor,
        G = year % 19,
        C = f(year / 100),
        H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
        I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
        J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
        L = I - J,
        month = 3 + f((L + 40) / 44),
        day = L + 28 - 31 * f(month / 4);

    return new Date(year, month - 1, day);
};

const getHolyWeek = (year) => {
    let easter = getEasterDate(year);
    let holyWeek = [];
    for (let i = -3; i <= 3; i++) {
        let date = new Date(easter);
        date.setDate(easter.getDate() + i);
        holyWeek.push(date);
    }
    return holyWeek;
};

const getAdditionalHolidays = (year) => {
    let easter = getEasterDate(year);
    return [
        new Date(easter.getTime() + 39 * 24 * 60 * 60 * 1000), // Ascensión del Señor (40 días después de Pascua)
        new Date(easter.getTime() + 59 * 24 * 60 * 60 * 1000), // Corpus Christi (60 días después de Pascua)
        new Date(easter.getTime() + 67 * 24 * 60 * 60 * 1000), // Sagrado Corazón (68 días después de Pascua)
    ];
};

const getFixedHolidays = (year) => {
    return [
        new Date(year, 0, 1), // Año Nuevo
        new Date(year, 4, 1), // Día del Trabajo
        new Date(year, 6, 20), // Día de la Independencia
        new Date(year, 7, 7), // Batalla de Boyacá
        new Date(year, 11, 8), // Inmaculada Concepción
        new Date(year, 11, 24), // Nochebuena
        new Date(year, 11, 25), // Navidad
        new Date(year, 11, 31), // Nochevieja
    ];
};

const getManualHolidays = (year) => {
    return [
        new Date(year, 0, 1), // 1900-01-01 -> Año Nuevo (asumido como Año Nuevo para el año actual)
        new Date(year, 0, 6), // 2014-01-06 -> Epifanía del Señor
        new Date(year, 2, 24), // 2014-03-24 -> Festivo
        new Date(year, 3, 18), // 2014-04-18 -> Viernes Santo
        new Date(year, 4, 1), // 2014-05-01 -> Día del Trabajo
        new Date(year, 5, 2), // 2014-06-02 -> Festivo
        new Date(year, 5, 23), // 2014-06-23 -> Festivo
        new Date(year, 5, 30), // 2014-06-30 -> Festivo
        new Date(year, 7, 7), // 2014-08-07 -> Festivo
        new Date(year, 7, 18), // 2014-08-18 -> Festivo
        new Date(year, 9, 13), // 2014-10-13 -> Festivo
        new Date(year, 10, 3), // 2014-11-03 -> Festivo
        new Date(year, 10, 17), // 2014-11-17 -> Festivo
        new Date(year, 11, 8), // 2014-12-08 -> Inmaculada Concepción
        new Date(year, 11, 25), // 2014-12-25 -> Navidad
        new Date(year, 0, 1), // 2015-01-01 -> Año Nuevo
        new Date(year, 0, 12), // 2015-01-12 -> Día de la Inmaculada Concepción
        new Date(year, 2, 23), // 2015-03-23 -> Festivo
        new Date(year, 3, 2), // 2015-04-02 -> Semana Santa
        new Date(year, 3, 3), // 2015-04-03 -> Semana Santa
        new Date(year, 4, 1), // 2015-05-01 -> Día del Trabajo
        new Date(year, 4, 18), // 2015-05-18 -> Festivo
        new Date(year, 5, 8), // 2015-06-08 -> Festivo
        new Date(year, 5, 15), // 2015-06-15 -> Festivo
        new Date(year, 5, 29), // 2015-06-29 -> Festivo
        new Date(year, 6, 20), // 2015-07-20 -> Día de la Independencia
        new Date(year, 7, 7), // 2015-08-07 -> Festivo
        new Date(year, 7, 17), // 2015-08-17 -> Festivo
        new Date(year, 9, 12), // 2015-10-12 -> Festivo
        new Date(year, 10, 2), // 2015-11-02 -> Festivo
        new Date(year, 10, 16), // 2015-11-16 -> Festivo
        new Date(year, 11, 8), // 2015-12-08 -> Inmaculada Concepción
        new Date(year, 11, 25), // 2015-12-25 -> Navidad
        new Date(year, 0, 1), // 2016-01-01 -> Año Nuevo
        new Date(year, 0, 11), // 2016-01-11 -> Festivo
        new Date(year, 2, 24), // 2016-03-24 -> Festivo
        new Date(year, 2, 25), // 2016-03-25 -> Festivo
        new Date(year, 4, 9), // 2016-05-09 -> Festivo
        new Date(year, 4, 30), // 2016-05-30 -> Festivo
        new Date(year, 5, 6), // 2016-06-06 -> Festivo
        new Date(year, 6, 4), // 2016-07-04 -> Festivo
        new Date(year, 6, 20), // 2016-07-20 -> Día de la Independencia
        new Date(year, 7, 19), // 2016-08-15 -> Festivo
        new Date(year, 9, 14), // 2016-10-17 -> Festivo
        new Date(year, 10, 7), // 2016-11-07 -> Festivo
        new Date(year, 10, 14), // 2016-11-14 -> Festivo
        new Date(year, 11, 8), // 2016-12-08 -> Inmaculada Concepción
    ];
};

export const getAllHolidays = () => {
    const year = new Date().getFullYear();

    const holidays = getFixedHolidays(year);
    const holyWeek = getHolyWeek(year);
    const additionalHolidays = getAdditionalHolidays(year);
    const manualHolidays = getManualHolidays(year);

    return holidays.concat(holyWeek, additionalHolidays, manualHolidays);
};
