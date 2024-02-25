
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach(function(value, key) {
        data[key] = value;
    });

    fetch("http://panel.mait.ac.in:8001/auth/register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("message").textContent = "Registration successful!";
        } else {
            document.getElementById("message").textContent = "Registration failed. Please try again.";
        }
    })
    .catch(error => {
        document.getElementById("message").textContent = "An error occurred. Please try again later.";
    });
});



