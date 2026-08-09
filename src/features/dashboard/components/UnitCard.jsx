import { Card, CardBody, Amount } from '../../../shared/components';

export const UnitCard = ({ unit, total, weeklyIncome, weeklyPayment }) => {
  return (
    <Card className="dashboard-unit-card">
      <CardBody className="dashboard-unit-card__body">
        <div className="dashboard-unit-card__header">
          <span className="dashboard-unit-card__name">{unit?.name}</span>
          {unit?.symbol ? (
            <span className="dashboard-unit-card__symbol">{unit.symbol}</span>
          ) : null}
        </div>

        <Amount
          className="dashboard-unit-card__total"
          value={total}
          tone="neutral"
          size="lg"
          fractionDigits={0}
        />

        <div className="dashboard-unit-card__weekly">
          <div className="dashboard-unit-card__weekly-item">
            <span className="dashboard-unit-card__weekly-label">Income</span>
            <Amount value={weeklyIncome} size="sm" fractionDigits={0} />
          </div>
          <div className="dashboard-unit-card__weekly-item">
            <span className="dashboard-unit-card__weekly-label">Payment</span>
            <Amount value={-weeklyPayment} size="sm" fractionDigits={0} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
