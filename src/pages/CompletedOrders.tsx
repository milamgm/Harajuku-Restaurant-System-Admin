import { Accordion, Col, Row, Table } from "react-bootstrap";
import { useAppContext } from "../context/AppContext";
import { IOrder } from "../types/types";

const CompletedOrders = () => {
  const { completedOrders } = useAppContext();
  // const [completedOrders, setCompletedOrders] = useState<IOrder[]>([]);
  const ordersPerArrival = [...completedOrders].sort((a, b) => {
    return Number(new Date(b.time)) - Number(new Date(a.time));
  });
  const weekDays = [
    "Sontag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
  const monate = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  return (
    <div style={{ paddingBottom: "200px" }}>
      {ordersPerArrival &&
        ordersPerArrival.map(({ order_id, table_num, time, items }: IOrder) => (
          <Accordion flush className="border" key={order_id}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Order #{order_id}
                <span className="ms-auto">Table {table_num}</span>
                <small className="ms-auto text-muted">
                  {weekDays[new Date(time).getDay()]},&nbsp;
                  {new Date(time).getDate()}.&nbsp;
                  {monate[new Date(time).getMonth()]}&nbsp;
                  {new Date(time).getFullYear()}&nbsp;um&nbsp;
                  {new Date(time).toLocaleString("de-DE", {
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

export default CompletedOrders;
