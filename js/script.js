document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.getElementById("addBtn");
  const username = document.getElementById("username");
  const tanggal = document.getElementById("tanggal");
  const todoTableBody = document.getElementById("todoTableBody");
  const searchBtn = document.getElementById("filterBtn");
  const searchAll = document.getElementById("searchAll");

  let page = [];

  const today = new Date().toISOString().split('T')[0];
  tanggal.value = today;

  function renderpage(data = page) {
    todoTableBody.innerHTML = "";

    if (data.length === 0) {
      todoTableBody.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
      return;
    }

    data.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.username}</td>
        <td>${item.tanggal}</td>
        <td>-</td>
        <td>
          <button class="deleteBtn" data-index="${index}">Delete</button>
        </td>
      `;
      todoTableBody.appendChild(row);
    });

    attachRowButtonEvents();
  }

  function addpage() {
    const user = username.value.trim();
    const dateValue = tanggal.value.trim();

    if (user === "" || dateValue === "") {
      alert("Please fill in both fields.");
      return;
    }

    const dateFormatted = new Date(dateValue).toLocaleDateString("id-ID");

    page.push({ username: user, tanggal: dateFormatted });
    username.value = "";
    tanggal.value = today;
    renderpage();
  }

  function Delete(index) {
    if (index !== undefined) {

      page.splice(index, 1);
    }
    filterPageAll();
  }

  function filterPageAll() {
    const query = searchAll.value.toLowerCase().trim();

    const filtered = page.filter(item => {
      return (
        item.username.toLowerCase().includes(query) ||
        item.tanggal.toLowerCase().includes(query)
      );
    });

    if (filtered.length === 0 && query !== "") {
      todoTableBody.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
    } else {
      renderpage(filtered);
    }
  }

  function attachRowButtonEvents() {
    document.querySelectorAll(".deleteBtn").forEach(btn => {
      btn.addEventListener("click", e => {
        const index = parseInt(e.target.dataset.index);
        Delete(index);
      });
    });
  }

  addBtn.addEventListener("click", addpage);
  searchBtn.addEventListener("click", filterPageAll);

  renderpage();
});
