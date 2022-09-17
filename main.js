const URL = "https://periodic-table-elements-info.herokuapp.com/elements";

const DOMSelectors = {
  box: document.getElementById("box"),
  display: document.getElementById("display"),
  start: document.getElementById("start"),
  skip: document.getElementById("skip"),
};

DOMSelectors.start.addEventListener("click", function (e) {
  e.preventDefault();
  DOMSelectors.start.style.display = "none";
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
      <form id="form">
      <label for="fname">Your Response</label>
      <input type="text" required id="fname" name="fname">
    </form>

  <button id="skip">Skip</button>
 `
        );
      }
      displayE();

      skip.addEventListener("click", () => data[id + 1]);
    } catch (err) {
      console.error(err);
    }
  }
});
