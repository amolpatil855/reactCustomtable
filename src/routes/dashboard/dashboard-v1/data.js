// dashboard-v1 data

// chart config
import ChartConfig from "../../../constants/chart-config";

// helpers
import { hexToRgbA } from "../../../helpers/helpers";

// total earns
export const totalEarns = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  datasets: [
    {
      label: "Last year",
      fill: true,
      lineTension: 0.4,
      fillOpacity: 0.5,
      backgroundColor: hexToRgbA(ChartConfig.color.primary, 0.9),
      borderColor: "transparent",
      pointBorderColor: ChartConfig.color.white,
      pointBackgroundColor: ChartConfig.color.white,
      pointBorderWidth: 0,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: hexToRgbA(ChartConfig.color.primary, 1),
      pointHoverBorderColor: hexToRgbA(ChartConfig.color.primary, 1),
      pointHoverBorderWidth: 8,
      pointRadius: 0,
      pointHitRadius: 10,
      data: [250, 350, 270, 420, 380, 220, 400, 550, 480, 190, 390, 380]
    },
    {
      label: "Current Year",
      fill: true,
      lineTension: 0.4,
      fillOpacity: 0.5,
      backgroundColor: hexToRgbA(ChartConfig.color.greyLighten, 0.8),
      borderColor: "transparent",
      pointBorderColor: ChartConfig.color.white,
      pointBackgroundColor: ChartConfig.color.white,
      pointBorderWidth: 0,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: hexToRgbA(ChartConfig.color.greyLighten, 1),
      pointHoverBorderColor: hexToRgbA(ChartConfig.color.greyLighten, 1),
      pointHoverBorderWidth: 8,
      pointRadius: 0,
      pointHitRadius: 10,
      data: [600, 400, 500, 350, 650, 630, 450, 480, 650, 500, 530, 550]
    }
  ]
};

// social accounts feeds
export const feeds = {
  facebook: {
    friendsCount: "89k",
    feedsCount: "1220"
  },
  twitter: {
    friendsCount: "89k",
    feedsCount: "459"
  },
  linkedIn: {
    friendsCount: "89k",
    feedsCount: "850"
  },
  google: {
    friendsCount: "89k",
    feedsCount: "1520"
  }
};

// traffic Status
export const trafficStatus = {
  chartLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"],
  chartDatasets: [
    {
      label: "Live",
      backgroundColor: "#23649e",
      borderColor: "#23649e",
      borderWidth: 1,
      hoverBackgroundColor: "#23649e",
      hoverBorderColor: "#23649e",
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: "On Hold",
      backgroundColor: "#86d3ce",
      borderColor: "#86d3ce",
      borderWidth: 1,
      hoverBackgroundColor: "#86d3ce",
      hoverBorderColor: "#86d3ce",
      data: [45, 39, 40, 60, 35, 25, 60]
    }
  ],
  onlineSources: "3500",
  today: "17,020",
  lastMonth: "20.30%"
};

// total sales
export const totalSales = {
  label: "Cases",
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"]
};

// net profit
export const netProfit = {
  label: "Cases",
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"]
};

// tax stats
export const taxStats = {
  label: "Cases",
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"]
};

// expenses stats
export const expenses = {
  label: "Cases",
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"]
};
