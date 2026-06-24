const button = document.getElementById("submitBtn");

button.addEventListener("click", async () => {

    const text =
        document
            .getElementById("inputBox")
            .value;

    const arr =
        text
            .split(",")
            .map(x => x.trim())
            .filter(x => x.length);

    const output =
        document.getElementById("output");

    const error =
        document.getElementById("error");

    output.textContent = "";
    error.textContent = "";

    try {

        const response =
            await fetch(
                "https://bajaj-challenge-fs.onrender.com/bfhl",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        data: arr
                    })
                }
            );

        const result =
            await response.json();

        output.textContent =
            JSON.stringify(
                result,
                null,
                2
            );

    } catch (err) {

        error.textContent =
            "Unable to connect to API";
    }
});