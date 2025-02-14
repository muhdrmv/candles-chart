import React, { useEffect, useRef } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  registerables,
} from "chart.js";
import { Chart as ReactChart } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import zoomPlugin from "chartjs-plugin-zoom";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
import "chartjs-adapter-date-fns";
import formattedData from "./formattedArray.json";

// Register Chart.js components and plugins
Chart.register(
  ...registerables,
  zoomPlugin,
  annotationPlugin,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  CandlestickController,
  CandlestickElement
);

const CandlestickChart = () => {
  const chartRef = useRef(null);

  // Calculate the initial time range using the last 200 candles.
  // It assumes that each candle object has a property "x" representing the time.
  const last200Candles = formattedData.slice(-400);
  const initialXMin = last200Candles[0].x;
  const initialXMax = last200Candles[last200Candles.length - 1].x;

  // Separate refs to hold drag state for the y-axis and x-axis adjustments
  const dragDataY = useRef({
    isDragging: false,
    startY: 0,
    initialMin: null,
    initialMax: null,
  });
  const dragDataX = useRef({
    isDragging: false,
    startX: 0,
    initialMin: null,
    initialMax: null,
  });

  // (Optional) Example for annotations – adjust or remove if not needed.


  const rectangles = [
    {
      "type": "box",
      "xMin": 1738655400000,
      "xMax": 1738656600000,
      "yMin": 2810.325,
      "yMax": 2813.89,
      "backgroundColor": "rgba(208, 249, 10, 0.39)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738656900000,
      "xMax": 1738657200000,
      "yMin": 2814.25,
      "yMax": 2818.915,
      "backgroundColor": "rgba(214, 252, 39, 0.36)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738657200000,
      "xMax": 1738662000000,
      "yMin": 2811.855,
      "yMax": 2819.305,
      "backgroundColor": "rgba(245, 221, 12, 0.30)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738662600000,
      "xMax": 1738673400000,
      "yMin": 2812.89,
      "yMax": 2821.88,
      "backgroundColor": "rgba(216, 207, 18, 0.33)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738673700000,
      "xMax": 1738674000000,
      "yMin": 2821.46,
      "yMax": 2823.015,
      "backgroundColor": "rgba(233, 238, 42, 0.35)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738675800000,
      "xMax": 1738679100000,
      "yMin": 2829.03,
      "yMax": 2837.245,
      "backgroundColor": "rgba(231, 223, 4, 0.33)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738679400000,
      "xMax": 1738680000000,
      "yMin": 2836.05,
      "yMax": 2840.745,
      "backgroundColor": "rgba(245, 222, 0, 0.30)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738680300000,
      "xMax": 1738680600000,
      "yMin": 2839.09,
      "yMax": 2841.25,
      "backgroundColor": "rgba(243, 251, 18, 0.40)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738680600000,
      "xMax": 1738681200000,
      "yMin": 2838.08,
      "yMax": 2841.345,
      "backgroundColor": "rgba(213, 246, 47, 0.33)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738681800000,
      "xMax": 1738683000000,
      "yMin": 2840.205,
      "yMax": 2844.435,
      "backgroundColor": "rgba(204, 201, 24, 0.36)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738683000000,
      "xMax": 1738715400000,
      "yMin": 2832.685,
      "yMax": 2845.46,
      "backgroundColor": "rgba(233, 253, 5, 0.38)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738715700000,
      "xMax": 1738717200000,
      "yMin": 2843.01,
      "yMax": 2848.3,
      "backgroundColor": "rgba(202, 213, 37, 0.31)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738717200000,
      "xMax": 1738721100000,
      "yMin": 2839.8,
      "yMax": 2849.015,
      "backgroundColor": "rgba(229, 248, 38, 0.31)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738721400000,
      "xMax": 1738725600000,
      "yMin": 2847.92,
      "yMax": 2853.885,
      "backgroundColor": "rgba(229, 202, 31, 0.31)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738726200000,
      "xMax": 1738728600000,
      "yMin": 2851.895,
      "yMax": 2854.48,
      "backgroundColor": "rgba(210, 216, 1, 0.36)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738728600000,
      "xMax": 1738730400000,
      "yMin": 2853.52,
      "yMax": 2857.92,
      "backgroundColor": "rgba(213, 245, 26, 0.31)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738730400000,
      "xMax": 1738734000000,
      "yMin": 2853.715,
      "yMax": 2858.19,
      "backgroundColor": "rgba(253, 219, 11, 0.32)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738734300000,
      "xMax": 1738734600000,
      "yMin": 2858.045,
      "yMax": 2860.355,
      "backgroundColor": "rgba(222, 238, 21, 0.33)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738734600000,
      "xMax": 1738736400000,
      "yMin": 2857.27,
      "yMax": 2860.665,
      "backgroundColor": "rgba(222, 238, 38, 0.31)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738736700000,
      "xMax": 1738742100000,
      "yMin": 2855.02,
      "yMax": 2861.905,
      "backgroundColor": "rgba(250, 215, 42, 0.34)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738742400000,
      "xMax": 1738743300000,
      "yMin": 2863.755,
      "yMax": 2865.485,
      "backgroundColor": "rgba(221, 240, 45, 0.39)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738743600000,
      "xMax": 1738743900000,
      "yMin": 2864.905,
      "yMax": 2866.435,
      "backgroundColor": "rgba(231, 228, 27, 0.32)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738743900000,
      "xMax": 1738744800000,
      "yMin": 2864.775,
      "yMax": 2866.675,
      "backgroundColor": "rgba(251, 211, 49, 0.34)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738745100000,
      "xMax": 1738747200000,
      "yMin": 2865.505,
      "yMax": 2869.705,
      "backgroundColor": "rgba(240, 225, 35, 0.32)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738747200000,
      "xMax": 1738748400000,
      "yMin": 2865.56,
      "yMax": 2870.48,
      "backgroundColor": "rgba(200, 221, 47, 0.36)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738748400000,
      "xMax": 1738750800000,
      "yMin": 2869.3,
      "yMax": 2872.175,
      "backgroundColor": "rgba(213, 221, 3, 0.32)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738751400000,
      "xMax": 1738769100000,
      "yMin": 2858.73,
      "yMax": 2877.105,
      "backgroundColor": "rgba(203, 225, 10, 0.32)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738769100000,
      "xMax": 1738770000000,
      "yMin": 2873.885,
      "yMax": 2877.485,
      "backgroundColor": "rgba(251, 233, 23, 0.30)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738770600000,
      "xMax": 1738941300000,
      "yMin": 2834.26,
      "yMax": 2882.42,
      "backgroundColor": "rgba(230, 241, 39, 0.38)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738942200000,
      "xMax": 1738942500000,
      "yMin": 2882.605,
      "yMax": 2886.12,
      "backgroundColor": "rgba(240, 224, 32, 0.38)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738942800000,
      "xMax": 1738943100000,
      "yMin": 2883.64,
      "yMax": 2886.215,
      "backgroundColor": "rgba(230, 249, 18, 0.36)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738655400000,
      "xMax": 1738656000000,
      "yMin": 2811.93,
      "yMax": 2813.89,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738656300000,
      "xMax": 1738656600000,
      "yMin": 2810.775,
      "yMax": 2814.345,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738656900000,
      "xMax": 1738658100000,
      "yMin": 2814.25,
      "yMax": 2819.305,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738658400000,
      "xMax": 1738658700000,
      "yMin": 2812.235,
      "yMax": 2815.605,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738659000000,
      "xMax": 1738665300000,
      "yMin": 2812.985,
      "yMax": 2821.88,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738665600000,
      "xMax": 1738666200000,
      "yMin": 2813.37,
      "yMax": 2815.4,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738666500000,
      "xMax": 1738667400000,
      "yMin": 2813.97,
      "yMax": 2816.035,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738668600000,
      "xMax": 1738669500000,
      "yMin": 2814.44,
      "yMax": 2816.84,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738670100000,
      "xMax": 1738670400000,
      "yMin": 2814.86,
      "yMax": 2816.275,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738672200000,
      "xMax": 1738672800000,
      "yMin": 2819.39,
      "yMax": 2820.8,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738675500000,
      "xMax": 1738677000000,
      "yMin": 2831.275,
      "yMax": 2837.245,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738677300000,
      "xMax": 1738677600000,
      "yMin": 2830.415,
      "yMax": 2832.235,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738679100000,
      "xMax": 1738684800000,
      "yMin": 2833.315,
      "yMax": 2845.46,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738685400000,
      "xMax": 1738854300000,
      "yMin": 2836.805,
      "yMax": 2882.42,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738856400000,
      "xMax": 1738861200000,
      "yMin": 2848.335,
      "yMax": 2854.77,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738862100000,
      "xMax": 1738863300000,
      "yMin": 2849.07,
      "yMax": 2851.4,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738864800000,
      "xMax": 1738865400000,
      "yMin": 2851.28,
      "yMax": 2852.745,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738867500000,
      "xMax": 1738868400000,
      "yMin": 2851.785,
      "yMax": 2853.685,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738868700000,
      "xMax": 1738870500000,
      "yMin": 2850.645,
      "yMax": 2852.675,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738871400000,
      "xMax": 1738935000000,
      "yMin": 2852.94,
      "yMax": 2870.8,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738935300000,
      "xMax": 1738936200000,
      "yMin": 2860.52,
      "yMax": 2868.98,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738936200000,
      "xMax": 1738936800000,
      "yMin": 2858.965,
      "yMax": 2864.36,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738937100000,
      "xMax": 1738948800000,
      "yMin": 2856.225,
      "yMax": 2886.81,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738948800000,
      "xMax": 1738949400000,
      "yMin": 2855.99,
      "yMax": 2859.09,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738951200000,
      "xMax": 1738956600000,
      "yMin": 2859.725,
      "yMax": 2865.195,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738957200000,
      "xMax": 1738958400000,
      "yMin": 2859.755,
      "yMax": 2862.61,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738958400000,
      "xMax": 1738959900000,
      "yMin": 2859.64,
      "yMax": 2863.885,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738960200000,
      "xMax": 1738960800000,
      "yMin": 2860.06,
      "yMax": 2861.55,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738962300000,
      "xMax": 1738964100000,
      "yMin": 2861.1,
      "yMax": 2863.425,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738964400000,
      "xMax": 1738965300000,
      "yMin": 2860.765,
      "yMax": 2862.225,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    },
    {
      "type": "box",
      "xMin": 1738965000000,
      "xMax": 1738965300000,
      "yMin": 2860.94,
      "yMax": 2862.225,
      "backgroundColor": "rgba(240, 96, 96, 0.2)",
      "borderWidth": 0.01
    }
  ]

  const horizontalLines = [
    {
      "xMin": 1738655400000,
      "xMax": 1738656600000,
      "yMin": 2809.82356,
      "yMax": 2809.82356,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738655400000,
      "xMax": 1738656600000,
      "yMin": 2808.71812,
      "yMax": 2808.71812,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738656900000,
      "xMax": 1738657200000,
      "yMin": 2813.6063799999997,
      "yMax": 2813.6063799999997,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738656900000,
      "xMax": 1738657200000,
      "yMin": 2812.16326,
      "yMax": 2812.16326,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738657200000,
      "xMax": 1738662000000,
      "yMin": 2816.18101,
      "yMax": 2816.18101,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738657200000,
      "xMax": 1738662000000,
      "yMin": 2815.33177,
      "yMax": 2815.33177,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738662600000,
      "xMax": 1738673400000,
      "yMin": 2815.68455,
      "yMax": 2815.68455,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738662600000,
      "xMax": 1738673400000,
      "yMin": 2814.0003500000003,
      "yMax": 2814.0003500000003,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738673700000,
      "xMax": 1738674000000,
      "yMin": 2816.7577499999998,
      "yMax": 2816.7577499999998,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738673700000,
      "xMax": 1738674000000,
      "yMin": 2815.0567499999997,
      "yMax": 2815.0567499999997,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738675800000,
      "xMax": 1738679100000,
      "yMin": 2827.48987,
      "yMax": 2827.48987,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738675800000,
      "xMax": 1738679100000,
      "yMin": 2824.83799,
      "yMax": 2824.83799,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738679400000,
      "xMax": 1738680000000,
      "yMin": 2833.50513,
      "yMax": 2833.50513,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738679400000,
      "xMax": 1738680000000,
      "yMin": 2831.53701,
      "yMax": 2831.53701,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738680300000,
      "xMax": 1738680600000,
      "yMin": 2838.0364,
      "yMax": 2838.0364,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738680300000,
      "xMax": 1738680600000,
      "yMin": 2837.1628,
      "yMax": 2837.1628,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738680600000,
      "xMax": 1738681200000,
      "yMin": 2839.95141,
      "yMax": 2839.95141,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738680600000,
      "xMax": 1738681200000,
      "yMin": 2839.5725700000003,
      "yMax": 2839.5725700000003,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738681800000,
      "xMax": 1738683000000,
      "yMin": 2840.50761,
      "yMax": 2840.50761,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738681800000,
      "xMax": 1738683000000,
      "yMin": 2839.43997,
      "yMax": 2839.43997,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738683000000,
      "xMax": 1738715400000,
      "yMin": 2842.21241,
      "yMax": 2842.21241,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738683000000,
      "xMax": 1738715400000,
      "yMin": 2841.32957,
      "yMax": 2841.32957,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738715700000,
      "xMax": 1738717200000,
      "yMin": 2838.64993,
      "yMax": 2838.64993,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738715700000,
      "xMax": 1738717200000,
      "yMin": 2836.02661,
      "yMax": 2836.02661,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738717200000,
      "xMax": 1738721100000,
      "yMin": 2845.30391,
      "yMax": 2845.30391,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738717200000,
      "xMax": 1738721100000,
      "yMin": 2844.29507,
      "yMax": 2844.29507,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738721400000,
      "xMax": 1738725600000,
      "yMin": 2845.1804700000002,
      "yMax": 2845.1804700000002,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738721400000,
      "xMax": 1738725600000,
      "yMin": 2842.81419,
      "yMax": 2842.81419,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738726200000,
      "xMax": 1738728600000,
      "yMin": 2850.42592,
      "yMax": 2850.42592,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738726200000,
      "xMax": 1738728600000,
      "yMin": 2849.32384,
      "yMax": 2849.32384,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738728600000,
      "xMax": 1738730400000,
      "yMin": 2854.19655,
      "yMax": 2854.19655,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738728600000,
      "xMax": 1738730400000,
      "yMin": 2853.18435,
      "yMax": 2853.18435,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738730400000,
      "xMax": 1738734000000,
      "yMin": 2855.30394,
      "yMax": 2855.30394,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738730400000,
      "xMax": 1738734000000,
      "yMin": 2854.51938,
      "yMax": 2854.51938,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738734300000,
      "xMax": 1738734600000,
      "yMin": 2856.25148,
      "yMax": 2856.25148,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738734300000,
      "xMax": 1738734600000,
      "yMin": 2855.13596,
      "yMax": 2855.13596,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738734600000,
      "xMax": 1738736400000,
      "yMin": 2859.04584,
      "yMax": 2859.04584,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738734600000,
      "xMax": 1738736400000,
      "yMin": 2858.60568,
      "yMax": 2858.60568,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738736700000,
      "xMax": 1738742100000,
      "yMin": 2859.04057,
      "yMax": 2859.04057,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738736700000,
      "xMax": 1738742100000,
      "yMin": 2858.26189,
      "yMax": 2858.26189,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738742400000,
      "xMax": 1738743300000,
      "yMin": 2859.01763,
      "yMax": 2859.01763,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738742400000,
      "xMax": 1738743300000,
      "yMin": 2857.25951,
      "yMax": 2857.25951,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738743600000,
      "xMax": 1738743900000,
      "yMin": 2864.77876,
      "yMax": 2864.77876,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738743600000,
      "xMax": 1738743900000,
      "yMin": 2864.32852,
      "yMax": 2864.32852,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738743900000,
      "xMax": 1738744800000,
      "yMin": 2865.5811400000002,
      "yMax": 2865.5811400000002,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738743900000,
      "xMax": 1738744800000,
      "yMin": 2865.28378,
      "yMax": 2865.28378,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738745100000,
      "xMax": 1738747200000,
      "yMin": 2866.65826,
      "yMax": 2866.65826,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738745100000,
      "xMax": 1738747200000,
      "yMin": 2865.83002,
      "yMax": 2865.83002,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738747200000,
      "xMax": 1738748400000,
      "yMin": 2867.40545,
      "yMax": 2867.40545,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738747200000,
      "xMax": 1738748400000,
      "yMin": 2866.56965,
      "yMax": 2866.56965,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738748400000,
      "xMax": 1738750800000,
      "yMin": 2868.08693,
      "yMax": 2868.08693,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738748400000,
      "xMax": 1738750800000,
      "yMin": 2866.97561,
      "yMax": 2866.97561,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738751400000,
      "xMax": 1738769100000,
      "yMin": 2872.2815100000003,
      "yMax": 2872.2815100000003,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738751400000,
      "xMax": 1738769100000,
      "yMin": 2870.9702700000003,
      "yMax": 2870.9702700000003,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738769100000,
      "xMax": 1738770000000,
      "yMin": 2865.89441,
      "yMax": 2865.89441,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738769100000,
      "xMax": 1738770000000,
      "yMin": 2862.74357,
      "yMax": 2862.74357,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738770600000,
      "xMax": 1738941300000,
      "yMin": 2877.14537,
      "yMax": 2877.14537,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738770600000,
      "xMax": 1738941300000,
      "yMin": 2875.71149,
      "yMax": 2875.71149,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738942200000,
      "xMax": 1738942500000,
      "yMin": 2854.07052,
      "yMax": 2854.07052,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738942200000,
      "xMax": 1738942500000,
      "yMin": 2845.35804,
      "yMax": 2845.35804,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738942800000,
      "xMax": 1738943100000,
      "yMin": 2883.98402,
      "yMax": 2883.98402,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738942800000,
      "xMax": 1738943100000,
      "yMin": 2883.37754,
      "yMax": 2883.37754,
      "borderColor": "orange",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738655400000,
      "xMax": 1738656000000,
      "yMin": 2856.9955,
      "yMax": 2856.9955,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738655400000,
      "xMax": 1738656000000,
      "yMin": 2868.7135,
      "yMax": 2868.7135,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738656300000,
      "xMax": 1738656600000,
      "yMin": 2812.8525299999997,
      "yMax": 2812.8525299999997,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738656300000,
      "xMax": 1738656600000,
      "yMin": 2812.44681,
      "yMax": 2812.44681,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738656900000,
      "xMax": 1738658100000,
      "yMin": 2814.03346,
      "yMax": 2814.03346,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738656900000,
      "xMax": 1738658100000,
      "yMin": 2812.60042,
      "yMax": 2812.60042,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738658400000,
      "xMax": 1738658700000,
      "yMin": 2814.76761,
      "yMax": 2814.76761,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738658400000,
      "xMax": 1738658700000,
      "yMin": 2814.53997,
      "yMax": 2814.53997,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738659000000,
      "xMax": 1738665300000,
      "yMin": 2815.91939,
      "yMax": 2815.91939,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738659000000,
      "xMax": 1738665300000,
      "yMin": 2814.29903,
      "yMax": 2814.29903,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738665600000,
      "xMax": 1738666200000,
      "yMin": 2813.90753,
      "yMax": 2813.90753,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738665600000,
      "xMax": 1738666200000,
      "yMin": 2813.50181,
      "yMax": 2813.50181,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738666500000,
      "xMax": 1738667400000,
      "yMin": 2814.38803,
      "yMax": 2814.38803,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738666500000,
      "xMax": 1738667400000,
      "yMin": 2813.94031,
      "yMax": 2813.94031,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738668600000,
      "xMax": 1738669500000,
      "yMin": 2815.06634,
      "yMax": 2815.06634,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738668600000,
      "xMax": 1738669500000,
      "yMin": 2814.58418,
      "yMax": 2814.58418,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738670100000,
      "xMax": 1738670400000,
      "yMin": 2815.14097,
      "yMax": 2815.14097,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738670100000,
      "xMax": 1738670400000,
      "yMin": 2814.83269,
      "yMax": 2814.83269,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738672200000,
      "xMax": 1738672800000,
      "yMin": 2817.12908,
      "yMax": 2817.12908,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738672200000,
      "xMax": 1738672800000,
      "yMin": 2816.1311600000004,
      "yMax": 2816.1311600000004,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738675500000,
      "xMax": 1738677000000,
      "yMin": 2826.21061,
      "yMax": 2826.21061,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738675500000,
      "xMax": 1738677000000,
      "yMin": 2823.21097,
      "yMax": 2823.21097,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738677300000,
      "xMax": 1738677600000,
      "yMin": 2831.64172,
      "yMax": 2831.64172,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738677300000,
      "xMax": 1738677600000,
      "yMin": 2831.4804400000003,
      "yMax": 2831.4804400000003,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738679100000,
      "xMax": 1738684800000,
      "yMin": 2836.16219,
      "yMax": 2836.16219,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738679100000,
      "xMax": 1738684800000,
      "yMin": 2833.63463,
      "yMax": 2833.63463,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738685400000,
      "xMax": 1738854300000,
      "yMin": 2852.0731100000003,
      "yMax": 2852.0731100000003,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738685400000,
      "xMax": 1738854300000,
      "yMin": 2843.8234700000003,
      "yMax": 2843.8234700000003,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738856400000,
      "xMax": 1738861200000,
      "yMin": 2843.66763,
      "yMax": 2843.66763,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738856400000,
      "xMax": 1738861200000,
      "yMin": 2840.6495099999997,
      "yMax": 2840.6495099999997,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738862100000,
      "xMax": 1738863300000,
      "yMin": 2849.50583,
      "yMax": 2849.50583,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738862100000,
      "xMax": 1738863300000,
      "yMin": 2848.99091,
      "yMax": 2848.99091,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738864800000,
      "xMax": 1738865400000,
      "yMin": 2850.47385,
      "yMax": 2850.47385,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738864800000,
      "xMax": 1738865400000,
      "yMin": 2849.85645,
      "yMax": 2849.85645,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738867500000,
      "xMax": 1738868400000,
      "yMin": 2852.19871,
      "yMax": 2852.19871,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738867500000,
      "xMax": 1738868400000,
      "yMin": 2851.79467,
      "yMax": 2851.79467,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738868700000,
      "xMax": 1738870500000,
      "yMin": 2852.12498,
      "yMax": 2852.12498,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738868700000,
      "xMax": 1738870500000,
      "yMin": 2851.97546,
      "yMax": 2851.97546,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738871400000,
      "xMax": 1738935000000,
      "yMin": 2858.34421,
      "yMax": 2858.34421,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738871400000,
      "xMax": 1738935000000,
      "yMin": 2854.95817,
      "yMax": 2854.95817,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738935300000,
      "xMax": 1738936200000,
      "yMin": 2859.06728,
      "yMax": 2859.06728,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738935300000,
      "xMax": 1738936200000,
      "yMin": 2856.3725600000002,
      "yMax": 2856.3725600000002,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738936200000,
      "xMax": 1738936800000,
      "yMin": 2861.98688,
      "yMax": 2861.98688,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738936200000,
      "xMax": 1738936800000,
      "yMin": 2861.34176,
      "yMax": 2861.34176,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738937100000,
      "xMax": 1738948800000,
      "yMin": 2869.60179,
      "yMax": 2869.60179,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738937100000,
      "xMax": 1738948800000,
      "yMin": 2864.92383,
      "yMax": 2864.92383,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738948800000,
      "xMax": 1738949400000,
      "yMin": 2857.31943,
      "yMax": 2857.31943,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738948800000,
      "xMax": 1738949400000,
      "yMin": 2856.83811,
      "yMax": 2856.83811,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738951200000,
      "xMax": 1738956600000,
      "yMin": 2859.5063099999998,
      "yMax": 2859.5063099999998,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738951200000,
      "xMax": 1738956600000,
      "yMin": 2857.9598699999997,
      "yMax": 2857.9598699999997,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738957200000,
      "xMax": 1738958400000,
      "yMin": 2860.82707,
      "yMax": 2860.82707,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738957200000,
      "xMax": 1738958400000,
      "yMin": 2860.34239,
      "yMax": 2860.34239,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738958400000,
      "xMax": 1738959900000,
      "yMin": 2861.33266,
      "yMax": 2861.33266,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738958400000,
      "xMax": 1738959900000,
      "yMin": 2860.63882,
      "yMax": 2860.63882,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738960200000,
      "xMax": 1738960800000,
      "yMin": 2860.36962,
      "yMax": 2860.36962,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738960200000,
      "xMax": 1738960800000,
      "yMin": 2860.0487399999997,
      "yMax": 2860.0487399999997,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738962300000,
      "xMax": 1738964100000,
      "yMin": 2861.34543,
      "yMax": 2861.34543,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738962300000,
      "xMax": 1738964100000,
      "yMin": 2860.78011,
      "yMax": 2860.78011,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738964400000,
      "xMax": 1738965300000,
      "yMin": 2861.5297499999997,
      "yMax": 2861.5297499999997,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738964400000,
      "xMax": 1738965300000,
      "yMin": 2861.34075,
      "yMax": 2861.34075,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    },
    {
      "xMin": 1738965000000,
      "xMax": 1738965300000,
      "yMin": 2861.3227199999997,
      "yMax": 2861.3227199999997,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.618"
    },
    {
      "xMin": 1738965000000,
      "xMax": 1738965300000,
      "yMin": 2861.07744,
      "yMax": 2861.07744,
      "borderColor": "red",
      "borderWidth": 1,
      "typeof": "0.786"
    }
  ]
  
  const textLabels = [
    {
      xValue: 1738656000000,
      yValue: 2812.5,
      content: ["Important Level"],
      font: {
        size: 6,
        weight: "bold",
      },
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "white",
      textAlign: "center"
    }
  ];

  let annotations = rectangles.reduce((acc, rect, index) => {
    acc[`rectangle${index + 1}`] = {
      type: "box",
      xMin: rect.xMin,
      xMax: rect.xMax,
      yMin: rect.yMin,
      yMax: rect.yMax,
      backgroundColor: rect.backgroundColor,
      borderWidth: rect.borderWidth,
    };
    return acc;
  }, {});

  horizontalLines.forEach((line, index) => {
    annotations[`horizontalLine${index + 1}`] = {
      type: "line",
      xMin: line.xMin,
      xMax: line.xMax,
      yMin: line.yMin,
      yMax: line.yMax,
      borderColor: line.borderColor,
      borderWidth: line.borderWidth,
      borderDash: line.borderDash || [],
    };
  });

  textLabels.forEach((label, index) => {
    annotations[`textLabel${index + 1}`] = {
      type: "label",
      xValue: label.xValue,
      yValue: label.yValue,
      content: label.content,
      font: label.font,
      backgroundColor: label.backgroundColor,
      color: label.color,
      textAlign: label.textAlign,
    };
  });

  

  const data = {
    datasets: [
      {
        label: "Stock Prices",
        data: formattedData, // All 1000 candles are loaded.
        backgroundColors: {
          up: "rgba(0, 200, 0, 1)",
          down: "rgba(200, 0, 0, 1)",
        },
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
      // (Optional) Annotation configuration
      annotation: {
        annotations: annotations,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "minute",
        },
        // Set the initial view to show only the last 200 candles.
        min: initialXMin,
        max: initialXMax,
      },
      y: {
        beginAtZero: false,
      },
    },
  };

  // DRAG HANDLERS FOR THE Y-AXIS (Vertical Scale)
  useEffect(() => {
    const draggableBarY = document.getElementById("y-scale-draggable");

    const handleYMouseDown = (e) => {
      dragDataY.current.isDragging = true;
      dragDataY.current.startY = e.clientY;
      const chart = chartRef.current;
      if (chart) {
        const yScale = chart.scales.y;
        dragDataY.current.initialMin = yScale.min;
        dragDataY.current.initialMax = yScale.max;
      }
    };

    const handleYMouseMove = (e) => {
      if (!dragDataY.current.isDragging) return;
      const deltaY = e.clientY - dragDataY.current.startY;
      const sensitivity = 200; // Adjust sensitivity as needed
      let factor = 1 + deltaY / sensitivity;
      factor = Math.min(Math.max(factor, 0.1), 10);

      const { initialMin, initialMax } = dragDataY.current;
      const center = (initialMin + initialMax) / 2;
      const initialHalfRange = (initialMax - initialMin) / 2;
      const newHalfRange = initialHalfRange * factor;
      const newMin = center - newHalfRange;
      const newMax = center + newHalfRange;

      const chart = chartRef.current;
      if (chart) {
        chart.options.scales.y.min = newMin;
        chart.options.scales.y.max = newMax;
        chart.update("none");
      }
    };

    const handleYMouseUp = () => {
      dragDataY.current.isDragging = false;
    };

    if (draggableBarY) {
      draggableBarY.addEventListener("mousedown", handleYMouseDown);
    }
    window.addEventListener("mousemove", handleYMouseMove);
    window.addEventListener("mouseup", handleYMouseUp);

    return () => {
      if (draggableBarY) {
        draggableBarY.removeEventListener("mousedown", handleYMouseDown);
      }
      window.removeEventListener("mousemove", handleYMouseMove);
      window.removeEventListener("mouseup", handleYMouseUp);
    };
  }, []);

  // DRAG HANDLERS FOR THE X-AXIS (Horizontal Scale)
  useEffect(() => {
    const draggableBarX = document.getElementById("x-scale-draggable");

    const handleXMouseDown = (e) => {
      dragDataX.current.isDragging = true;
      dragDataX.current.startX = e.clientX;
      const chart = chartRef.current;
      if (chart) {
        const xScale = chart.scales.x;
        dragDataX.current.initialMin = xScale.min;
        dragDataX.current.initialMax = xScale.max;
      }
    };

    const handleXMouseMove = (e) => {
      if (!dragDataX.current.isDragging) return;
      const deltaX = e.clientX - dragDataX.current.startX;
      const sensitivity = 200; // Adjust sensitivity as needed
      let factor = 1 + deltaX / sensitivity;
      factor = Math.min(Math.max(factor, 0.1), 10);

      const { initialMin, initialMax } = dragDataX.current;
      // Convert the time values to numbers (timestamps) for calculation
      const initialMinTime = +new Date(initialMin);
      const initialMaxTime = +new Date(initialMax);
      const center = (initialMinTime + initialMaxTime) / 2;
      const initialHalfRange = (initialMaxTime - initialMinTime) / 2;
      const newHalfRange = initialHalfRange * factor;
      const newMin = center - newHalfRange;
      const newMax = center + newHalfRange;

      const chart = chartRef.current;
      if (chart) {
        chart.options.scales.x.min = newMin;
        chart.options.scales.x.max = newMax;
        chart.update("none");
      }
    };

    const handleXMouseUp = () => {
      dragDataX.current.isDragging = false;
    };

    if (draggableBarX) {
      draggableBarX.addEventListener("mousedown", handleXMouseDown);
    }
    window.addEventListener("mousemove", handleXMouseMove);
    window.addEventListener("mouseup", handleXMouseUp);

    return () => {
      if (draggableBarX) {
        draggableBarX.removeEventListener("mousedown", handleXMouseDown);
      }
      window.removeEventListener("mousemove", handleXMouseMove);
      window.removeEventListener("mouseup", handleXMouseUp);
    };
  }, []);

  // OPTIONAL: Reset both x and y axis scales to auto (and initial view for x-axis)
  const resetZoom = () => {
    const chart = chartRef.current;
    if (chart) {
      // Remove manual overrides for the y-axis
      delete chart.options.scales.y.min;
      delete chart.options.scales.y.max;
      // Reset the x-axis to the last 200 candles view
      chart.options.scales.x.min = initialXMin;
      chart.options.scales.x.max = initialXMax;
      chart.update("none");
    }
  };

  // Cleanup the chart instance when the component unmounts
  useEffect(() => {
    const chartInstance = chartRef.current;
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="chart-container" style={{ position: "relative" }}>
      {/* Reset Zoom Button */}
      <button onClick={resetZoom} style={{ marginBottom: "5px" }}>
        Reset Zoom
      </button>
      <ReactChart
        ref={chartRef}
        type="candlestick"
        data={data}
        options={options}
        style={{ backgroundColor: "lightGray" }}
      />
      {/* Draggable bar for the Y-axis (right side) */}
      <div
        id="y-scale-draggable"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "20px",
          height: "100%",
          cursor: "ns-resize",
          zIndex: 10,
          backgroundColor: "rgba(0, 0, 0, 0.05)",
        }}
      />
      {/* Draggable bar for the X-axis (bottom) */}
      <div
        id="x-scale-draggable"
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "20px",
          cursor: "ew-resize",
          zIndex: 10,
          backgroundColor: "rgba(0, 0, 0, 0.05)",
        }}
      />
    </div>
  );
};

