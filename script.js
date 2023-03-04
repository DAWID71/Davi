const inputPergunta = document.getElementById("inputPergunta");
const resultadoIA = document.getElementById("resultadoIA");

const OPENAI_API_KEY = "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";

function EnviarPergunta() {
    var valorPergunta = inputPergunta.value;

    fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPENAI_API_KEY,
        },
        body: JSON.stringify({
            model: "text-davinci-002",
            prompt: valorPergunta,
            max_tokens: 2048, // tamanho da resposta
            temperature: 0.7, // criatividade na resposta
        }),
    })
    .then((response) => response.json())
    .then((json) => {
        if (resultadoIA.value) resultadoIA.value += "\n";

        if(json.error?.message){
            resultadoIA.value += `Erro: ${json.error.message}`;
        } else if (json.choices?.[0].text) {
            var text = json.choices[0].text || "Sem resposta";

            resultadoIA.value += "Chat GPT: " + text;
        }

        resultadoIA.scrollTop = resultadoIA.scrollHeight;
    })
    .catch((error) => console.error("Erro:", error))
    .finally(() => {
        inputPergunta.value = "";
        inputPergunta.disabled = false;
        inputPergunta.focus();
    });

    if (resultadoIA.value) resultadoIA.value += "\n\n\n";

    resultadoIA.value += `Eu: ${valorPergunta}`;
    inputPergunta.value = "Carregando...";
    inputPergunta.disabled = true;

    resultadoIA.scrollTop = resultadoIA.scrollHeight;
}

document.getElementById("EnviarPergunta").addEventListener("click", EnviarPergunta);
