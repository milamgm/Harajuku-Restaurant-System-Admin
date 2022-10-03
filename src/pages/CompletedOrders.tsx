import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Accordion, Col, Container, Row, Table } from "react-bootstrap";
import db from "../firebase/firebaseConfig";
import { IOrder } from "../types/types";

const CompletedOrders = () => {
  const [completedOrders, setCompletedOrders] = useState<IOrder[]>([]);
  const ordersPerArrival = [...completedOrders].sort((a, b) => {
    console.log(Number(new Date(b.time)))
    return Number(new Date(b.time)) - Number(new Date(a.time));
  });
  console.log(ordersPerArrival);
  useEffect(() => {
    onSnapshot(collection(db, "completedOrders"), (snapshot) => {
      setCompletedOrders([]);
      snapshot.docs.forEach((doc) => {
        setCompletedOrders((prevOrders : any) => [...prevOrders, doc.data()]);
      });
    });
  }, []);
  return (
    <div style={{paddingBottom : "200px"}}>
      {ordersPerArrival && ordersPerArrival.map((completedOrder: IOrder) => (
        <Accordion flush className="border" key={completedOrder.order_id}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Order #{completedOrder.order_id}
              <span className="ms-auto">Table {completedOrder.table_num}</span>
              <small className="ms-auto text-muted">
                Ordered at{" "}
                {new Date(completedOrder.time).toLocaleString("de-DE", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col xs="8">Ordered Items</Col>
              </Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th># ID</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {completedOrder.items.map((item) => (
                    <tr key={item.id}>
                      <td className="text-muted">{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </div>
  );
};

export default CompletedOrders;
