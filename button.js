(function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-NWX65X3');

const downloadCSV = async () => {
    /* Download CSV file */
    try {
        const response = await fetch("https://raw.githubusercontent.com/many-passwords/many-passwords/main/passwords.csv"); // fetch data from file
        const blob = await response.blob();

        // create a link element to download file
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "passwords.csv";
        link.click();
        link.remove();
    } catch (err) {
        window.alert("There is an error occur, plesea try again later!");
    }
};


const downloadJSON = async () => {
    /* Download JSON file */
    let result = await fetch(
        "https://raw.githubusercontent.com/many-passwords/many-passwords/main/passwords.csv"
    )
        .then((res) => res.text())
        .catch(() => "error");


    if (result !== "error") {
        const jsonString = csvToJSON(result);

        // Using blob url to resolve the error
        let uriContent = URL.createObjectURL(new Blob([jsonString], { type: 'text/json;charset=utf-8' }))

        // Create a link element to download json file
        const link = document.createElement("a");
        link.href = uriContent;
        link.download = "passwords.json";
        link.click();
        link.remove()
    } else {
        window.alert("There is an error occur, plesea try again later!");
    }
}


const csvToJSON = (csvText) => {
    /* Covering csvText to JSON string */
    let lines = [];
    const linesArray = csvText.split('\n');

    // for trimming and deleting extra space 
    linesArray.forEach((e) => {
        const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ',').trim();
        lines.push(row);
    });

    // for removing empty record
    lines.splice(lines.length - 1, 1);
    const result = [];
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {

        const obj = {};
        const currentline = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j] === "<blank>" ? "" : currentline[j]; // convert <blank> value to empty string
        }
        result.push(obj);
    }


    return JSON.stringify(result);
}
