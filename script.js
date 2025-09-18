const baseUrl = "http://localhost:3000/forms";

    let editingFormId = null;

    // Fetch and display Forms
    function fetchForms() {
      fetch(baseUrl)
        .then(res => res.json())
        .then(data => {
          const list = document.getElementById("form");
          list.innerHTML = '';
          data.forEach(form => {
            const div = document.createElement("div");
            div.className = "form-item";
            div.innerHTML = `
              <strong>ID: ${form.id}</strong><br>
              Name: ${form.name}<br>
              Email: ${form.email} <br>
              Message: ${form.message}<br>
              <button class="delete" onclick="deleteForm('${form.id}')">Delete</button>
            `;
            list.appendChild(div);
          });
        });
    }


    function handleCreateForm() {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }else{
        alert("Thank You..! I will share you more details via Email");
        return;
      }

      const formData = {
        name,
        email,
        message
      };

      if (editingFormId) {
        // Update
        fetch(`${baseUrl}/${editingFormId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingFormId, ...formData })
        })
        .then(() => {
          resetForm();
          fetchForms();
        });
      } 
      
      else {
        // Create (let backend generate ID)
        fetch( baseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
    )
        .then(  () => {
          resetForm();
          fetchForms();
          
        }
        
     );
      }
    }

    // Delete sform
    function deleteForm(id) {
      if (!confirm(`Are you sure you want to delete the form with ID : ${id}?`)) return;

      fetch(`${baseUrl}/${id}`, {
        method: "DELETE"
      })
      .then(() => fetchForms());
    }

    // Reset form
    function resetForm() {
      document.getElementById("name").value = '';
      document.getElementById("email").value = '';
      document.getElementById("message").value = '';
      editingFormId = null;
     document.getElementById("submitBtn").textContent = "Create Form";
    }

    // Initial load
    fetchForms();