export default CandlestickChart;










// import React, { useEffect, useRef } from "react";
// import {
//   Chart,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   registerables,
// } from "chart.js";
// import { Chart as ReactChart } from "react-chartjs-2";
// import zoomPlugin from "chartjs-plugin-zoom";
// import annotationPlugin from "chartjs-plugin-annotation";
// import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
// import formattedData from "./formattedArray.json";

// // Register required components and plugins
// Chart.register(
//   ...registerables,
//   zoomPlugin,
//   annotationPlugin,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   CandlestickController,
//   CandlestickElement
// );

// const CandlestickChart = () => {
//   const chartRef = useRef(null);

//   // Example rectangles array.
//   // Note: For a category x-axis, the xMin and xMax values should be indices.


//   // Transform your data:
//   // • Use the data index (0, 1, 2, …) as the x value so that candles are evenly spaced.
//   // • Preserve the original date (from your JSON) in a separate property ("date").
//   const transformedData = formattedData.map((d, i) => ({
//     x: i, // use index as the x-axis coordinate
//     o: d.o,
//     h: d.h,
//     l: d.l,
//     c: d.c,
//     date: d.x, // preserve the original date for display in tooltips or labels
//   }));

//   // Build an array of labels (the original dates) for the x-axis.
//   const labels = transformedData.map((d) => d.date);

