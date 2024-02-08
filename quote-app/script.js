const btnGetQuote = document.getElementById("btn-get");
const quoteHtml = document.getElementById("quote");
const authorHtml = document.getElementById("author");

let state = {
  quote: "Dreaming, after all, is a form of planning.",
  author: "Gloria Steinem",
  errorMessage: "oh no! :-(",
};

function render() {
  quoteHtml.textContent = state.quote;
  authorHtml.textContent = state.author;
}
render();

// Innerhalb des Klickereignis-Handlers wird eine Fetch-Anfrage an die angegebene URL gesendet.
btnGetQuote.addEventListener("click", () => {
  const p = fetch("https://dummy-apis.netlify.app/api/quote"); // in der Variablen p ist das promise
  p.then((response) => {
    //In der ersten .then()-Funktion wird überprüft, ob die Antwort erfolgreich war (Statuscode 200) und ob sie ok ist. (1. Callback)
    console.log(response.status); // 200
    console.log(response.ok); // true

    // wenn Status nicht! .ok (true) ist + Fehlermeldung
    if (!response.ok) {
      state.errorMessage + response.statusText;
      render();

      return;
    }

    // wenn Status .ok ist, dann weiter
    return response.json(); // liest nun zusätzlich zum Status und zum ok den body aus = Rechnungleistung sparen wenn er nach ok
  })
    // In der zweiten .then()-Funktion werden die erhaltenen Daten weiterverarbeitet und in den Zustand state geschrieben. (2. Callback)
    .then((data) => {
      console.log(data);
      state.quote = data.quote;
      state.author = data.author;
      render();
    })
    //  .catch() verwenden, um Fehler zu behandeln, die bei der Verarbeitung der Antwort auftreten könnten.
    .catch((error) => {
      state.errorMessage + error.toString();
      render();
    });
});

/*
Warum zwei error-Blöcke?
Die Fehlerbehandlung innerhalb der .then()-Funktion konzentriert sich auf Fehler, die spezifisch auf die Antwort der 
Fetch-Anfrage bezogen sind, während die Fehlerbehandlung innerhalb der .catch()-Funktion allgemeinere Fehler abfängt, 
die während des gesamten Prozesses auftreten können, einschließlich Fehler bei der Anfrage selbst oder während 
der Verarbeitung der Antwort.
*/

