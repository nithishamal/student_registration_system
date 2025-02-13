document.addEventListener("DOMContentLoaded", () => {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    const studentForm = document.getElementById("student-form");
    const register_btn = document.getElementById("register_btn");
    
    let editIndex = null; 

    // Displays the student details in the table when called
    function displayStudents() {
        const studentList = document.getElementById("student-list");
        studentList.innerHTML = "";
        students.forEach((student, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="edit" onclick="editStudent(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button onclick="deleteStudent(${index})"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            studentList.appendChild(row);
        });
    }
    
    // Shows the success message based on the type of action
    function showSuccessMessage() {
        const successMessage = document.getElementById('successMessage');
        if (editIndex != null){
            successMessage.innerHTML = "Student Details Updated successfully!";
        }else{
            successMessage.innerHTML = "Student Registered Successfully!";
        }
        successMessage.classList.add('show');
      
        setTimeout(function() {
          successMessage.classList.remove('show');
        }, 3000);
      }

    // Add or Update details in the table based on the type of action
    // Data are stored in local storage
    register_btn.addEventListener("click", (event) => {
        event.preventDefault();
        let name = document.getElementById("student-name").value.trim();
        let id = document.getElementById("student-id").value.trim();
        let email = document.getElementById("email").value.trim();
        let contact = document.getElementById("contact").value.trim(); 
        
        if (name === "" || id === "" || email === "" || contact === "") {
            if (name === "") {
                name_highlight = document.getElementById("student-name")
                name_highlight.style.border = "2px solid red";
            }
            if (id === "") {
                id_highlight = document.getElementById("student-id")
                id_highlight.style.border = "2px solid red";
            }
            if (email === "") {
                email_highlight = document.getElementById("email")
                email_highlight.style.border = "2px solid red";
            }
            if (contact === "") {
                contact_highlight = document.getElementById("contact")
                contact_highlight.style.border = "2px solid red";
            }
            alert("All fields are required!");
            return;
        }

        if (!/^[a-zA-Z ]+$/.test(name)) {
            alert("Name must contain only letters.");
            return;
        }

        if (!/^[0-9]+$/.test(id)){
            alert("Student ID must contain only numbers.")
            return
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            alert("Enter a valid email");
            return;
        }

        if (!/^\d{10}$/.test(contact)) {
            alert("Contact number must be 10 digits.");
            return;
        }

        let existingEmail = students.find(s => s.email === email);
        let existingID = students.find(s => s.id === id);
        let existingContact = students.find(s => s.contact === contact);
        if (existingEmail && editIndex === null){
            alert("This Email ID is already registered!");
            return;
        }
        if (existingID && editIndex === null){
            alert("This Student ID is already registered!");
            return;
        }
        if (existingContact && editIndex === null){
            alert("This Contact Number is already registered!");
            return;
        }
        if (editIndex !== null) {
            students[editIndex] = { name, id, email, contact };
            showSuccessMessage();
        } else {
            students.push({ name, id, email, contact });
            showSuccessMessage();
        }
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
        studentForm.reset();
        editIndex = null;
        registerBtn.textContent = "Register";
        document.getElementById("cancel_btn").style.display = "none";
        input_box = document.getElementsByClassName("input_box");
        for (i=0;i<input_box.length;i++){
            input_box[i].style.border = "2px solid gray";
        }   
    });

    // Remove data from local storage
    window.deleteStudent = (index) => {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    };

    // Copy the student details to the registration form for editing
    window.editStudent = (index) => {
        let student = students[index];
        document.getElementById("student-name").value = student.name;
        document.getElementById("student-id").value = student.id;
        document.getElementById("email").value = student.email;
        document.getElementById("contact").value = student.contact;       
        editIndex = index;
        register_btn.textContent = "Confirm Changes";
        register_btn.style.fontSize = "Small";
        document.getElementById("cancel_btn").style.display = "inline";
    };

    // Reset the student form
    document.getElementById("cancel_btn").addEventListener("click", () => {
        studentForm.reset();
        editIndex = null;
        register_btn.textContent = "Register";
        register_btn.style.fontSize = "medium";
        document.getElementById("cancel_btn").style.display = "none";
    });

    displayStudents();
});
