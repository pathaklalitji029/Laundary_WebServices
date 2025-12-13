document.addEventListener("DOMContentLoaded", () => {

    emailjs.init("rDwb4pH9OWETiraDX");

    const addButtons = document.querySelectorAll(".add-btn");
    const tableBody = document.querySelector(".table-cart tbody");
    const totalAmountDiv = document.querySelector(".amount-div span");

    let cart = [];
    let total = 0;

    addButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const parent = btn.parentElement;
            const service = parent.querySelector("span").innerText;
            const price = parseFloat(
                parent.querySelector(".price").innerText.replace("₹", "")
            );

            const index = cart.findIndex(item => item.service === service);

            if (index !== -1) {
                total -= cart[index].price;
                cart.splice(index, 1);

                btn.innerText = "Add Item";
                btn.style.background = "#2e9fff";
                btn.style.color = "#fff";
            } else {
                cart.push({ service, price });
                total += price;

                btn.innerText = "Remove Item";
                btn.style.background = "red";
                btn.style.color = "#fff";
            }

            updateTable();
        });
    });

    function updateTable() {
        tableBody.innerHTML = "";

        if (cart.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="3" class="table-text">ⓘ<br>No items added</td>
                </tr>
            `;
            totalAmountDiv.innerText = "0";
            return;
        }

        cart.forEach((item, i) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${i + 1}</td>
                <td>${item.service}</td>
                <td>₹${item.price}</td>
            `;
            tableBody.appendChild(tr);
        });

        totalAmountDiv.innerText = total;
    }

    const form = document.querySelector(".form form");
    const nameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const bookBtn = form.querySelector("button");

    const msgBox = document.getElementById("formMessage");
    msgBox.style.marginTop = "8px";
    msgBox.style.fontSize = "0.6rem";
    msgBox.style.fontWeight = "600";
    

    function checkFormFilled() {
        if (
            nameInput.value.trim() !== "" &&
            emailInput.value.trim() !== "" &&
            phoneInput.value.trim() !== ""
        ) {
            bookBtn.style.background = "#2e9fff";
            bookBtn.style.color = "#fff";
        } else {
            bookBtn.style.background = "#ccc";
            bookBtn.style.color = "#000";
        }
    }

    nameInput.addEventListener("input", checkFormFilled);
    emailInput.addEventListener("input", checkFormFilled);
    phoneInput.addEventListener("input", checkFormFilled);

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (
            nameInput.value.trim() === "" ||
            emailInput.value.trim() === "" ||
            phoneInput.value.trim() === ""
        ) {
            msgBox.style.color = "red";
            msgBox.innerText = "Please fill all details first.";
            return;
        }

        if (cart.length === 0) {
            msgBox.style.color = "red";
            msgBox.innerText = "Please add at least one service to the cart.";
            return;
        }


        const services = cart.map(item => item.service + " (₹" + item.price + ")").join(", ");

        const templateParams = {
            user_name: nameInput.value,
            user_email: emailInput.value,
            user_phone: phoneInput.value,
            services: services,
            total_amount: total,
        
        };
        

        emailjs.send(
            "Laundary_serviceID",
            "Laundary_confirm",
            templateParams
        ).then(() => {
            msgBox.style.color = "green";
            msgBox.innerText = "Booking successful! Email sent.";
            setTimeout(()=>{
                msgBox.innerText="";
                form.reset();
                cart = [];
                total = 0;
                updateTable();
                checkFormFilled();
            },3000);
            
        }).catch(() => {
            msgBox.style.color = "red";
            msgBox.innerText = "Failed to send email. Try again.";
        });


    });
})



document.addEventListener("DOMContentLoaded", () => {
    const subBtn = document.querySelector(".sub-btn");
    const nameInput = document.querySelector(".name-input");
    const emailInput = document.querySelector(".email-input");
    const msg = document.querySelector(".sub-message");

    subBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const fullName = nameInput.value.trim();
        const email = emailInput.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (fullName === "") {
            msg.innerText = "Please enter your full name.";
            msg.style.color = "white";
            return;
        }

        if (email === "" || !emailPattern.test(email)) {
            msg.innerText = "Please enter a valid email address.";
            msg.style.color = "white";
            return;
        }


        msg.innerText = "Thank you for subscribing!";
        msg.style.color = "white";
    
        setTimeout(() => {
            msg.innerText = "";
        }, 3000);
    


        nameInput.value = "";
        emailInput.value = "";

    });
});
