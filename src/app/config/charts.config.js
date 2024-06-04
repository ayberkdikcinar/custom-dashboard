const config = {
  pie: {
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
      },
    },
    margin: 5,
  },
  line: {
    data: [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ],
    xField: 'year',
    yField: 'value',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
    margin: 5,
  },
  bar: {
    data: {
      type: 'fetch',
      value: 'https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/bar-bar.json',
    },
    xField: 'letter',
    yField: 'frequency',
    sort: {
      reverse: true,
    },
    label: {
      text: 'frequency',
      formatter: '.1%',
      style: {
        textAnchor: (d) => (+d.frequency > 0.008 ? 'right' : 'start'),
        fill: (d) => (+d.frequency > 0.008 ? '#fff' : '#000'),
        dx: (d) => (+d.frequency > 0.008 ? -5 : 5),
      },
    },
    axis: {
      y: {
        labelFormatter: '.0%',
      },
    },
  },
  area: {
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/unemployment-by-industry.json',
    },
    xField: (d) => new Date(d.date),
    yField: 'unemployed',
    colorField: 'industry',
    shapeField: 'smooth',
    stack: true,
  },
  scatter: {
    data: {
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    },
    xField: 'height',
    yField: 'weight',
    colorField: 'gender',
  },
  gauge: {
    width: 720,
    height: 720,
    autoFit: true,
    data: {
      target: 159,
      total: 400,
      name: 'score',
      thresholds: [100, 200, 400],
    },
    legend: false,
    scale: {
      color: {
        range: ['#F4664A', '#FAAD14', 'green'],
      },
    },
    style: {
      textContent: (target, total) => `Target：${target}\nCurrent：${(target / total) * 100}%`,
    },
  },
  column: {
    data: {
      type: 'fetch',
      value: 'https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/column-column.json',
    },
    xField: 'letter',
    yField: 'frequency',
    label: {
      text: (d) => `${(d.frequency * 100).toFixed(1)}%`,
      textBaseline: 'bottom',
    },
    axis: {
      y: {
        labelFormatter: '.0%',
      },
    },
    style: {
      radiusTopLeft: 10,
      radiusTopRight: 10,
    },
  },
  waterfall: {
    data: [
      { x: 'Start', value: 23000000 },
      { x: 'Jan', value: 2200000 },
      { x: 'Feb', value: -4600000 },
      { x: 'Mar', value: -9100000 },
      { x: 'Apr', value: 3700000 },
      { x: 'May', value: -2100000 },
      { x: 'Jun', value: 5300000 },
      { x: 'Jul', value: 3100000 },
      { x: 'Aug', value: -1500000 },
      { x: 'Sep', value: 4200000 },
      { x: 'Oct', value: 5300000 },
      { x: 'Nov', value: -1500000 },
      { x: 'Dec', value: 5100000 },
      { x: 'End', isTotal: true, value: 33100000 },
    ],
    xField: 'x',
    yField: 'value',
    linkStyle: {
      lineDash: [4, 2],
      stroke: '#ccc',
    },
    style: {
      maxWidth: 20,
      stroke: '#ccc',
      fill: (d, idx) => {
        return idx === 0 || d.isTotal ? '#96a6a6' : d.value > 0 ? '#64b5f6' : '#ef6c00';
      },
    },
    label: {
      text: 'value',
      formatter: '~s',
      position: (d) => (d.value > 0 ? 'top' : 'bottom'),
      textBaseline: (d) => (d.value > 0 ? 'bottom' : 'top'),
      fontSize: 8,
      dy: (d) => (d.value > 0 ? -4 : 4),
    },
  },
};

export { config };
