import { IOrder } from "../types/types";

interface IDayHours {
  [key: number]: number;
}
interface IBestDishes {
  [key: string]: number;
}
interface IProfit {
  [key: number]: number;
}
export interface IAnalytics {
  bestDishes: { [dish: string]: number };
  weekdays: number[];
  dayHours: IDayHours;
  profit:  IProfit;
}

export const getAnalytics = (completedOrders : IOrder[]) => {
  let analytics : IAnalytics = {
    bestDishes: {},
    weekdays: [],
    dayHours: [],
    profit: {},
  };
  const weekdays = [0, 0, 0, 0, 0, 0, 0];
  let updatedWeekdays: number[] = [];
  let profit: IProfit = {};
  for (let i = 1; i <= 12; i++) {
    profit = { ...profit, [i]: 0 };
  }
  let bestDishes: IBestDishes = {};
  let profitMonth = 0;
  let dayHours: IDayHours = {};
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
  analytics = {
    weekdays: updatedWeekdays,
    dayHours: dayHours,
    bestDishes: bestDishes,
    profit: profit,
  };

  return analytics;
};
