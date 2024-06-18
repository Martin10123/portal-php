export const removeAccentsAndCompareTexts = (text, textoToCompare) => {
    const textoWithOutAccents = text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const textoToCompareWithOutAccents = textoToCompare
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    return textoWithOutAccents
        .toLowerCase()
        .includes(textoToCompareWithOutAccents.toLowerCase());
};
