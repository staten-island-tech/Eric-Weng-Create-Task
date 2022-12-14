const URL = "https://periodic-table-elements-info.herokuapp.com/elements";

const DOMSelectors = {
  box: document.getElementById("box"),
  display: document.getElementById("display"),
  start: document.getElementById("start"),
  skip: document.getElementById("skip"),
  form: document.getElementById("form"),
  name: document.getElementById("name"),
  card: document.getElementById("display-card"),
  list1: document.getElementById("list1"),
  list2: document.getElementById("list2"),
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
      .map((data, index) => ({
        name: data.name,
        symbol: data.symbol,
        id: index + 1,
      }));

    console.log(shuffle);
    function displayE() {
      DOMSelectors.card.insertAdjacentHTML(
        "afterbegin",
        `<div class="card">
<h2 class="display-text" >${shuffle[QuestionIndex].symbol}</h2>
      </div>
 `
      );
    }

    displayE();

    function check(answer) {
      const correct = shuffle[QuestionIndex].name;

      if (answer.toLowerCase() === correct.toLowerCase()) {
        DOMSelectors.list1.innerHTML = "";
        QuestionHistory.push(shuffle[QuestionIndex]);
        QuestionIndex = QuestionIndex + 1;
        DOMSelectors.card.innerHTML = "";
        displayE();
        DOMSelectors.form.reset();

        QuestionHistory.forEach((shuffles) => {
          DOMSelectors.list1.insertAdjacentHTML(
            "afterbegin",
            `<div>
   <h2>${shuffles.symbol} = ${shuffles.name}</h2>
          </div>
   `
          );
        });
      }
      if (answer.toLowerCase() !== correct.toLowerCase()) {
        DOMSelectors.form.reset();
      }
      if (shuffle[QuestionIndex].id == 118) {
        console.log(shuffle[QuestionIndex].id);
        alert("This Will be the Last Element!");
      }
    }

    DOMSelectors.form.addEventListener("submit", function (e) {
      e.preventDefault();
      const answer = DOMSelectors.name.value;
      check(answer);
    });

    DOMSelectors.skip.addEventListener("click", function (e) {
      e.preventDefault();
      DOMSelectors.list2.innerHTML = "";
      SkipHistory.push(shuffle[QuestionIndex]);
      QuestionIndex = QuestionIndex + 1;
      DOMSelectors.card.innerHTML = "";
      displayE();
      DOMSelectors.form.reset();

      SkipHistory.forEach((shuffles) => {
        DOMSelectors.list2.insertAdjacentHTML(
          "afterbegin",
          `<div>
 <h2>${shuffles.symbol} = ${shuffles.name}</h2>
        </div>
 `
        );
      });
      if (shuffle[QuestionIndex].id == 118) {
        console.log(shuffle[QuestionIndex].id);
        alert("This Will be the Last Element!");
      }
    });
  } catch (err) {
    console.error(err);
  }
}
