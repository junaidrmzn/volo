export const formatParameterNameWithUnit = (
    testPointParameter: { name: string; unit?: string },
    unknownUnitString: string = "-"
) => {
    if (!testPointParameter.unit) return `${testPointParameter.name} [${unknownUnitString}]`;

    const unit = testPointParameter.unit.trim();

    return `${testPointParameter.name} [${unit || unknownUnitString}]`;
};
