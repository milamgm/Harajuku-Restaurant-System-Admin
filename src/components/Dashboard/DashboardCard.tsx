import DoughnutChart from "./DoughnutChart";

const DashboardCard = ({ children }) => {
  return (
    <div className="card-div">
      <div className="card-header">Header</div>
      <div className="card-body">
        <div className="card-body-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
