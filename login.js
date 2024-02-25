
document.addEventListener('mousemove', (e) => {
    const grid = document.getElementById('grid');
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    const rect = grid.getBoundingClientRect();
    const gridX = mouseX - rect.left;
    const gridY = mouseY - rect.top;
    grid.style.backgroundPosition = `${gridX}px ${gridY}px`;
});



document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const formData = new FormData(this);
    const data = {};
    formData.forEach(function (value, key) {
      data[key] = value;
    });
  
    fetch("http://panel.mait.ac.in:8001/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); 
        } else {
          throw new Error("Login failed. Please check your email and password.");
        }
      })
      .then((data) => {
        
        localStorage.setItem("token", data.access);
  
      
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        document.getElementById("message").textContent =
          "An error occurred. Please try again later.";
      });
  });
  