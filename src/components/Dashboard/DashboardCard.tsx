import DoughnutChart from "./DoughnutChart";

const DashboardCard = ({ children, title }) => {
  return (
    <div className="card-div">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <div className="card-body-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
