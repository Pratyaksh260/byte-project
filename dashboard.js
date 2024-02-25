

const token = localStorage.getItem("token");
console.log("Token:", token);

fetch("http://panel.mait.ac.in:8001/auth/user-details/", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch user information.");
    }
    return response.json();
  })
  .then((data) => {
    console.log("User data:", data);
    document.getElementById("userInfo").innerHTML = `<br>
    Username : ${data.name} <br><br>
    Email :   ${data.email}`;
  })
  .catch((error) => {
    console.error("Error fetching user information:", error);
  });


function fetchPoems() {
  fetch("http://panel.mait.ac.in:8001/poem/get/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch poems.");
      }
      return response.json();
    })
    .then((data) => {
      const poemList = document.getElementById("poemList");
      poemList.innerHTML = "";
      if (Array.isArray(data)) {
        data.forEach((poem) => {
          const poemItem = document.createElement("div");
          poemItem.textContent = `${poem.poem} - ${poem.author}`;

          poemList.appendChild(poemItem);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching poems:", error);
    });
}


document.getElementById("submitBtn").addEventListener("click", function () {
  const poem = document.getElementById("poem").value;
  const author = document.getElementById("author").value;

  fetch("http://panel.mait.ac.in:8001/poem/create/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ poem, author }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to submit poem.");
      }
      document.getElementById("poem").value = "";
      document.getElementById("author").value = "";
      fetchPoems();
    })
    .catch((error) => {
      console.error("Error submitting poem:", error);
    });
});


fetchPoems();
