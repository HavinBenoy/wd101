document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();

  let yyyy = today.getFullYear();
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let dd = String(today.getDate()).padStart(2, "0");

  const maxDate = `${yyyy - 18}-${mm}-${dd}`; // 18 years ago
  console.log(maxDate);
  // Now inorder to consider the people who are now 55 years and some months old we are substracting a 56 years and adding a day to the current date.
  let minDate = `${yyyy - 56}-${mm}-${dd}`;
  let new_minDate = new Date(minDate);
  new_minDate.setDate(new_minDate.getDate() + 1);
  // Now structuring the date in the format YYYY-MM-DD
  yyyy = new_minDate.getFullYear();
  mm = String(new_minDate.getMonth() + 1).padStart(2, "0");
  dd = String(new_minDate.getDate()).padStart(2, "0");
  new_minDate = `${yyyy}-${mm}-${dd}`;

  console.log(new_minDate);

  const dobInput = document.getElementById("dob");
  dobInput.max = maxDate;
  dobInput.min = new_minDate;
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
