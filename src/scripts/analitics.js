export const getAnalitics = (completedOrders) => {
  let analitics = {};
  const weekdays = [0, 0, 0, 0, 0, 0, 0];
  let updatedWeekdays = [];
  let profit = {};
  for (let i = 1; i <= 12; i++) {
    profit = { ...profit, [i]: 0 };
  }
  let bestDishes = {};
  let profitMonth = 0;
  let dayHours = {};
  for (let i = 11; i <= 24; i++) {
    dayHours = { ...dayHours, [i]: 0 };
  }

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
        bestDishes = { ...bestDishes, [item.name]: item.quantity };
      }
    });

    //Profit
    order.items.map((item) => {
      const month = new Date(order.time).getMonth();
      profitMonth += item.price;
      profit[month + 1] = profitMonth;
    });
  });

  updatedWeekdays.push(updatedWeekdays[0]);
  updatedWeekdays = updatedWeekdays.slice(1);
  analitics = {
    weekdays: updatedWeekdays,
    dayHours: dayHours,
    bestDishes: bestDishes,
    profit: profit,
  };
  console.log(analitics);
  return analitics;
};