//   // Define the initial view: only show the last 200 candles.
//   const totalCandles = transformedData.length;
//   const initialMinIndex = totalCandles >= 200 ? totalCandles - 200 : 0;
//   const initialMaxIndex = totalCandles - 1;

//   // The full dataset is provided so that users can pan/zoom to see earlier candles.
//   const data = {
//     labels: labels, // x-axis labels (dates)
//     datasets: [
//       {
//         label: "XAUSD Price",
//         data: transformedData, // Each data point has x (index), o, h, l, c, and date.
//         backgroundColors: {
//           up: "rgba(0, 200, 0, 1)",
//           down: "rgba(200, 0, 0, 1)",
//         },
//         borderWidth: 0.5,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       tooltip: {
//         // Use the preserved "date" value for the tooltip title.
//         callbacks: {
//           title: (context) => {
//             const idx = context[0].dataIndex;
//             return labels[idx];
//           },
//         },
//       },
//       // Annotation plugin configuration using the rectangles array.
//       annotation: {
//         annotations: rectangles.reduce((acc, rect, index) => {
//           acc[`rectangle${index + 1}`] = {
//             type: "box",
//             xMin: rect.xMin,
//             xMax: rect.xMax,
//             yMin: rect.yMin,
//             yMax: rect.yMax,
//             backgroundColor: rect.backgroundColor,
//             borderColor: rect.borderColor,
//             borderWidth: rect.borderWidth,
//           };
//           return acc;
//         }, {}),
//       },
//       zoom: {
//         pan: { enabled: true, mode: "xy" },
//         zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: "xy" },
//       },
//     },
//     scales: {
//       // Use a category scale so that the x-axis is evenly spaced and gaps disappear.
//       x: {
//         type: "category",
//         min: initialMinIndex,
//         max: initialMaxIndex,
//         ticks: {
//           // Use the original date for tick labels.
//           callback: (value) => labels[value],
//         },
//       },
//       y: {
//         beginAtZero: false,
//       },
//     },
//   };

