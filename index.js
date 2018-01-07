const MAC_ADDRESS = "00:15:83:00:85:F6";

let terminal;
$(document).ready(() => {
    // Global variable to be used by the radio buttons as well
    let currentDataArray = [0x77, 0, 0, 0x03, 0xe8, "\n"];

    $(".modal").modal();
    $("#modal1").modal("open");

    $("#connectBtn").click(() => {
        console.log("Attempting to connect to Bluetooth device!");
        terminal = new BluetoothTerminal();
        terminal.connect().then(() => {
            alert(terminal.getDeviceName() + " is connected!");
            sendDataArray();
        });
    });

    $("#radio_sine").change(() => {
        currentDataArray[1] = 0;
        sendDataArray();
    });

    $("#radio_triangle").change(() => {
        currentDataArray[1] = 1;
        sendDataArray();
    });

    $("#radio_saw").change(() => {
        currentDataArray[1] = 2;
        sendDataArray();
    });

    $("#radio_square").change(() => {
        currentDataArray[1] = 3;
        sendDataArray();
    });

    let nonLinearSlider = document.getElementById("nonlinear");
    noUiSlider.create(nonLinearSlider, {
        connect: [true, false],
        snap: true,
        behaviour: "tap",
        orientation: "vertical",
        direction: "rtl",
        start: 1000,
        tooltips: true,
        pips: {
            // Show a scale with the slider
            mode: "steps",
            stepped: true,
            density: 4,
            format: wNumb({
                decimals: 0,
                suffix: " Hz"
            })
        },
        range: {
            // Starting at 500, step the value by 500,
            // until 4000 is reached. From there, step by 1000.
            min: 1,
            "5%": 100,
            "10%": 200,
            "15%": 300,
            "20%": 400,
            "25%": 500,
            "30%": 600,
            "35%": 700,
            "40%": 800,
            "45%": 900,
            "50%": 1000,
            "55%": 2000,
            "60%": 3000,
            "65%": 4000,
            "70%": 5000,
            "75%": 7500,
            "80%": 10000,
            "85%": 12500,
            "90%": 15000,
            "95%": 20000,
            max: 500000
        }
    });

    nonLinearSlider.noUiSlider.on(
        "slide",
        _.debounce(updateWaveform, 10, {
            // 10 ms is an ok delay for 9600 baud
            leading: false,
            trailing: true
        })
    );

    // let radioButtons = document.getElementsByClassName("radio");
    // radioButtons.on("change", updateWaveform);

    function updateWaveform(value) {
        let waveSelect = 0;
        if (document.getElementById("radio_sine").checked) waveSelect = 0;
        else if (document.getElementById("radio_triangle").checked)
            waveSelect = 1;
        else if (document.getElementById("radio_saw").checked) waveSelect = 2;
        else if (document.getElementById("radio_square").checked)
            waveSelect = 3;

        currentDataArray[1] = waveSelect;

        let N = Math.round(1e6 / value).toString(16);
        N = _.padStart(N, 6, "0"); // 3 bytes

        currentDataArray[2] = parseInt(N.slice(0, 2), 16);
        currentDataArray[3] = parseInt(N.slice(2, 4), 16);
        currentDataArray[4] = parseInt(N.slice(4, 6), 16);

        // TODO: Send via bluetooth
        console.log(currentDataArray);
        sendDataArray();
    }

    function sendDataArray() {
        let dataArrayToSend = currentDataArray
            .map(c => {
                return String.fromCharCode(c);
            })
            .join("");

        terminal.send(dataArrayToSend);
    }
});
