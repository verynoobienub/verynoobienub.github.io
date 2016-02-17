var bgColour, quoteContainerColour, xhr = new XMLHttpRequest(),
    data;

xhr.open("GET", "/storage/quotes.json", true);
xhr.responseType = 'json';

xhr.onload = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        try {
            data = xhr.response;
        } catch (err) {
            console.log(err.message + " in " + xhr.responseText);
            return;
        }
    }
};

xhr.send();

function Colour(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.rgbHex = "#" + Math.round(r).toString(16) + Math.round(g).toString(16) + Math.round(b).toString(16);

    this.setRGB = function (r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.rgbHex = "#" + Math.round(r).toString(16) + Math.round(g).toString(16) + Math.round(b).toString(16);
    }

    this.getRGB = function () {
        return this.rgbHex;
    }
}

function generateColour() {
    var bg = document.getElementById("body");

    bgColour = new Colour((Math.round(Math.random() * 127) + 127), (Math.round(Math.random() * 127) + 127), (Math.round(Math.random() * 127) + 127));

    bg.style.background = bgColour.getRGB();
}

function generateQuote() {
    var quote = document.getElementById("quote"),
        quoteContainer = document.getElementById("quoteContainer"),
        bg = document.getElementById("body"),
        speaker = document.getElementById("speaker"),
        quoteLength = Object.keys(data).length,
        temp;

    speaker.classList.add("speaker");

    temp = randomIntFromInterval(1, quoteLength);
    
    while (quote.innerHTML === JSON.stringify(data["quote" + temp].quote))
            temp = randomIntFromInterval(1, quoteLength);
    
    quote.classList.add("fade");
    bg.classList.add("fade");
    
    setTimeout(function () {
        generateColour();
        quote.innerHTML = JSON.stringify(data["quote" + temp].quote);
        speaker.innerHTML = "- " + data["quote" + temp].speaker;
    }, 750);

    setTimeout(function () {
        quote.classList.remove("fade");
        bg.classList.remove("fade");
    }, 1500);
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}