//   // --- DRAGGABLE BARS LOGIC (For X and Y axes) ---
//   const dragDataX = useRef({
//     isDragging: false,
//     startX: 0,
//     initialMin: null,
//     initialMax: null,
//   });
//   const dragDataY = useRef({
//     isDragging: false,
//     startY: 0,
//     initialMin: null,
//     initialMax: null,
//   });

//   // Drag handlers for the Y-axis (vertical scale).
//   useEffect(() => {
//     const draggableBarY = document.getElementById("y-scale-draggable");

//     const handleYMouseDown = (e) => {
//       dragDataY.current.isDragging = true;
//       dragDataY.current.startY = e.clientY;
//       const chart = chartRef.current;
//       if (chart) {
//         const yScale = chart.scales.y;
//         dragDataY.current.initialMin = yScale.min;
//         dragDataY.current.initialMax = yScale.max;
//       }
//     };

//     const handleYMouseMove = (e) => {
//       if (!dragDataY.current.isDragging) return;
//       const deltaY = e.clientY - dragDataY.current.startY;
//       const sensitivity = 200;
//       let factor = 1 + deltaY / sensitivity;
//       factor = Math.min(Math.max(factor, 0.1), 10);

//       const { initialMin, initialMax } = dragDataY.current;
//       const center = (initialMin + initialMax) / 2;
//       const halfRange = (initialMax - initialMin) / 2;
//       const newHalfRange = halfRange * factor;
//       const newMin = center - newHalfRange;
//       const newMax = center + newHalfRange;

//       const chart = chartRef.current;
//       if (chart) {
//         chart.options.scales.y.min = newMin;
//         chart.options.scales.y.max = newMax;
//         chart.update("none");
//       }
//     };

//     const handleYMouseUp = () => {
//       dragDataY.current.isDragging = false;
//     };

//     if (draggableBarY) {
//       draggableBarY.addEventListener("mousedown", handleYMouseDown);
//     }
//     window.addEventListener("mousemove", handleYMouseMove);
//     window.addEventListener("mouseup", handleYMouseUp);

//     return () => {
//       if (draggableBarY) {
//         draggableBarY.removeEventListener("mousedown", handleYMouseDown);
//       }
//       window.removeEventListener("mousemove", handleYMouseMove);
//       window.removeEventListener("mouseup", handleYMouseUp);
//     };
//   }, []);

//   // Drag handlers for the X-axis (horizontal scale).
//   useEffect(() => {
//     const draggableBarX = document.getElementById("x-scale-draggable");

//     const handleXMouseDown = (e) => {
//       dragDataX.current.isDragging = true;
//       dragDataX.current.startX = e.clientX;
//       const chart = chartRef.current;
//       if (chart) {
//         const xScale = chart.scales.x;
//         dragDataX.current.initialMin = xScale.min;
//         dragDataX.current.initialMax = xScale.max;
//       }
//     };

//     const handleXMouseMove = (e) => {
//       if (!dragDataX.current.isDragging) return;
//       const deltaX = e.clientX - dragDataX.current.startX;
//       const sensitivity = 200;
//       let factor = 1 + deltaX / sensitivity;
//       factor = Math.min(Math.max(factor, 0.1), 10);

//       const { initialMin, initialMax } = dragDataX.current;
//       const center = (initialMin + initialMax) / 2;
//       const halfRange = (initialMax - initialMin) / 2;
//       const newHalfRange = halfRange * factor;
//       const newMin = center - newHalfRange;
//       const newMax = center + newHalfRange;

//       const chart = chartRef.current;
//       if (chart) {
//         chart.options.scales.x.min = newMin;
//         chart.options.scales.x.max = newMax;
//         chart.update("none");
//       }
//     };

//     const handleXMouseUp = () => {
//       dragDataX.current.isDragging = false;
//     };

//     if (draggableBarX) {
//       draggableBarX.addEventListener("mousedown", handleXMouseDown);
//     }
//     window.addEventListener("mousemove", handleXMouseMove);
//     window.addEventListener("mouseup", handleXMouseUp);

//     return () => {
//       if (draggableBarX) {
//         draggableBarX.removeEventListener("mousedown", handleXMouseDown);
//       }
//       window.removeEventListener("mousemove", handleXMouseMove);
//       window.removeEventListener("mouseup", handleXMouseUp);
//     };
//   }, []);

//   // Reset button to return to the initial view (last 200 candles for the x‑axis).
//   const resetZoom = () => {
//     const chart = chartRef.current;
//     if (chart) {
//       // Reset y‑axis overrides.
//       delete chart.options.scales.y.min;
//       delete chart.options.scales.y.max;
//       // Reset x‑axis to the initial view.
//       chart.options.scales.x.min = initialMinIndex;
//       chart.options.scales.x.max = initialMaxIndex;
//       chart.update("none");
//     }
//   };

//   return (
//     <div className="chart-container" style={{ position: "relative" }}>
//       {/* Reset Zoom Button */}
//       <button onClick={resetZoom} style={{ marginBottom: "5px" }}>
//         Reset Zoom
//       </button>
//       <ReactChart
//         ref={chartRef}
//         type="candlestick"
//         data={data}
//         options={options}
//         style={{ backgroundColor: "lightGray" }}
//       />
//       {/* Draggable bar for the Y‑axis (right side) */}
//       <div
//         id="y-scale-draggable"
//         style={{
//           position: "absolute",
//           right: 0,
//           top: 0,
//           width: "20px",
//           height: "100%",
//           cursor: "ns-resize",
//           zIndex: 10,
//           backgroundColor: "rgba(0, 0, 0, 0.05)",
//         }}
//       ></div>
//       {/* Draggable bar for the X‑axis (bottom) */}
//       <div
//         id="x-scale-draggable"
//         style={{
//           position: "absolute",
//           left: 0,
//           bottom: 0,
//           width: "100%",
//           height: "20px",
//           cursor: "ew-resize",
//           zIndex: 10,
//           backgroundColor: "rgba(0, 0, 0, 0.05)",
//         }}
//       ></div>
//     </div>
//   );
// };

// export default CandlestickChart;





