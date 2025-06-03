document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("myForm");
    const errorBox = document.getElementById("errorBox");
    const submitBtn = document.getElementById('submitBtn');
    const overlay = document.getElementById('formOverlay');
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const password = form.password.value;

        const errors = [];

        if (password.length < 8) {
            errors.push("Пароль повинен містити щонайменше 8 символів.");
        }

        if (!/[A-Z]/.test(password)) {
            errors.push("Пароль повинен містити хоча б одну велику букву.");
        }

        if (!/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]~`]/.test(password)) {
            errors.push("Пароль повинен містити хоча б один спеціальний символ.");
        }

        if (/[а-яА-ЯёЁіІїЇєЄґҐ]/.test(password)) {
            errors.push("Пароль не повинен містити символів кирилиці.");
        }

        if (errors.length > 0) {
            errorBox.style.display = "block"
            errorBox.textContent = errors.join("\n");
            return;
        } else{
            errorBox.style.display = "none"
        }

        overlay.style.display = 'flex';
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        const formData = new FormData(form);

        fetch("/form-api", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.ok) {
            alert("Форму відправлено");
        } else {
            errorBox.style.display = "block";
            errorBox.textContent = "Помилка при відправці форми."
        }
        })
        .catch(error => {
            console.error("Помилка:", error);
            errorBox.style.display = "block";
            errorBox.textContent ="Виникла помилка під час надсилання."
        });
    });
});