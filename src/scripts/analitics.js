export const getAnalitics = (completedOrders) => {
  let analitics = {};
  const weekdays = [0, 0, 0, 0, 0, 0, 0];
  let updatedWeekdays = [];
  let bestDishes = {};
  const dayHours = {
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
    24: 0,
  };
  completedOrders.map((order) => {
    //weekdays
    const weekday = new Date(order.time).getDay();
    weekdays[weekday] += 1;
    updatedWeekdays = weekdays;

    //dayHours
    const dayHour = new Date(order.time).getHours();
    dayHours[dayHour] += 1;

    //Best Dishes
    order.items.map((item) => {
      if (item.name in bestDishes) {
        bestDishes[item.name] = bestDishes[item.name] + item.quantity;
      } else {
        bestDishes = { ...bestDishes, [item.name]: 1 };
      }
    });
  });
  updatedWeekdays.push(updatedWeekdays[0]);
  updatedWeekdays = updatedWeekdays.slice(1);
  analitics = {
    weekdays: updatedWeekdays,
    dayHours: dayHours,
    bestDishes: bestDishes,
  };
  return analitics;
};