const rectangles = [
  {
    "type": "box",
    "xMin": 1737623100000,
    "xMax": 1737631500000,
    "yMin": 2741.025,
    "yMax": 2753.835,
    "backgroundColor": "rgba(174, 43, 163, 0.08)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737632700000,
    "xMax": 1737633300000,
    "yMin": 2751.83,
    "yMax": 2753.965,
    "backgroundColor": "rgba(60, 28, 165, 0.17)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737633900000,
    "xMax": 1737650400000,
    "yMin": 2735.97,
    "yMax": 2753.435,
    "backgroundColor": "rgba(223, 73, 131, 0.02)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737651000000,
    "xMax": 1737654000000,
    "yMin": 2752.435,
    "yMax": 2757.49,
    "backgroundColor": "rgba(10, 206, 91, 0.09)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737654300000,
    "xMax": 1737679200000,
    "yMin": 2751.39,
    "yMax": 2758.97,
    "backgroundColor": "rgba(235, 26, 164, 0.03)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737679500000,
    "xMax": 1737680700000,
    "yMin": 2759.16,
    "yMax": 2761.1,
    "backgroundColor": "rgba(139, 62, 115, 0.10)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737681000000,
    "xMax": 1737683700000,
    "yMin": 2758.695,
    "yMax": 2762.06,
    "backgroundColor": "rgba(83, 56, 25, 0.17)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737685200000,
    "xMax": 1737686100000,
    "yMin": 2767.87,
    "yMax": 2771.605,
    "backgroundColor": "rgba(57, 21, 19, 0.09)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737687600000,
    "xMax": 1737698700000,
    "yMin": 2770.645,
    "yMax": 2777.425,
    "backgroundColor": "rgba(112, 200, 183, 0.14)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737699000000,
    "xMax": 1737718200000,
    "yMin": 2770.14,
    "yMax": 2778.35,
    "backgroundColor": "rgba(31, 42, 118, 0.06)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737718500000,
    "xMax": 1737723600000,
    "yMin": 2775.545,
    "yMax": 2780.175,
    "backgroundColor": "rgba(254, 40, 137, 0.16)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737724800000,
    "xMax": 1737726000000,
    "yMin": 2780.395,
    "yMax": 2783.535,
    "backgroundColor": "rgba(5, 56, 167, 0.19)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737726300000,
    "xMax": 1737732000000,
    "yMin": 2773.945,
    "yMax": 2784.705,
    "backgroundColor": "rgba(30, 192, 52, 0.18)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737626100000,
    "xMax": 1737627300000,
    "yMin": 2745.335,
    "yMax": 2747.34,
    "backgroundColor": "rgba(151, 47, 221, 0.01)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737636900000,
    "xMax": 1737642600000,
    "yMin": 2735.97,
    "yMax": 2746.585,
    "backgroundColor": "rgba(153, 19, 63, 0.05)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737644400000,
    "xMax": 1737646500000,
    "yMin": 2742.19,
    "yMax": 2746.94,
    "backgroundColor": "rgba(145, 75, 235, 0.06)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737647100000,
    "xMax": 1737648900000,
    "yMin": 2744.335,
    "yMax": 2749.52,
    "backgroundColor": "rgba(171, 12, 34, 0.02)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737652500000,
    "xMax": 1737653400000,
    "yMin": 2754.025,
    "yMax": 2755.67,
    "backgroundColor": "rgba(181, 136, 8, 0.10)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737657000000,
    "xMax": 1737678600000,
    "yMin": 2751.39,
    "yMax": 2758.275,
    "backgroundColor": "rgba(145, 175, 191, 0.10)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737680100000,
    "xMax": 1737680700000,
    "yMin": 2759.16,
    "yMax": 2760.92,
    "backgroundColor": "rgba(7, 240, 97, 0.04)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737682500000,
    "xMax": 1737683700000,
    "yMin": 2758.695,
    "yMax": 2760.86,
    "backgroundColor": "rgba(75, 122, 1, 0.08)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737690300000,
    "xMax": 1737693300000,
    "yMin": 2770.645,
    "yMax": 2774.455,
    "backgroundColor": "rgba(226, 2, 206, 0.11)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737697200000,
    "xMax": 1737698700000,
    "yMin": 2773.425,
    "yMax": 2776.69,
    "backgroundColor": "rgba(171, 17, 141, 0.13)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737700500000,
    "xMax": 1737710400000,
    "yMin": 2770.14,
    "yMax": 2776.9,
    "backgroundColor": "rgba(1, 69, 87, 0.06)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737711000000,
    "xMax": 1737718200000,
    "yMin": 2771.11,
    "yMax": 2777.88,
    "backgroundColor": "rgba(1, 81, 191, 0.10)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737719400000,
    "xMax": 1737720900000,
    "yMin": 2775.545,
    "yMax": 2778.16,
    "backgroundColor": "rgba(75, 212, 181, 0.12)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737721800000,
    "xMax": 1737723600000,
    "yMin": 2777.085,
    "yMax": 2779.165,
    "backgroundColor": "rgba(165, 189, 27, 0.01)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737725400000,
    "xMax": 1737726000000,
    "yMin": 2780.395,
    "yMax": 2782.77,
    "backgroundColor": "rgba(220, 28, 10, 0.12)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737727500000,
    "xMax": 1737732000000,
    "yMin": 2773.945,
    "yMax": 2784.395,
    "backgroundColor": "rgba(159, 184, 241, 0.13)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737735000000,
    "xMax": 1737736800000,
    "yMin": 2773.905,
    "yMax": 2777.55,
    "backgroundColor": "rgba(65, 177, 91, 0.16)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737740100000,
    "xMax": 1738109700000,
    "yMin": 2730.555,
    "yMax": 2776.195,
    "backgroundColor": "rgba(62, 203, 27, 0.02)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737639000000,
    "xMax": 1737640800000,
    "yMin": 2735.97,
    "yMax": 2742.835,
    "backgroundColor": "rgba(108, 66, 14, 0.16)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737641100000,
    "xMax": 1737641700000,
    "yMin": 2740.39,
    "yMax": 2744.215,
    "backgroundColor": "rgba(227, 103, 136, 0.05)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737642000000,
    "xMax": 1737642600000,
    "yMin": 2743.99,
    "yMax": 2746.395,
    "backgroundColor": "rgba(28, 253, 85, 0.11)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737645300000,
    "xMax": 1737646500000,
    "yMin": 2742.385,
    "yMax": 2745.46,
    "backgroundColor": "rgba(185, 148, 232, 0.19)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737658500000,
    "xMax": 1737659400000,
    "yMin": 2755.105,
    "yMax": 2756.42,
    "backgroundColor": "rgba(90, 6, 120, 0.14)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737660300000,
    "xMax": 1737678600000,
    "yMin": 2751.39,
    "yMax": 2758.12,
    "backgroundColor": "rgba(76, 21, 149, 0.05)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737691500000,
    "xMax": 1737693000000,
    "yMin": 2770.645,
    "yMax": 2773.5,
    "backgroundColor": "rgba(166, 244, 174, 0.11)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737702300000,
    "xMax": 1737709500000,
    "yMin": 2770.14,
    "yMax": 2775.475,
    "backgroundColor": "rgba(180, 224, 13, 0.18)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737713400000,
    "xMax": 1737715500000,
    "yMin": 2771.715,
    "yMax": 2774.605,
    "backgroundColor": "rgba(95, 50, 198, 0.04)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737716400000,
    "xMax": 1737717600000,
    "yMin": 2774.155,
    "yMax": 2776.56,
    "backgroundColor": "rgba(209, 176, 100, 0.16)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737720000000,
    "xMax": 1737720600000,
    "yMin": 2776.21,
    "yMax": 2777.24,
    "backgroundColor": "rgba(38, 221, 109, 0.12)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737729900000,
    "xMax": 1737731400000,
    "yMin": 2776.195,
    "yMax": 2782.23,
    "backgroundColor": "rgba(145, 31, 5, 0.05)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737735600000,
    "xMax": 1737736200000,
    "yMin": 2774.185,
    "yMax": 2776.27,
    "backgroundColor": "rgba(163, 167, 88, 0.14)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737741900000,
    "xMax": 1737743400000,
    "yMin": 2771.88,
    "yMax": 2774.095,
    "backgroundColor": "rgba(9, 230, 31, 0.02)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737743700000,
    "xMax": 1737744600000,
    "yMin": 2772.775,
    "yMax": 2774.15,
    "backgroundColor": "rgba(146, 123, 71, 0.03)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737746100000,
    "xMax": 1737747000000,
    "yMin": 2771.415,
    "yMax": 2772.98,
    "backgroundColor": "rgba(13, 49, 73, 0.03)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737748200000,
    "xMax": 1738109700000,
    "yMin": 2730.555,
    "yMax": 2775.35,
    "backgroundColor": "rgba(8, 169, 51, 0.01)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737661800000,
    "xMax": 1737678600000,
    "yMin": 2751.39,
    "yMax": 2757.275,
    "backgroundColor": "rgba(139, 22, 45, 0.12)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737702900000,
    "xMax": 1737703500000,
    "yMin": 2772.835,
    "yMax": 2773.715,
    "backgroundColor": "rgba(130, 251, 115, 0.18)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737704700000,
    "xMax": 1737708300000,
    "yMin": 2770.14,
    "yMax": 2775.445,
    "backgroundColor": "rgba(24, 237, 231, 0.13)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737749700000,
    "xMax": 1738109700000,
    "yMin": 2730.555,
    "yMax": 2774.805,
    "backgroundColor": "rgba(145, 43, 215, 0.00)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737663600000,
    "xMax": 1737669300000,
    "yMin": 2751.98,
    "yMax": 2754.72,
    "backgroundColor": "rgba(238, 206, 242, 0.16)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737673200000,
    "xMax": 1737675000000,
    "yMin": 2753.665,
    "yMax": 2755.19,
    "backgroundColor": "rgba(100, 174, 217, 0.15)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737675300000,
    "xMax": 1737677100000,
    "yMin": 2754.055,
    "yMax": 2755.74,
    "backgroundColor": "rgba(168, 170, 165, 0.08)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737707400000,
    "xMax": 1737708000000,
    "yMin": 2770.14,
    "yMax": 2772.655,
    "backgroundColor": "rgba(224, 115, 237, 0.03)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737751800000,
    "xMax": 1738109700000,
    "yMin": 2730.555,
    "yMax": 2773.31,
    "backgroundColor": "rgba(195, 174, 74, 0.20)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737665700000,
    "xMax": 1737669000000,
    "yMin": 2752.215,
    "yMax": 2754.235,
    "backgroundColor": "rgba(34, 135, 235, 0.14)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737752700000,
    "xMax": 1737939600000,
    "yMin": 2765.455,
    "yMax": 2772.245,
    "backgroundColor": "rgba(62, 53, 102, 0.13)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737939900000,
    "xMax": 1738109700000,
    "yMin": 2730.555,
    "yMax": 2772.645,
    "backgroundColor": "rgba(135, 250, 172, 0.15)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737755400000,
    "xMax": 1737939600000,
    "yMin": 2765.455,
    "yMax": 2771.97,
    "backgroundColor": "rgba(23, 72, 62, 0.08)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737940800000,
    "xMax": 1737978900000,
    "yMin": 2747.43,
    "yMax": 2771.145,
    "backgroundColor": "rgba(11, 244, 9, 0.06)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737981000000,
    "xMax": 1737981900000,
    "yMin": 2760.595,
    "yMax": 2763.86,
    "backgroundColor": "rgba(79, 71, 124, 0.13)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737983700000,
    "xMax": 1738089300000,
    "yMin": 2730.555,
    "yMax": 2762.53,
    "backgroundColor": "rgba(58, 179, 21, 0.01)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738089900000,
    "xMax": 1738091100000,
    "yMin": 2761.36,
    "yMax": 2763.635,
    "backgroundColor": "rgba(172, 66, 228, 0.02)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738091400000,
    "xMax": 1738092300000,
    "yMin": 2762.3,
    "yMax": 2763.995,
    "backgroundColor": "rgba(78, 101, 91, 0.01)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738092900000,
    "xMax": 1738093800000,
    "yMin": 2763.645,
    "yMax": 2764.96,
    "backgroundColor": "rgba(45, 219, 224, 0.01)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738095000000,
    "xMax": 1738109700000,
    "yMin": 2762.305,
    "yMax": 2765.105,
    "backgroundColor": "rgba(55, 42, 179, 0.13)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737935100000,
    "xMax": 1737939300000,
    "yMin": 2766.385,
    "yMax": 2769.17,
    "backgroundColor": "rgba(36, 88, 223, 0.12)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737942600000,
    "xMax": 1737972000000,
    "yMin": 2747.43,
    "yMax": 2765.15,
    "backgroundColor": "rgba(71, 7, 163, 0.19)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737975000000,
    "xMax": 1737978900000,
    "yMin": 2765.23,
    "yMax": 2771.11,
    "backgroundColor": "rgba(250, 157, 227, 0.14)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737984900000,
    "xMax": 1738083300000,
    "yMin": 2730.555,
    "yMax": 2759.595,
    "backgroundColor": "rgba(132, 10, 167, 0.14)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738084200000,
    "xMax": 1738086300000,
    "yMin": 2757.75,
    "yMax": 2759.385,
    "backgroundColor": "rgba(9, 10, 177, 0.17)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738087800000,
    "xMax": 1738089000000,
    "yMin": 2759.525,
    "yMax": 2761.275,
    "backgroundColor": "rgba(111, 172, 1, 0.18)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738097100000,
    "xMax": 1738109700000,
    "yMin": 2762.305,
    "yMax": 2765.095,
    "backgroundColor": "rgba(29, 166, 93, 0.12)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737936600000,
    "xMax": 1737939000000,
    "yMin": 2766.795,
    "yMax": 2769.06,
    "backgroundColor": "rgba(138, 223, 183, 0.17)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737945000000,
    "xMax": 1737947400000,
    "yMin": 2754.745,
    "yMax": 2758.605,
    "backgroundColor": "rgba(156, 19, 119, 0.14)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737948300000,
    "xMax": 1737968700000,
    "yMin": 2747.43,
    "yMax": 2762.725,
    "backgroundColor": "rgba(24, 18, 173, 0.08)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737969000000,
    "xMax": 1737972000000,
    "yMin": 2760.085,
    "yMax": 2765.045,
    "backgroundColor": "rgba(187, 48, 64, 0.18)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737976800000,
    "xMax": 1737977700000,
    "yMin": 2768.235,
    "yMax": 2770.19,
    "backgroundColor": "rgba(78, 214, 57, 0.18)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737978000000,
    "xMax": 1737978600000,
    "yMin": 2769.325,
    "yMax": 2770.94,
    "backgroundColor": "rgba(128, 7, 88, 0.02)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737986100000,
    "xMax": 1738080300000,
    "yMin": 2730.555,
    "yMax": 2758.195,
    "backgroundColor": "rgba(181, 121, 138, 0.04)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738080600000,
    "xMax": 1738082700000,
    "yMin": 2755.425,
    "yMax": 2758.485,
    "backgroundColor": "rgba(250, 101, 102, 0.00)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738099200000,
    "xMax": 1738100400000,
    "yMin": 2763.05,
    "yMax": 2763.78,
    "backgroundColor": "rgba(242, 46, 115, 0.02)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738101300000,
    "xMax": 1738105500000,
    "yMin": 2762.525,
    "yMax": 2764.04,
    "backgroundColor": "rgba(137, 172, 195, 0.18)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738106400000,
    "xMax": 1738109700000,
    "yMin": 2762.305,
    "yMax": 2764.28,
    "backgroundColor": "rgba(60, 106, 150, 0.15)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737945600000,
    "xMax": 1737947400000,
    "yMin": 2755.28,
    "yMax": 2758.405,
    "backgroundColor": "rgba(54, 218, 38, 0.07)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737949200000,
    "xMax": 1737968700000,
    "yMin": 2747.43,
    "yMax": 2762.49,
    "backgroundColor": "rgba(51, 200, 18, 0.12)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737970200000,
    "xMax": 1737971100000,
    "yMin": 2760.675,
    "yMax": 2763.465,
    "backgroundColor": "rgba(151, 121, 28, 0.05)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737971400000,
    "xMax": 1737972000000,
    "yMin": 2762.815,
    "yMax": 2764.87,
    "backgroundColor": "rgba(37, 70, 156, 0.15)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737987000000,
    "xMax": 1738077300000,
    "yMin": 2730.555,
    "yMax": 2756.405,
    "backgroundColor": "rgba(193, 225, 49, 0.11)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738077600000,
    "xMax": 1738078500000,
    "yMin": 2754.69,
    "yMax": 2756.885,
    "backgroundColor": "rgba(215, 105, 98, 0.08)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738079400000,
    "xMax": 1738080000000,
    "yMin": 2755.05,
    "yMax": 2757.32,
    "backgroundColor": "rgba(152, 7, 182, 0.16)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738081800000,
    "xMax": 1738082400000,
    "yMin": 2755.425,
    "yMax": 2758.46,
    "backgroundColor": "rgba(149, 10, 151, 0.04)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738107600000,
    "xMax": 1738109700000,
    "yMin": 2762.305,
    "yMax": 2763.895,
    "backgroundColor": "rgba(89, 22, 196, 0.12)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737949800000,
    "xMax": 1737968700000,
    "yMin": 2747.43,
    "yMax": 2761.89,
    "backgroundColor": "rgba(138, 122, 28, 0.01)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737989100000,
    "xMax": 1738074600000,
    "yMin": 2730.555,
    "yMax": 2755.475,
    "backgroundColor": "rgba(49, 17, 176, 0.18)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738075200000,
    "xMax": 1738077300000,
    "yMin": 2751.185,
    "yMax": 2756.37,
    "backgroundColor": "rgba(75, 242, 211, 0.07)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737953700000,
    "xMax": 1737966900000,
    "yMin": 2747.43,
    "yMax": 2758.905,
    "backgroundColor": "rgba(118, 113, 43, 0.04)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737967200000,
    "xMax": 1737968400000,
    "yMin": 2755.495,
    "yMax": 2759.88,
    "backgroundColor": "rgba(131, 26, 156, 0.11)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737990600000,
    "xMax": 1737991200000,
    "yMin": 2741.36,
    "yMax": 2745.505,
    "backgroundColor": "rgba(207, 67, 29, 0.08)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737991500000,
    "xMax": 1738069200000,
    "yMin": 2730.555,
    "yMax": 2745.89,
    "backgroundColor": "rgba(219, 32, 7, 0.08)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738071600000,
    "xMax": 1738072800000,
    "yMin": 2746.34,
    "yMax": 2749.55,
    "backgroundColor": "rgba(145, 43, 168, 0.09)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738073100000,
    "xMax": 1738073700000,
    "yMin": 2749.015,
    "yMax": 2751.23,
    "backgroundColor": "rgba(79, 8, 70, 0.17)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738076400000,
    "xMax": 1738077000000,
    "yMin": 2751.185,
    "yMax": 2755.035,
    "backgroundColor": "rgba(86, 78, 94, 0.10)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737954900000,
    "xMax": 1737965700000,
    "yMin": 2747.43,
    "yMax": 2757.22,
    "backgroundColor": "rgba(169, 160, 215, 0.17)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737993000000,
    "xMax": 1738020300000,
    "yMin": 2730.555,
    "yMax": 2744.34,
    "backgroundColor": "rgba(110, 185, 127, 0.12)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738021200000,
    "xMax": 1738021800000,
    "yMin": 2740.77,
    "yMax": 2742.34,
    "backgroundColor": "rgba(199, 201, 34, 0.06)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738022400000,
    "xMax": 1738024200000,
    "yMin": 2739.935,
    "yMax": 2743.425,
    "backgroundColor": "rgba(168, 86, 246, 0.17)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738025100000,
    "xMax": 1738026000000,
    "yMin": 2740.71,
    "yMax": 2744.545,
    "backgroundColor": "rgba(96, 79, 10, 0.17)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738026900000,
    "xMax": 1738058700000,
    "yMin": 2734.885,
    "yMax": 2745.19,
    "backgroundColor": "rgba(91, 143, 68, 0.12)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738060200000,
    "xMax": 1738068900000,
    "yMin": 2741.1,
    "yMax": 2745.1,
    "backgroundColor": "rgba(13, 53, 212, 0.16)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737956100000,
    "xMax": 1737965700000,
    "yMin": 2747.43,
    "yMax": 2756.435,
    "backgroundColor": "rgba(10, 76, 68, 0.10)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737993600000,
    "xMax": 1738011900000,
    "yMin": 2730.555,
    "yMax": 2743.185,
    "backgroundColor": "rgba(207, 122, 218, 0.02)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738013400000,
    "xMax": 1738020300000,
    "yMin": 2739.615,
    "yMax": 2744.055,
    "backgroundColor": "rgba(100, 68, 62, 0.00)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738023000000,
    "xMax": 1738024200000,
    "yMin": 2739.935,
    "yMax": 2743.36,
    "backgroundColor": "rgba(189, 161, 121, 0.11)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738027800000,
    "xMax": 1738040700000,
    "yMin": 2738,
    "yMax": 2744.715,
    "backgroundColor": "rgba(147, 70, 97, 0.20)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738041000000,
    "xMax": 1738056600000,
    "yMin": 2734.885,
    "yMax": 2744.865,
    "backgroundColor": "rgba(55, 88, 247, 0.06)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738060800000,
    "xMax": 1738062600000,
    "yMin": 2741.1,
    "yMax": 2744.145,
    "backgroundColor": "rgba(154, 125, 25, 0.02)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738063800000,
    "xMax": 1738068600000,
    "yMin": 2741.355,
    "yMax": 2744.655,
    "backgroundColor": "rgba(215, 135, 86, 0.07)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737957000000,
    "xMax": 1737965700000,
    "yMin": 2747.43,
    "yMax": 2755.57,
    "backgroundColor": "rgba(209, 130, 233, 0.18)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737995700000,
    "xMax": 1738011900000,
    "yMin": 2730.555,
    "yMax": 2743.175,
    "backgroundColor": "rgba(137, 218, 129, 0.04)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738019100000,
    "xMax": 1738020300000,
    "yMin": 2739.615,
    "yMax": 2742.19,
    "backgroundColor": "rgba(248, 20, 239, 0.06)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738029300000,
    "xMax": 1738040400000,
    "yMin": 2738,
    "yMax": 2743.505,
    "backgroundColor": "rgba(78, 168, 189, 0.06)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738043400000,
    "xMax": 1738044300000,
    "yMin": 2740.925,
    "yMax": 2742.235,
    "backgroundColor": "rgba(107, 29, 205, 0.04)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738044900000,
    "xMax": 1738049100000,
    "yMin": 2739.26,
    "yMax": 2743.025,
    "backgroundColor": "rgba(181, 169, 193, 0.12)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738049400000,
    "xMax": 1738055100000,
    "yMin": 2734.885,
    "yMax": 2743.065,
    "backgroundColor": "rgba(144, 168, 120, 0.09)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738065300000,
    "xMax": 1738067400000,
    "yMin": 2741.355,
    "yMax": 2744.115,
    "backgroundColor": "rgba(174, 252, 146, 0.17)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737960600000,
    "xMax": 1737965700000,
    "yMin": 2747.43,
    "yMax": 2755.15,
    "backgroundColor": "rgba(72, 30, 235, 0.08)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737997200000,
    "xMax": 1737998400000,
    "yMin": 2730.555,
    "yMax": 2735.17,
    "backgroundColor": "rgba(88, 198, 65, 0.04)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737999300000,
    "xMax": 1738002600000,
    "yMin": 2732.565,
    "yMax": 2737.06,
    "backgroundColor": "rgba(211, 229, 98, 0.12)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738005600000,
    "xMax": 1738009800000,
    "yMin": 2737.055,
    "yMax": 2740.65,
    "backgroundColor": "rgba(238, 68, 117, 0.16)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738010100000,
    "xMax": 1738011900000,
    "yMin": 2740.81,
    "yMax": 2742.675,
    "backgroundColor": "rgba(192, 56, 89, 0.13)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738030200000,
    "xMax": 1738034400000,
    "yMin": 2738.525,
    "yMax": 2741.735,
    "backgroundColor": "rgba(172, 179, 67, 0.09)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738036200000,
    "xMax": 1738037100000,
    "yMin": 2738.67,
    "yMax": 2740.045,
    "backgroundColor": "rgba(191, 129, 67, 0.09)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738038600000,
    "xMax": 1738040100000,
    "yMin": 2739.755,
    "yMax": 2741.39,
    "backgroundColor": "rgba(116, 82, 47, 0.01)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738051200000,
    "xMax": 1738054200000,
    "yMin": 2734.885,
    "yMax": 2740.25,
    "backgroundColor": "rgba(75, 215, 59, 0.19)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737961200000,
    "xMax": 1737965700000,
    "yMin": 2747.43,
    "yMax": 2755.15,
    "backgroundColor": "rgba(7, 68, 133, 0.05)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737999900000,
    "xMax": 1738001100000,
    "yMin": 2733.17,
    "yMax": 2735.685,
    "backgroundColor": "rgba(118, 180, 148, 0.07)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738007100000,
    "xMax": 1738008300000,
    "yMin": 2737.89,
    "yMax": 2739.625,
    "backgroundColor": "rgba(179, 54, 54, 0.08)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738008600000,
    "xMax": 1738009800000,
    "yMin": 2738.665,
    "yMax": 2740.26,
    "backgroundColor": "rgba(102, 6, 135, 0.02)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738030800000,
    "xMax": 1738033800000,
    "yMin": 2738.525,
    "yMax": 2740.9,
    "backgroundColor": "rgba(240, 119, 159, 0.06)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738051800000,
    "xMax": 1738054200000,
    "yMin": 2734.885,
    "yMax": 2739.84,
    "backgroundColor": "rgba(24, 189, 255, 0.18)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737962400000,
    "xMax": 1737965400000,
    "yMin": 2747.43,
    "yMax": 2753.31,
    "backgroundColor": "rgba(95, 34, 207, 0.01)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738000500000,
    "xMax": 1738001100000,
    "yMin": 2733.17,
    "yMax": 2735.48,
    "backgroundColor": "rgba(250, 6, 110, 0.10)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738007700000,
    "xMax": 1738008300000,
    "yMin": 2738.255,
    "yMax": 2739.605,
    "backgroundColor": "rgba(32, 154, 233, 0.05)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738032300000,
    "xMax": 1738033800000,
    "yMin": 2738.54,
    "yMax": 2740.835,
    "backgroundColor": "rgba(109, 69, 79, 0.09)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737963600000,
    "xMax": 1737965100000,
    "yMin": 2749.4,
    "yMax": 2752.965,
    "backgroundColor": "rgba(209, 145, 77, 0.19)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737964500000,
    "xMax": 1737965100000,
    "yMin": 2749.4,
    "yMax": 2752.4,
    "backgroundColor": "rgba(161, 128, 165, 0.06)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737623100000,
    "xMax": 1737631500000,
    "yMin": 2741.025,
    "yMax": 2753.835,
    "backgroundColor": "rgba(122, 152, 255, 0.03)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737632700000,
    "xMax": 1737633300000,
    "yMin": 2751.83,
    "yMax": 2753.965,
    "backgroundColor": "rgba(32, 136, 194, 0.01)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737633900000,
    "xMax": 1737650400000,
    "yMin": 2735.97,
    "yMax": 2753.435,
    "backgroundColor": "rgba(240, 74, 213, 0.08)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737651000000,
    "xMax": 1737654000000,
    "yMin": 2752.435,
    "yMax": 2757.49,
    "backgroundColor": "rgba(208, 153, 171, 0.00)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737654300000,
    "xMax": 1737679200000,
    "yMin": 2751.39,
    "yMax": 2758.97,
    "backgroundColor": "rgba(134, 47, 187, 0.19)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737679500000,
    "xMax": 1737680700000,
    "yMin": 2759.16,
    "yMax": 2761.1,
    "backgroundColor": "rgba(51, 165, 236, 0.14)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737681000000,
    "xMax": 1737683700000,
    "yMin": 2758.695,
    "yMax": 2762.06,
    "backgroundColor": "rgba(207, 172, 39, 0.20)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737685200000,
    "xMax": 1737686100000,
    "yMin": 2767.87,
    "yMax": 2771.605,
    "backgroundColor": "rgba(64, 98, 253, 0.20)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737687600000,
    "xMax": 1737698700000,
    "yMin": 2770.645,
    "yMax": 2777.425,
    "backgroundColor": "rgba(47, 97, 114, 0.11)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737699000000,
    "xMax": 1737718200000,
    "yMin": 2770.14,
    "yMax": 2778.35,
    "backgroundColor": "rgba(205, 55, 20, 0.17)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737718500000,
    "xMax": 1737723600000,
    "yMin": 2775.545,
    "yMax": 2780.175,
    "backgroundColor": "rgba(100, 128, 170, 0.15)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737724800000,
    "xMax": 1737726000000,
    "yMin": 2780.395,
    "yMax": 2783.535,
    "backgroundColor": "rgba(37, 158, 155, 0.19)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1737726300000,
    "xMax": 1737732000000,
    "yMin": 2773.945,
    "yMax": 2784.705,
    "backgroundColor": "rgba(0, 160, 214, 0.07)",
    "borderColor": "green",
    "borderWidth": 0.5
  }
]

