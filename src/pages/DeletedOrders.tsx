import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Accordion, Col, Container, Row, Table } from "react-bootstrap";
import { IOrder } from "../types/types";
import db from "../firebase/firebaseConfig";

const DeletedOrders = () => {
  const [deletedOrders, setDeletedOrders] = useState<IOrder[]>([]);
  const ordersPerArrival = [...deletedOrders].sort((a, b) => {
    return Number(new Date(b.time)) - Number(new Date(a.time));
  });
  useEffect(() => {
    onSnapshot(collection(db, "deletedOrders"), (snapshot) => {
      setDeletedOrders([]);
      snapshot.docs.forEach((doc) => {
        setDeletedOrders((prevOrders: any) => [...prevOrders, doc.data()]);
      });
    });
  }, []);
  return (
    <div style={{paddingBottom : "200px"}}>
      {ordersPerArrival &&
        ordersPerArrival.map((deletedOrder: IOrder) => (
          <Accordion flush className="border" key={deletedOrder.order_id}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Order #{deletedOrder.order_id}
                <span className="ms-auto">Table {deletedOrder.table_num}</span>
                <small className="ms-auto text-muted">
                  Ordered at{" "}
                  {new Date(deletedOrder.time).toLocaleString("de-DE", {
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
                    {deletedOrder.items.map((item) => (
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

export default DeletedOrders;
