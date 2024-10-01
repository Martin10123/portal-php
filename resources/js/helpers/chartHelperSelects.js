export const getYearsFrom2000 = () => {
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let year = currentYear; year >= 2019; year--) {
        years.push(year);
    }
    return years;
};

export const getListMouth = () => {
    return [
        { value: "1", name: "Enero" },
        { value: "2", name: "Febrero" },
        { value: "3", name: "Marzo" },
        { value: "4", name: "Abril" },
        { value: "5", name: "Mayo" },
        { value: "6", name: "Junio" },
        { value: "7", name: "Julio" },
        { value: "8", name: "Agosto" },
        { value: "9", name: "Septiembre" },
        { value: "10", name: "Octubre" },
        { value: "11", name: "Noviembre" },
        { value: "12", name: "Diciembre" },
    ];
};

export const getXAtributoArray = (array, atributte) => {
    if (array.length === 0) {
        return [];
    }

    return array.map((p) => p[atributte]);
};
