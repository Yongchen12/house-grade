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
      },
    ],
  },
  {
    id: "renovation",
    number: "03",
    title: "装修分",
    description: "看整体完成度，也看入住后还需要投入多少精力。",
    max: 17,
    questions: [
      {
        id: "renovationLevel",
        title: "装修与维护程度",
        hint: "选择最接近房屋当前状态的一项",
        max: 17,
        options: [
          ["80%+ 翻新", 17],
          ["维护好", 12],
          ["表面翻新 / 有亮点", 10],
          ["中规中矩", 5],
          ["不满足", 0],
        ],
      },
    ],
  },
  {
    id: "hardware",
    number: "04",
    title: "硬件分",
    description: "关键设备的新旧程度，直接关系到未来几年的维护成本。",
    max: 13,
    questions: [
      {
        id: "roof",
        title: "Roof 换新",
        hint: "更换时间在 5 年以内",
        max: 6,
        options: [
          ["满足", 6],
          ["不满足", 0],
        ],
      },
      {
        id: "hvac",
        title: "新 HVAC",
        hint: "更换时间在 5 年以内",
        max: 5,
        options: [
          ["满足", 5],
          ["不满足", 0],
        ],
      },
      {
        id: "waterHeater",
        title: "新热水器",
        hint: "更换时间在 5 年以内",
        max: 2,
        options: [
          ["满足", 2],
          ["不满足", 0],
        ],
      },
    ],
  },
  {
    id: "appearance",
    number: "05",
    title: "颜值分",
    description: "最后留一点位置给你的直觉：它是不是你喜欢的样子？",
    max: 5,
    questions: [
      {
        id: "appearanceScore",
        title: "整体颜值",
        hint: "凭第一印象打 1–5 分",
        max: 5,
        options: [
          ["1 分", 1],
          ["2 分", 2],
          ["3 分", 3],
          ["4 分", 4],
          ["5 分", 5],
        ],
      },
    ],
  },
];

const sectionsContainer = document.querySelector("#scoreSections");
const form = document.querySelector("#scoreForm");
const resultPanel = document.querySelector("#resultPanel");

function optionMarkup(question, label, score) {
  return `
    <label class="option">
      <input type="radio" name="${question.id}" value="${score}" />
      <span class="option-content">
        <span>${label}</span>
        <b>${score} 分</b>
      </span>
    </label>
  `;
}

function renderSections() {
  sectionsContainer.innerHTML = categories
    .map(
      (category) => `
        <section class="score-section" data-category="${category.id}">
          <div class="section-heading">
            <div>
              <span class="section-number">${category.number} · CATEGORY</span>
              <h2>${category.title}</h2>
              <p>${category.description}</p>
            </div>
            <div class="section-score">
              <strong data-live-score="${category.id}">0</strong><span>/ ${category.max}</span>
            </div>
          </div>
          <div class="question-list">
            ${category.questions
              .map(
                (question) => `
                  <div class="question">
                    <div class="question-copy">
                      <h3>${question.title}</h3>
                      <p>${question.hint}${question.exactHint ? `，最高 ${question.max} 分` : ` · 最高 ${question.max} 分`}</p>
                    </div>
                    <div class="options">
                      ${question.options
                        .map(([label, score]) => optionMarkup(question, label, score))
                        .join("")}
                    </div>
                  </div>
                `,
              )
              .join("")}
          </div>
        </section>
      `,
    )
    .join("");
}

function clamp(value, min, max) {
  return Math.min(Math.max(Number(value) || 0, min), max);
}

function getQuestionScore(question) {
  const selected = form.querySelector(`input[name="${question.id}"]:checked`);
  if (!selected) return 0;

  return clamp(selected.value, 0, question.max);
}

function getCategoryScore(category) {
  const rawScore = category.questions.reduce(
    (total, question) => total + getQuestionScore(question),
    0,
  );
  return clamp(rawScore, 0, category.max);
}

function getBonusScore() {
  const selectedBonuses = [...form.querySelectorAll('input[name="bonus"]:checked')];
  const total = selectedBonuses.reduce(
    (sum, checkbox) => sum + Number(checkbox.value),
    0,
  );
  return clamp(total, 0, 20);
}

function getDeductionScore() {
  const input = document.querySelector("#deductionScore");
  return clamp(input.value, 0, 20);
}

function updateLiveScores() {
  categories.forEach((category) => {
    const output = document.querySelector(`[data-live-score="${category.id}"]`);
    output.textContent = getCategoryScore(category);
  });

  const rawBonus = [...form.querySelectorAll('input[name="bonus"]:checked')].reduce(
    (sum, checkbox) => sum + Number(checkbox.value),
    0,
  );
  document.querySelector("#bonusLiveScore").textContent = getBonusScore();
  document.querySelector("#bonusCapNote").hidden = rawBonus <= 20;
  document.querySelector("#deductionLiveScore").textContent = getDeductionScore();
}

function getResultLabel(score) {
  if (score >= 105) return "非常亮眼，可以认真冲";
  if (score >= 90) return "优秀，很值得考虑";
  if (score >= 75) return "不错，值得进入候选";
  if (score >= 60) return "中等，需要权衡";
  return "槽点较多，建议谨慎";
}

function renderResult() {
  const categoryResults = categories.map((category) => ({
    ...category,
    score: getCategoryScore(category),
  }));
  const baseScore = categoryResults.reduce((sum, category) => sum + category.score, 0);
  const bonusScore = getBonusScore();
  const deductionScore = getDeductionScore();
  const finalScore = Math.max(0, baseScore + bonusScore - deductionScore);

  document.querySelector("#finalScore").textContent = finalScore;
  document.querySelector("#resultLabel").textContent = getResultLabel(finalScore);
  document.querySelector("#baseTotal").textContent = `${baseScore} / 100`;
  document.querySelector("#bonusTotal").textContent = `+${bonusScore}`;
  document.querySelector("#deductionTotal").textContent = `−${deductionScore}`;
  document.querySelector("#breakdownRows").innerHTML = categoryResults
    .map(
      (category) => `
        <div class="breakdown-row">
          <span>${category.title}</span>
          <b>${category.score} / ${category.max}</b>
        </div>
      `,
    )
    .join("");

  resultPanel.hidden = false;
  resultPanel.scrollIntoView({ behavior: "smooth", block: "center" });
}

renderSections();

form.addEventListener("input", (event) => {
  if (event.target.id === "deductionScore" && event.target.value !== "") {
    event.target.value = clamp(event.target.value, 0, 20);
  }

  updateLiveScores();
});

form.addEventListener("change", updateLiveScores);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateLiveScores();
  renderResult();
});

document.querySelector("#resetButton").addEventListener("click", () => {
  form.reset();
  resultPanel.hidden = true;
  updateLiveScores();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
