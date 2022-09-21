const URL = "https://periodic-table-elements-info.herokuapp.com/elements";

const DOMSelectors = {
  box: document.getElementById("box"),
  display: document.getElementById("display"),
  start: document.getElementById("start"),
  skip: document.getElementById("skip"),
  form: document.getElementById("form"),
  name: document.getElementById("name"),
  card: document.getElementById("display-card"),
};

getData(URL);

async function getData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    var QuestionIndex = 0;
    const QuestionHistory = [];
    const SkipHistory = [];

    const shuffle = data
      .sort(() => Math.random() - 0.5)
      .map((data) => ({
        name: data.name,
        symbol: data.symbol,
      }));
    function displayE() {
      DOMSelectors.card.insertAdjacentHTML(
        "afterbegin",
        `<div class="card">
<h2 class="display-text" >${shuffle[QuestionIndex].symbol}</h2>
      </div>
 `
      );
    }

    function displayAns() {
      DOMSelectors.display.insertAdjacentHTML(
        "afterbegin",
        `<div>
        <h2>${shuffle[QuestionIndex].symbol} = ${shuffle[QuestionIndex].symbol}</h2>
        </div>`
      );
    }

    DOMSelectors.form.addEventListener("submit", function (e) {
      e.preventDefault();
      const answer = DOMSelectors.name.value;
      const correct = shuffle[QuestionIndex].name;

      if (answer.toLowerCase() === correct.toLowerCase()) {
        QuestionIndex = QuestionIndex + 1;
        DOMSelectors.card.innerHTML = "";
        displayE();
        DOMSelectors.form.reset();
        QuestionHistory.push[shuffle[QuestionIndex]];
        console.log(QuestionHistory);
      }
      if (answer.toLowerCase() !== correct.toLowerCase()) {
        DOMSelectors.form.reset();
      }
    });
    displayE();
    DOMSelectors.skip.addEventListener("click", function (e) {
      e.preventDefault();
      QuestionIndex = QuestionIndex + 1;
      DOMSelectors.card.innerHTML = "";
      displayE();
      DOMSelectors.form.reset();
      SkipHistory.push[shuffle[QuestionIndex.length - 1]];
    });
  } catch (err) {
    console.error(err);
  }
}
