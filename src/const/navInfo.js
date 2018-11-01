export default [
  {
    id: 1,
    navId: 4,
    ballIndex: 2,
    name: '综合管理',
    iconId: 'pie-01',
    rotate: 0,
    pointX: 0,
    pointY: -210,
    textPointX: 0,
    textPointY: 40,
    children: [
      {
        name: '设备档案',
        iconId: 'ball-01',
        ballIndex: 0,
        path: '/nav/synthesis-manage',
        pointX: 0,
        pointY: -300
      }
    ]
  },
  {
    id: 2,
    navId: 5,
    ballIndex: 3,
    name: '智能诊断',
    iconId: 'pie-02',
    rotate: Math.PI / 2.3,
    pointX: 185,
    pointY: -70,
    textPointX: 20,
    textPointY: 25,
    children: [
      {
        name: '远程诊断',
        iconId: 'ball-02',
        ballIndex: 1,
        path: '/nav/remote',
        pointX: 260,
        pointY: -Math.sqrt(300 * 300 - 260 * 260)
      },
      {
        name: '机床体检',
        iconId: 'ball-03',
        ballIndex: 2,
        path: '/nav/examination',
        pointX: 300,
        pointY: 0
      }
    ]
  },
  {
    id: 3,
    navId: 1,
    ballIndex: 4,
    name: '可视化信息',
    iconId: 'pie-03',
    rotate: Math.PI / 8 * 6.2,
    pointX: 116,
    pointY: 138,
    textPointX: 10,
    textPointY: 10,
    children: [
      {
        name: '状态监控',
        iconId: 'ball-04',
        ballIndex: 3,
        path: '/nav/monitoring-status',
        pointX: 240,
        pointY: Math.sqrt(300 * 300 - 240 * 240)
      },
      {
        name: '设备报警',
        iconId: 'ball-05',
        ballIndex: 4,
        path: '/nav/equip-warning',
        pointX: 100,
        pointY: Math.sqrt(300 * 300 - 100 * 100)
      }
    ]
  },
  {
    id: 4,
    navId: 2,
    ballIndex: 0,
    name: '检维修管理',
    iconId: 'pie-04',
    rotate: Math.PI / 8 * 9.8,
    pointX: -130,
    pointY: 145,
    textPointX: -10,
    textPointY: 20,
    children: [
      {
        name: '故障维修',
        iconId: 'ball-06',
        ballIndex: 5,
        path: '/nav/repair-manage',
        pointX: -200,
        pointY: Math.sqrt(300 * 300 - 200 * 200)
      }
    ]
  },
  {
    id: 5,
    navId: 3,
    ballIndex: 1,
    name: '检维修决策',
    iconId: 'pie-05',
    rotate: Math.PI / 8 * 12.7,
    pointX: -195,
    pointY: -70,
    textPointX: -10,
    textPointY: 36,
    children: [
      {
        name: '设备运行',
        iconId: 'ball-07',
        ballIndex: 6,
        path: '/nav/repair-decision',
        pointX: -280,
        pointY: -Math.sqrt(300 * 300 - 280 * 280)
      }
    ]
  }
]