const lastnight = [
  {
    "type": "box",
    "xMin": 1738657200000,
    "xMax": 1738662000000,
    "yMin": 2811.855,
    "yMax": 2819.305,
    "backgroundColor": "rgba(143, 206, 48, 0.05)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738662600000,
    "xMax": 1738673400000,
    "yMin": 2812.89,
    "yMax": 2821.88,
    "backgroundColor": "rgba(174, 195, 145, 0.13)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738675800000,
    "xMax": 1738679100000,
    "yMin": 2829.03,
    "yMax": 2837.245,
    "backgroundColor": "rgba(63, 192, 144, 0.06)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738680600000,
    "xMax": 1738681200000,
    "yMin": 2838.08,
    "yMax": 2841.345,
    "backgroundColor": "rgba(122, 98, 168, 0.10)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738681800000,
    "xMax": 1738683000000,
    "yMin": 2840.205,
    "yMax": 2844.435,
    "backgroundColor": "rgba(221, 68, 108, 0.01)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738684500000,
    "xMax": 1738685400000,
    "yMin": 2832.685,
    "yMax": 2838.595,
    "backgroundColor": "rgba(126, 40, 1, 0.15)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738686300000,
    "xMax": 1738689300000,
    "yMin": 2839.435,
    "yMax": 2842.475,
    "backgroundColor": "rgba(220, 199, 101, 0.11)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738690200000,
    "xMax": 1738691400000,
    "yMin": 2841.81,
    "yMax": 2844.565,
    "backgroundColor": "rgba(162, 238, 5, 0.04)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738692900000,
    "xMax": 1738694400000,
    "yMin": 2842.735,
    "yMax": 2844.895,
    "backgroundColor": "rgba(215, 19, 235, 0.00)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738696200000,
    "xMax": 1738697700000,
    "yMin": 2841.98,
    "yMax": 2844.125,
    "backgroundColor": "rgba(85, 67, 208, 0.09)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738698000000,
    "xMax": 1738702500000,
    "yMin": 2841.045,
    "yMax": 2844.21,
    "backgroundColor": "rgba(101, 68, 64, 0.13)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738705200000,
    "xMax": 1738712700000,
    "yMin": 2840.645,
    "yMax": 2842.555,
    "backgroundColor": "rgba(29, 29, 172, 0.13)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738713600000,
    "xMax": 1738715100000,
    "yMin": 2840.735,
    "yMax": 2842.42,
    "backgroundColor": "rgba(113, 226, 201, 0.18)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738717200000,
    "xMax": 1738721100000,
    "yMin": 2839.8,
    "yMax": 2849.015,
    "backgroundColor": "rgba(183, 34, 142, 0.15)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738721400000,
    "xMax": 1738725600000,
    "yMin": 2847.92,
    "yMax": 2853.885,
    "backgroundColor": "rgba(69, 187, 211, 0.18)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738726200000,
    "xMax": 1738728600000,
    "yMin": 2851.895,
    "yMax": 2854.48,
    "backgroundColor": "rgba(204, 85, 0, 0.18)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738729500000,
    "xMax": 1738730400000,
    "yMin": 2855.395,
    "yMax": 2857.01,
    "backgroundColor": "rgba(61, 199, 104, 0.05)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738734600000,
    "xMax": 1738736400000,
    "yMin": 2857.27,
    "yMax": 2860.665,
    "backgroundColor": "rgba(190, 162, 221, 0.20)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738736700000,
    "xMax": 1738742100000,
    "yMin": 2855.02,
    "yMax": 2861.905,
    "backgroundColor": "rgba(89, 52, 78, 0.06)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738742400000,
    "xMax": 1738743300000,
    "yMin": 2863.755,
    "yMax": 2865.485,
    "backgroundColor": "rgba(40, 199, 212, 0.10)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738743900000,
    "xMax": 1738744800000,
    "yMin": 2864.775,
    "yMax": 2866.675,
    "backgroundColor": "rgba(78, 28, 148, 0.08)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738745100000,
    "xMax": 1738747200000,
    "yMin": 2865.505,
    "yMax": 2869.705,
    "backgroundColor": "rgba(68, 54, 190, 0.03)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738747800000,
    "xMax": 1738748400000,
    "yMin": 2869.29,
    "yMax": 2870.445,
    "backgroundColor": "rgba(195, 166, 208, 0.02)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738749600000,
    "xMax": 1738750800000,
    "yMin": 2869.56,
    "yMax": 2872.04,
    "backgroundColor": "rgba(62, 134, 36, 0.04)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738751400000,
    "xMax": 1738769100000,
    "yMin": 2858.73,
    "yMax": 2877.105,
    "backgroundColor": "rgba(38, 91, 123, 0.04)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738770600000,
    "xMax": 1738941300000,
    "yMin": 2834.26,
    "yMax": 2882.42,
    "backgroundColor": "rgba(67, 128, 11, 0.09)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738657800000,
    "xMax": 1738660800000,
    "yMin": 2811.855,
    "yMax": 2817.81,
    "backgroundColor": "rgba(219, 57, 105, 0.00)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738667100000,
    "xMax": 1738668600000,
    "yMin": 2813.355,
    "yMax": 2816.035,
    "backgroundColor": "rgba(85, 180, 245, 0.10)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738668900000,
    "xMax": 1738669800000,
    "yMin": 2814.36,
    "yMax": 2816.84,
    "backgroundColor": "rgba(211, 199, 241, 0.09)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738672500000,
    "xMax": 1738673100000,
    "yMin": 2819.105,
    "yMax": 2820.8,
    "backgroundColor": "rgba(168, 86, 89, 0.20)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738687200000,
    "xMax": 1738689000000,
    "yMin": 2839.435,
    "yMax": 2842.315,
    "backgroundColor": "rgba(50, 129, 9, 0.17)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738699500000,
    "xMax": 1738702500000,
    "yMin": 2841.045,
    "yMax": 2844.145,
    "backgroundColor": "rgba(200, 47, 75, 0.10)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738705800000,
    "xMax": 1738712700000,
    "yMin": 2840.645,
    "yMax": 2842.395,
    "backgroundColor": "rgba(46, 132, 142, 0.17)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738718100000,
    "xMax": 1738720800000,
    "yMin": 2839.8,
    "yMax": 2847.065,
    "backgroundColor": "rgba(84, 155, 174, 0.12)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738722300000,
    "xMax": 1738725000000,
    "yMin": 2847.92,
    "yMax": 2852.97,
    "backgroundColor": "rgba(121, 239, 216, 0.16)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738727400000,
    "xMax": 1738728600000,
    "yMin": 2851.895,
    "yMax": 2854.255,
    "backgroundColor": "rgba(206, 55, 226, 0.15)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738737300000,
    "xMax": 1738738200000,
    "yMin": 2859.905,
    "yMax": 2861.375,
    "backgroundColor": "rgba(20, 196, 178, 0.06)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738740600000,
    "xMax": 1738741500000,
    "yMin": 2857.66,
    "yMax": 2859.435,
    "backgroundColor": "rgba(59, 236, 91, 0.19)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738745700000,
    "xMax": 1738747200000,
    "yMin": 2865.505,
    "yMax": 2869.56,
    "backgroundColor": "rgba(244, 159, 0, 0.10)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738753500000,
    "xMax": 1738754700000,
    "yMin": 2864.86,
    "yMax": 2869.83,
    "backgroundColor": "rgba(155, 114, 53, 0.13)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738755300000,
    "xMax": 1738759800000,
    "yMin": 2867.11,
    "yMax": 2870.535,
    "backgroundColor": "rgba(197, 247, 193, 0.04)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738760100000,
    "xMax": 1738766700000,
    "yMin": 2858.73,
    "yMax": 2870.89,
    "backgroundColor": "rgba(129, 216, 240, 0.11)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738768500000,
    "xMax": 1738769100000,
    "yMin": 2873.07,
    "yMax": 2876.505,
    "backgroundColor": "rgba(139, 62, 153, 0.01)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738773300000,
    "xMax": 1738774200000,
    "yMin": 2869.64,
    "yMax": 2871.605,
    "backgroundColor": "rgba(92, 181, 80, 0.11)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738775100000,
    "xMax": 1738938900000,
    "yMin": 2834.26,
    "yMax": 2876.76,
    "backgroundColor": "rgba(214, 151, 211, 0.14)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738939200000,
    "xMax": 1738940400000,
    "yMin": 2873.19,
    "yMax": 2878.375,
    "backgroundColor": "rgba(4, 41, 201, 0.10)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738943700000,
    "xMax": 1738965300000,
    "yMin": 2853.435,
    "yMax": 2885.155,
    "backgroundColor": "rgba(237, 66, 242, 0.09)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738659300000,
    "xMax": 1738660500000,
    "yMin": 2814.21,
    "yMax": 2816.8,
    "backgroundColor": "rgba(92, 195, 43, 0.17)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738701900000,
    "xMax": 1738702500000,
    "yMin": 2842.69,
    "yMax": 2844.01,
    "backgroundColor": "rgba(117, 75, 60, 0.12)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738710600000,
    "xMax": 1738711800000,
    "yMin": 2840.645,
    "yMax": 2841.73,
    "backgroundColor": "rgba(139, 52, 220, 0.17)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738756200000,
    "xMax": 1738759800000,
    "yMin": 2867.11,
    "yMax": 2870.48,
    "backgroundColor": "rgba(3, 14, 206, 0.19)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738761900000,
    "xMax": 1738765800000,
    "yMin": 2858.73,
    "yMax": 2868.285,
    "backgroundColor": "rgba(34, 59, 12, 0.16)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738776300000,
    "xMax": 1738938300000,
    "yMin": 2834.26,
    "yMax": 2874.325,
    "backgroundColor": "rgba(152, 107, 52, 0.05)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738945200000,
    "xMax": 1738965300000,
    "yMin": 2853.435,
    "yMax": 2872.36,
    "backgroundColor": "rgba(167, 143, 241, 0.12)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738757100000,
    "xMax": 1738758600000,
    "yMin": 2867.875,
    "yMax": 2870.25,
    "backgroundColor": "rgba(162, 224, 107, 0.07)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738762800000,
    "xMax": 1738765800000,
    "yMin": 2858.73,
    "yMax": 2866.37,
    "backgroundColor": "rgba(157, 240, 219, 0.04)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738777500000,
    "xMax": 1738938300000,
    "yMin": 2834.26,
    "yMax": 2873.84,
    "backgroundColor": "rgba(47, 228, 175, 0.06)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738947000000,
    "xMax": 1738952100000,
    "yMin": 2853.435,
    "yMax": 2864.365,
    "backgroundColor": "rgba(87, 45, 82, 0.05)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738953300000,
    "xMax": 1738965300000,
    "yMin": 2859.21,
    "yMax": 2864.86,
    "backgroundColor": "rgba(247, 134, 69, 0.09)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738778400000,
    "xMax": 1738938300000,
    "yMin": 2834.26,
    "yMax": 2873.615,
    "backgroundColor": "rgba(156, 189, 85, 0.16)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738947900000,
    "xMax": 1738951500000,
    "yMin": 2853.435,
    "yMax": 2862.72,
    "backgroundColor": "rgba(177, 59, 59, 0.02)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738955400000,
    "xMax": 1738958700000,
    "yMin": 2859.21,
    "yMax": 2863.375,
    "backgroundColor": "rgba(58, 147, 246, 0.07)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738963500000,
    "xMax": 1738965300000,
    "yMin": 2860.58,
    "yMax": 2863.425,
    "backgroundColor": "rgba(53, 31, 57, 0.16)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738779300000,
    "xMax": 1738807200000,
    "yMin": 2860.02,
    "yMax": 2872.18,
    "backgroundColor": "rgba(211, 144, 8, 0.01)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738809000000,
    "xMax": 1738810200000,
    "yMin": 2869.88,
    "yMax": 2872.52,
    "backgroundColor": "rgba(55, 168, 73, 0.00)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738814400000,
    "xMax": 1738938300000,
    "yMin": 2834.26,
    "yMax": 2872.37,
    "backgroundColor": "rgba(159, 147, 74, 0.02)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738956300000,
    "xMax": 1738957500000,
    "yMin": 2859.21,
    "yMax": 2862.185,
    "backgroundColor": "rgba(22, 125, 128, 0.17)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738780200000,
    "xMax": 1738806900000,
    "yMin": 2860.02,
    "yMax": 2871.07,
    "backgroundColor": "rgba(222, 107, 171, 0.06)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738816200000,
    "xMax": 1738823400000,
    "yMin": 2865.505,
    "yMax": 2870.425,
    "backgroundColor": "rgba(43, 157, 194, 0.18)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738825800000,
    "xMax": 1738826700000,
    "yMin": 2859.25,
    "yMax": 2861.815,
    "backgroundColor": "rgba(64, 92, 118, 0.13)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738828800000,
    "xMax": 1738830900000,
    "yMin": 2849.07,
    "yMax": 2857.005,
    "backgroundColor": "rgba(0, 102, 211, 0.17)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738833300000,
    "xMax": 1738837200000,
    "yMin": 2855.775,
    "yMax": 2860.055,
    "backgroundColor": "rgba(254, 32, 9, 0.07)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738838100000,
    "xMax": 1738840500000,
    "yMin": 2858.05,
    "yMax": 2861.84,
    "backgroundColor": "rgba(44, 21, 100, 0.11)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738840800000,
    "xMax": 1738841700000,
    "yMin": 2858.39,
    "yMax": 2862.36,
    "backgroundColor": "rgba(173, 241, 117, 0.05)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738842600000,
    "xMax": 1738843200000,
    "yMin": 2864.6,
    "yMax": 2867.425,
    "backgroundColor": "rgba(168, 179, 126, 0.19)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738845000000,
    "xMax": 1738894500000,
    "yMin": 2834.26,
    "yMax": 2868.75,
    "backgroundColor": "rgba(157, 77, 134, 0.13)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738895100000,
    "xMax": 1738897200000,
    "yMin": 2867.335,
    "yMax": 2869.27,
    "backgroundColor": "rgba(189, 134, 30, 0.06)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738899600000,
    "xMax": 1738901700000,
    "yMin": 2866.15,
    "yMax": 2868.905,
    "backgroundColor": "rgba(66, 27, 205, 0.09)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738902000000,
    "xMax": 1738903500000,
    "yMin": 2868.15,
    "yMax": 2869.195,
    "backgroundColor": "rgba(169, 166, 48, 0.19)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738905300000,
    "xMax": 1738919100000,
    "yMin": 2859.11,
    "yMax": 2867.14,
    "backgroundColor": "rgba(184, 182, 145, 0.15)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738919400000,
    "xMax": 1738938000000,
    "yMin": 2852.55,
    "yMax": 2870.8,
    "backgroundColor": "rgba(52, 55, 90, 0.07)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738783200000,
    "xMax": 1738784100000,
    "yMin": 2866.475,
    "yMax": 2868.815,
    "backgroundColor": "rgba(176, 124, 254, 0.09)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738786200000,
    "xMax": 1738787100000,
    "yMin": 2862.32,
    "yMax": 2864.875,
    "backgroundColor": "rgba(217, 231, 255, 0.16)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738787400000,
    "xMax": 1738792200000,
    "yMin": 2860.02,
    "yMax": 2866.2,
    "backgroundColor": "rgba(165, 146, 164, 0.19)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738796400000,
    "xMax": 1738797600000,
    "yMin": 2866.175,
    "yMax": 2868.265,
    "backgroundColor": "rgba(112, 82, 253, 0.07)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738798200000,
    "xMax": 1738799100000,
    "yMin": 2867.6,
    "yMax": 2869.025,
    "backgroundColor": "rgba(200, 219, 137, 0.13)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738799400000,
    "xMax": 1738806900000,
    "yMin": 2863.795,
    "yMax": 2870.965,
    "backgroundColor": "rgba(254, 198, 16, 0.07)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738817700000,
    "xMax": 1738818900000,
    "yMin": 2866.995,
    "yMax": 2869.36,
    "backgroundColor": "rgba(211, 106, 60, 0.10)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738819200000,
    "xMax": 1738822800000,
    "yMin": 2865.505,
    "yMax": 2869.945,
    "backgroundColor": "rgba(252, 152, 13, 0.01)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738829700000,
    "xMax": 1738830900000,
    "yMin": 2849.07,
    "yMax": 2856.695,
    "backgroundColor": "rgba(125, 189, 65, 0.13)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738834500000,
    "xMax": 1738837200000,
    "yMin": 2855.775,
    "yMax": 2860.01,
    "backgroundColor": "rgba(11, 90, 177, 0.01)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738839000000,
    "xMax": 1738840500000,
    "yMin": 2858.05,
    "yMax": 2861.71,
    "backgroundColor": "rgba(71, 210, 115, 0.13)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738848000000,
    "xMax": 1738892400000,
    "yMin": 2834.26,
    "yMax": 2864.98,
    "backgroundColor": "rgba(239, 103, 234, 0.04)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738893300000,
    "xMax": 1738893900000,
    "yMin": 2865.615,
    "yMax": 2868.235,
    "backgroundColor": "rgba(219, 248, 117, 0.10)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738895700000,
    "xMax": 1738897200000,
    "yMin": 2867.335,
    "yMax": 2869.045,
    "backgroundColor": "rgba(152, 248, 68, 0.10)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738902600000,
    "xMax": 1738903500000,
    "yMin": 2868.15,
    "yMax": 2869.04,
    "backgroundColor": "rgba(18, 82, 61, 0.10)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738908600000,
    "xMax": 1738909200000,
    "yMin": 2861.91,
    "yMax": 2863.445,
    "backgroundColor": "rgba(82, 223, 225, 0.04)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738909500000,
    "xMax": 1738916100000,
    "yMin": 2859.11,
    "yMax": 2866.21,
    "backgroundColor": "rgba(22, 12, 147, 0.05)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738917000000,
    "xMax": 1738918200000,
    "yMin": 2863.41,
    "yMax": 2865.46,
    "backgroundColor": "rgba(139, 41, 122, 0.18)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738789200000,
    "xMax": 1738790700000,
    "yMin": 2861.265,
    "yMax": 2863.025,
    "backgroundColor": "rgba(117, 226, 187, 0.11)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738803600000,
    "xMax": 1738806900000,
    "yMin": 2863.795,
    "yMax": 2870.88,
    "backgroundColor": "rgba(52, 14, 47, 0.19)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738818300000,
    "xMax": 1738818900000,
    "yMin": 2866.995,
    "yMax": 2869.235,
    "backgroundColor": "rgba(9, 209, 172, 0.03)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738819800000,
    "xMax": 1738822500000,
    "yMin": 2865.505,
    "yMax": 2869.79,
    "backgroundColor": "rgba(37, 82, 176, 0.03)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738836000000,
    "xMax": 1738837200000,
    "yMin": 2855.775,
    "yMax": 2859.945,
    "backgroundColor": "rgba(230, 13, 94, 0.03)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738848900000,
    "xMax": 1738891200000,
    "yMin": 2834.26,
    "yMax": 2863.825,
    "backgroundColor": "rgba(143, 61, 2, 0.05)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738910400000,
    "xMax": 1738912200000,
    "yMin": 2859.11,
    "yMax": 2863.36,
    "backgroundColor": "rgba(35, 163, 6, 0.12)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738912500000,
    "xMax": 1738914600000,
    "yMin": 2863.21,
    "yMax": 2865.595,
    "backgroundColor": "rgba(69, 81, 84, 0.02)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738804800000,
    "xMax": 1738805400000,
    "yMin": 2865.835,
    "yMax": 2867.91,
    "backgroundColor": "rgba(87, 158, 49, 0.08)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738821900000,
    "xMax": 1738822500000,
    "yMin": 2868.195,
    "yMax": 2869.725,
    "backgroundColor": "rgba(225, 21, 186, 0.13)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738851900000,
    "xMax": 1738887600000,
    "yMin": 2834.26,
    "yMax": 2859.825,
    "backgroundColor": "rgba(112, 228, 139, 0.08)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738888500000,
    "xMax": 1738890900000,
    "yMin": 2857.98,
    "yMax": 2860.465,
    "backgroundColor": "rgba(235, 208, 17, 0.15)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738914000000,
    "xMax": 1738914600000,
    "yMin": 2863.43,
    "yMax": 2865.335,
    "backgroundColor": "rgba(116, 129, 185, 0.02)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738853100000,
    "xMax": 1738872300000,
    "yMin": 2834.26,
    "yMax": 2856.765,
    "backgroundColor": "rgba(152, 37, 51, 0.13)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738874400000,
    "xMax": 1738875000000,
    "yMin": 2853.895,
    "yMax": 2856.085,
    "backgroundColor": "rgba(137, 203, 15, 0.13)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738875600000,
    "xMax": 1738878000000,
    "yMin": 2855.01,
    "yMax": 2856.93,
    "backgroundColor": "rgba(122, 240, 242, 0.12)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738878300000,
    "xMax": 1738884000000,
    "yMin": 2855.86,
    "yMax": 2857.25,
    "backgroundColor": "rgba(167, 121, 15, 0.15)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738885200000,
    "xMax": 1738886400000,
    "yMin": 2856.875,
    "yMax": 2858.84,
    "backgroundColor": "rgba(212, 248, 144, 0.05)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738890300000,
    "xMax": 1738890900000,
    "yMin": 2858.485,
    "yMax": 2860.11,
    "backgroundColor": "rgba(53, 18, 216, 0.07)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738855200000,
    "xMax": 1738856100000,
    "yMin": 2844.025,
    "yMax": 2847.715,
    "backgroundColor": "rgba(224, 102, 211, 0.20)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738857000000,
    "xMax": 1738858500000,
    "yMin": 2849.23,
    "yMax": 2853.24,
    "backgroundColor": "rgba(216, 42, 74, 0.07)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738860000000,
    "xMax": 1738871400000,
    "yMin": 2848.18,
    "yMax": 2853.905,
    "backgroundColor": "rgba(12, 99, 126, 0.05)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738861500000,
    "xMax": 1738864200000,
    "yMin": 2848.87,
    "yMax": 2851.92,
    "backgroundColor": "rgba(43, 89, 103, 0.10)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738864500000,
    "xMax": 1738865100000,
    "yMin": 2851.28,
    "yMax": 2852.69,
    "backgroundColor": "rgba(148, 206, 100, 0.17)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738867500000,
    "xMax": 1738871400000,
    "yMin": 2850.48,
    "yMax": 2853.685,
    "backgroundColor": "rgba(132, 5, 1, 0.01)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738862400000,
    "xMax": 1738864200000,
    "yMin": 2848.98,
    "yMax": 2851.4,
    "backgroundColor": "rgba(56, 164, 119, 0.16)",
    "borderColor": "green",
    "borderWidth": 0.5
  },
  {
    "type": "box",
    "xMin": 1738869300000,
    "xMax": 1738871100000,
    "yMin": 2850.48,
    "yMax": 2852.675,
    "backgroundColor": "rgba(224, 164, 243, 0.12)",
    "borderColor": "green",
    "borderWidth": 0.5
  }
]