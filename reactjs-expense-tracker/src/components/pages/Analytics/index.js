import React, { useState, useEffect } from "react";

import { Container, Row } from "react-bootstrap";

import ReactHighcharts from "react-highcharts";
import { fetchGraphData } from "../../../Apis/dashboard";

export default function Analytics() {
  const [config, setConfig] = useState({
    chart: {
      type: "column",
    },
    title: {
      text: "Monthly Expenses And Incomes",
    },
    subtitle: {
      text: "usage",
    },
    xAxis: {
      categories: [
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
        "Dec",
      ],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Amount ($)",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} $</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Expenses",
        // change data here
        data: [
          49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
          95.6, 54.4,
        ],
      },
      {
        name: "Incomes",
        // change data here
        data: [
          83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6,
          92.3,
        ],
      },
    ],
  });

  useEffect(() => {
    fetchGraphData().then((res) => {
      setConfig({
        ...config,
        xAxis: {
          categories: res.data.x
        },
        series: res.data.y
      });
    });
    return () => {

    }
  }, []);


  return (
    <Container style={{ marginTop: "70px" }}>
      <hr />
      <Row className="justify-content-center align-align-items-center">
        <ReactHighcharts config={config} isPureConfig />
      </Row>
    </Container>
  );
}
