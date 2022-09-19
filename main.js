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

    function shuffle(data) {
      data.sort(() => Math.random() - 0.5);
    }
    shuffle(data);
    console.log(data[0]);

    function displayE() {
      DOMSelectors.display.insertAdjacentHTML(
        "afterbegin",
        `<div class="display-card">
<h3 class="display-text" >${data[0].symbol}</h2>
      </div>
 `
      );
    }
    DOMSelectors.form.addEventListener("submit", function (e) {
      e.preventDefault();
      const answer = DOMSelectors.name.value;
      const correct = data[0].name;
      if (answer.toLowerCase() === correct.toLowerCase()) {
        shuffle(data);
        displayE();
        DOMSelectors.form.reset();
        console.log(data[0]);
      }
      if (answer.toLowerCase() !== correct.toLowerCase()) {
        DOMSelectors.form.reset();
      }
    });
    displayE();
    DOMSelectors.skip.addEventListener("click", function (e) {
      e.preventDefault();
      shuffle(data);
      displayE();
      DOMSelectors.form.reset();
      console.log(data[0]);
    });
  } catch (err) {
    console.error(err);
  }
}
