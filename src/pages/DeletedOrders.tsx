import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IOrder } from "../types/types";
import db from "../firebase/firebaseConfig";
import { Accordion, Col, monate, Row, Table, weekDays } from "../utils";

const DeletedOrders = () => {
  const [deletedOrders, setDeletedOrders] = useState<IOrder[]>([]);
  const ordersPerArrival = [...deletedOrders].sort((a, b) => {
    return (
      new Date(b.time.seconds * 1000).valueOf() -
      new Date(a.time.seconds * 1000).valueOf()
    );
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
    <div style={{ paddingBottom: "200px" }}>
      <h2 className="mb-5 w-25">Deleted Orders</h2>
      {ordersPerArrival &&
        ordersPerArrival.map(({ order_id, table_num, time, items }: IOrder) => (
          <Accordion flush className="border" key={order_id}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Order #{order_id}
                <span className="ms-auto">Table {table_num}</span>
                <small className="ms-auto text-muted">
                  {time.toDate().toLocaleString("gb-GB")}
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
                    {items.map(({ id, name, quantity }) => (
                      <tr key={id}>
                        <td className="text-muted">{id}</td>
                        <td>{name}</td>
                        <td>{quantity}</td>
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
