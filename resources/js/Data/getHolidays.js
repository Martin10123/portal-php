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

const getFixedHolidays = (year) => {
    return [
        new Date(year, 0, 1),
        new Date(year, 11, 24),
        new Date(year, 11, 25),
        new Date(year, 11, 31),
    ];
};

export const getAllHolidays = () => {
    const year = new Date().getFullYear();

    const holidays = getFixedHolidays(year);
    const holyWeek = getHolyWeek(year);

    return holidays.concat(holyWeek);
};
