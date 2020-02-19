(function () {
    let cardList = [{
        id: 1,
        cardName: "card 1",
        cardType: "visa",
        cardNumber: "4024007150503737"
    }]

 function deleteCard(id) {
        const newList = cardList.filter((card) => card.id.toString() !== id.value);
        cardList = [...newList]
        renderCardList(cardList);
    }
    function addCard() {
        document.getElementById("cardFormBody").style = "display:inline-block"
        document.getElementById("addCard").style = "display:none";
    }

    function cancelCard() {
        document.getElementById("cardFormBody").style = "display:none"
        document.getElementById("addCard").style = "display:flex";
        resetField();
    }

    function hideErrorMssag(type) {
        if (type === "card")
            document.getElementById("card-error").style = "display:none";
        else if (type === "cvv")
            document.getElementById("cvv-error").style = "display:none";
        else if (type === "date")
            document.getElementById("date-error").style = "display:none";
    }

    function resetField() {
        document.getElementById("cardNumber").value = "";
        document.getElementById("cvvNumber").value = "";
        document.getElementById("cardName").value = "";
        document.getElementById("month").value ="0";
        document.getElementById("year").value = "0";
    }

    function showErrroMessage() {
        document.getElementById("card-error").style = "display:inline";
    }

    function renderDeleteButton(divElement, id) {
        const delButton = document.createElement("div");
        delButton.innerHTML = "X";
        delButton.classList = ["delete-button"];
        delButton.title = "delete card";
        delButton.setAttribute("data-id", id);
        delButton.setAttribute("id", "delete");
        divElement.appendChild(delButton);
    }



    function renderEmptyCardList(divElement) {
        document.getElementById("savedCard").innerText = "No records found";
    }

    function renderCardList(cardlist) {
        const cardContainer = document.getElementById("savedCard");
        cardContainer.innerText = "";
        if (!cardList.length) {
            renderEmptyCardList(cardContainer)
        }
        cardlist.forEach(cardData => {
            const cardNumber = cardData.cardNumber.replace(/(\d{9})\d{3}/, "$1******");

            const divElement = document.createElement("div");
            divElement.classList = ["card-list"];
            const spanElement = document.createElement("span");
            spanElement.innerText = cardData.cardName;
            const divCardDeteil = document.createElement("div");
            divCardDeteil.classList = ["card-details"];
            const divCardType = document.createElement("div");
            divCardType.classList = ["card-type"];
            divCardType.innerText = cardData.cardType;
            const divCardNumber = document.createElement("div");
            divCardNumber.innerText = cardNumber;
            divCardNumber.classList = ["card-number"];
            divElement.appendChild(spanElement);
            divElement.appendChild(divCardDeteil);
            divCardDeteil.appendChild(divCardType);
            divCardDeteil.appendChild(divCardNumber);
            renderDeleteButton(divElement, cardData.id);
            cardContainer.appendChild(divElement);
        });
    }

    function validateYearAndMonth() {
        if (document.getElementById("month").value === "0" || document.getElementById("year").value === "0") {
            document.getElementById("date-error").style = "display:inline";
            return true;
        } else {
            hideErrorMssag("date");
        }
    }

    function saveCard() {
        const visaPattern = {
            cardPattern: /^4/,
            cardNumberLength: 16,
            cvv: "required",
            cvvLength: 3,
            displayText: "Visa"
        };
        let isValid = true;
        const masterPattern = {
            cardPattern: /^5[1-5]/,
            cardNumberLength: 16,
            cvv: "required",
            cvvLength: 3,
            displayText: "Master"
        }
        const masteroPattern = {
            cardPattern: /^(50|63|66|5[6-8]|6[8-9]|600[0-9]|6010|601[2-9]|60[2-9]|61|620|621|6220|6221[0-1])/,
            cardNumberLength: 19,
            cvv: "optional",
            cvvLength: 4,
            displayText: "Maestro"
        }
        let cardType;
        const cardNumber = document.getElementById("cardNumber").value;
        const cvvNumber = document.getElementById("cvvNumber").value;
        const cardName = document.getElementById("cardName").value;
        hideErrorMssag("cvv");
        hideErrorMssag("card");
        if (validateYearAndMonth()) {
            isValid = false;
        }
        if ((new RegExp(visaPattern.cardPattern)).test(cardNumber)) {
            if (cardNumber.length !== visaPattern.cardNumberLength) {
                showErrroMessage();
                isValid = false;
            }
            if (cvvNumber.length !== visaPattern.cvvLength) {
                document.getElementById("cvv-error").style = "display:inline";
                isValid = false;
            }
            cardType = visaPattern.displayText;
        } else if ((new RegExp(masterPattern.cardPattern)).test(cardNumber)) {
            if (cardNumber.length !== masterPattern.cardNumberLength) {
                showErrroMessage();
                isValid = false;
            }
            if (cvvNumber.length !== masterPattern.cvvLength) {
                document.getElementById("cvv-error").style = "display:inline";
                isValid = false;
            }
            cardType = masterPattern.displayText;
        } else if ((new RegExp(masteroPattern.cardPattern)).test(cardNumber)) {
            if (cardNumber.length !== masteroPattern.cardNumberLength) {
                showErrroMessage();
                isValid = false;
            }
            cardType = masteroPattern.displayText;
        } else {
            document.getElementById("card-error").style = "display:inline";
            isValid = false;
        }
        if (!isValid) {
            return;
        }
        let idArray = Object.values(cardList).map((list) => list.id);
        idArray = idArray.length === 0 ? 0 : Math.max.apply(null, idArray) + 1
        const cardData = {
            id: idArray,
            cardName: cardName,
            cardType: cardType,
            cardNumber: cardNumber
        }
        cardList.push(cardData);
        renderCardList(cardList);
        cancelCard();
    }

    function handleEvent(e) {
        let target = e.target.id
        if (target) {
            if (target === "cancel") {
                hideErrorMssag("card");
                cancelCard();
            }
            if (target === "saveCard") {
                saveCard();
            }
            if (target === "delete") {
                deleteCard(e.target.attributes["data-id"]);
            }
        }
    }

    function addMonth() {
        var selectMonth = document.getElementById("month");
        const month = 12;
        for (let i = 1; i <= month; i++) {
            const option = document.createElement("option");
            option.text = i.length === 1 ? "0" + i : i;
            option.value = i;
            selectMonth.appendChild(option);
        }
    }

    function addYear() {
        var selectMonth = document.getElementById("year");
        const startingYear = 1880;
        const endYear = 2030;
        for (let i = startingYear; i <= endYear; i++) {
            const option = document.createElement("option");
            option.text = i.length === 1 ? "0" + i : i;
            option.value = i;
            selectMonth.appendChild(option);
        }
    }

    document.getElementById("container").addEventListener("click", handleEvent);
    document.getElementById("addCard").addEventListener("click", addCard);
    addMonth();
    addYear();
    renderCardList(cardList);
})();