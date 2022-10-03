import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BarChar from "../components/Dashboard/BarChar";
import DashboardCard from "../components/Dashboard/DashboardCard";
import DoughnutChart from "../components/Dashboard/DoughnutChart";
import LineCharC from "../components/Dashboard/LineCharC";
import { useAppContext } from "../context/AppContext";
const Dashboard = () => {
  const {analitics} = useAppContext()
  return (
    <div className=" dashboard" style={{paddingBottom : "200px"}}>
      <div className="dashboard-card-div">
        <Row className="d-flex justify-content-center">
          <Col xs="12" sm="8" lg="6" xl="4">
            <DashboardCard>
              <div className="card-chart-div">
                <DoughnutChart />
              </div>
            </DashboardCard>
          </Col>
          <Col xs="12" sm="8" lg="6" xl="4">
            <DashboardCard>
              <div className="card-chart-div">
                <DoughnutChart />
              </div>
            </DashboardCard>
          </Col>
          <Col xs="12" sm="8" lg="6" xl="4">
            <DashboardCard>
              <div className="card-chart-div">
                <DoughnutChart />
              </div>
            </DashboardCard>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col xs="12" sm="8" md="8" lg="6">
            <DashboardCard>
              <div className="card-chart-div">
                <BarChar analitics={analitics} />
              </div>
            </DashboardCard>
          </Col>
          <Col xs="12" sm="8" md="8" lg="6">
            <DashboardCard>
              <div className="card-chart-div">
                <LineCharC />
              </div>
            </DashboardCard>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
