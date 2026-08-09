export const mergeGroupAndWeekly = (groupByUnit, weeklyByUnit) => {
  const weeklyByUnitId = new Map(weeklyByUnit.map((w) => [w.unitId, w]));

  return groupByUnit.map((group) => ({
    ...group,
    weeklyIncome: weeklyByUnitId.get(group.unitId)?.weeklyIncome || 0,
    weeklyPayment: weeklyByUnitId.get(group.unitId)?.weeklyPayment || 0,
  }));
};
