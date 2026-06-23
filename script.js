const categories = [
  {
    id: "community",
    number: "01",
    title: "小区分",
    description: "地段与社区决定了这套房子的基本盘。",
    max: 30,
    questions: [
      {
        id: "neighborhood",
        title: "所在小区",
        hint: "选择房屋所在的社区",
        max: 30,
        options: [
          ["Bridle Ridge", 30],
          ["Brookwood / Caney Creek", 10],
          ["Other", 5],
        ],
      },
    ],
  },
  {
    id: "layout",
    number: "02",
    title: "格局分",
    description: "空间、动线和采光，是住进去之后每天都能感受到的部分。",
    max: 35,
    questions: [
      {
        id: "houseSize",
        title: "大房子",
        hint: "楼上两层合计大于 2800 sqft",
        max: 8,
        options: [
          ["满足", 8],
          ["不满足", 0],
        ],
      },
      {
        id: "doorWindowLayout",
        title: "车库 / 门窗格局",
        hint: "整体位置与使用动线合理",
        max: 7,
        options: [
          ["满足", 7],
          ["不满足", 0],
        ],
      },
      {
        id: "basementFinish",
        title: "地下室装修",
        hint: "已装修得 8 分，未装修得 5 分，没有地下室得 0 分",
        max: 8,
        exactHint: true,
        options: [
          ["已装修", 8],
          ["未装修", 5],
          ["没有地下室", 0],
        ],
      },
      {
        id: "basementDry",
        title: "地下室干燥",
        hint: "没有潮湿或发霉问题",
        max: 2,
        options: [
          ["满足", 2],
          ["不满足", 0],
        ],
      },
      {
        id: "ceiling",
        title: "客厅挑高",
        hint: "层高带来更开阔的空间感",
        max: 4,
        options: [
          ["满足", 4],
          ["不满足", 0],
        ],
      },
      {
        id: "secondFloorConnection",
        title: "客厅与二楼有联动性",
        hint: "视线或空间关系自然连通",
        max: 1,
        options: [
          ["满足", 1],
          ["不满足", 0],
        ],
      },
      {
        id: "lighting",
        title: "室内采光",
        hint: "根据全天自然光线主观判断",
        max: 5,
        options: [
          ["好", 5],
          ["一般", 3],
          ["差", 0],
        ],