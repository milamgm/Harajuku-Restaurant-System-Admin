import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BarChar from "../components/Dashboard/BarChar";
import DashboardCard from "../components/Dashboard/DashboardCard";
import DoughnutChart from "../components/Dashboard/DoughnutChart";
import LineCharC from "../components/Dashboard/LineCharC";
import { useAppContext } from "../context/AppContext";
import { getAnalitics } from "../scripts/analitics";
const Dashboard = () => {
  const { completedOrders } = useAppContext();
  const [analitics, setAnalitics] = useState({
    bestDishes: {},
    weekdays: {},
    dayHours: {},
  });
  const weekdaysAnalitics = getAnalitics(completedOrders);
  console.log(analitics);

  useEffect(() => {
    setAnalitics(weekdaysAnalitics);
  }, [completedOrders]);
  return (
    <div className=" dashboard" style={{ paddingBottom: "200px" }}>
      <div className="dashboard-card-div">
        <Row className="d-flex justify-content-center">
          <Col xs="12" sm="8" lg="6" xl="6">
          <DashboardCard title="Profit">
              <div className="card-chart-div">
                <LineCharC
                  labelsQ={Object.keys(analitics.dayHours)}
                  dataQ={Object.values(analitics.dayHours)}
                  color="lightblue"
                />
              </div>
            </DashboardCard>
            <DashboardCard title="Hauptverkehrszeit">
              <div className="card-chart-div">
                <LineCharC
                  labelsQ={Object.keys(analitics.dayHours)}
                  dataQ={Object.values(analitics.dayHours)}
                  color="lightblue"
                />
              </div>
            </DashboardCard>
          </Col>
          <Col xs="12" sm="8" lg="6" xl="6">
            <DashboardCard title="Am Meisten Gekauft">
              <div className="card-chart-div">
                <BarChar
                  labelsQ={Object.keys(analitics.bestDishes)}
                  dataQ={Object.values(analitics.bestDishes)}
                  color="darkred"
                />
              </div>
            </DashboardCard>
            <DashboardCard title="Wochentage">
              <div className="card-chart-div">
                <BarChar
                  labelsQ={["Mon", "Die", "Mie", "Don", "Fre", "Sam", "Son"]}
                  dataQ={analitics.weekdays}
                  color="blue"
                />
              </div>
            </DashboardCard>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
