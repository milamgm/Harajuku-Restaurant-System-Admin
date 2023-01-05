interface IDashboardCard{
  children: JSX.Element,
  title: string
}

const DashboardCard = ({ children, title }: IDashboardCard) => {
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
