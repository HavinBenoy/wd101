function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();

  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const maxDate = `${yyyy - 18}-${mm}-${dd}`; // 18 years ago
  console.log(maxDate);
  const minDate = `${yyyy - 55}-${mm}-${dd}`; // 55 years ago
  console.log(minDate);

  const dobInput = document.getElementById("dob");
  dobInput.setAttribute("max", maxDate);
  dobInput.setAttribute("min", minDate);
});

let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

const displayEntries = () => {
  let entries = retrieveEntries();
  /*
  <table>
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
    <tr>
      <td>John Doe</td>
      <td>john@doe.com</td>
    </tr>
  </table>
  */
  const tableEntries = entries
    .map((entryy) => {
      const nameCell = `<td class='border px-4 py-2'>${entryy.name}</td>`;
      const emailCell = `<td class='border px-4 py-2'>${entryy.email}</td>`;
      const passwordCell = `<td class='border px-4 py-2'>${entryy.password}</td>`;
      const dobCell = `<td class='border px-4 py-2'>${entryy.dob}</td>`;
      const acceptedTermsCell = `<td class='border px-4 py-2'>${entryy.acceptedTermsAndConditions}</td>`;
      const row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptedTermsCell}</tr>`;
      return row;
    })
    .join("\n");

  const table = `${tableEntries}`;

  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;

  const acceptedTermsAndConditions =
    document.getElementById("acceptTerms").checked;

  const age = calculateAge(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55 years.");
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndConditions,
  };

  const userEntries = retrieveEntries();
  userEntries.push(entry);

  localStorage.setItem("user-entries", JSON.stringify(userEntries));

  displayEntries();
};

userForm.addEventListener("submit", saveUserForm);

displayEntries();
