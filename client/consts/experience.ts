const RESUME = [
  {
    name: "大连理工大学",
    period: "2013.9 ~ 2017.7",
    color: "#286FB7",
    value: new Date("2017-07-01").getTime() - new Date("2013-09-01").getTime(),
    type: 'edu',
    detail: "Bachelor Degree",
    location: 'Dalian, China'
  },
  {
    name: "University of Manchester",
    period: "2017.9 ~ 2019.01",
    color: "#660099",
    value: new Date("2019-01-01").getTime() - new Date("2017-09-01").getTime(),
    type: 'edu',
    detail: "Master Degree",
    location: 'Manchester, UK'
  },
  {
    name: "@Meituan",
    period: "2019.1 ~ 2021.1",
    color: "#EEBE00",
    value: new Date("2021-01-01").getTime() - new Date("2019-01-01").getTime(),
    type: 'work',
    detail: "美团民宿",
    location: 'Xiamen, China'
  },
  {
    name: "@Tencent",
    period: "2021.3 ~ now",
    color: "#286FB7",
    value: Date.now() - new Date("2021-03-01").getTime(),
    type: 'work',
    detail: "Tencent CDC",
    location: 'Shenzhen, China'
  },
];

export default RESUME;
