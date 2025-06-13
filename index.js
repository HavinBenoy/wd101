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

  const table = `<table class="table-auto w-full">
    <tr>
      <th class="px-4 py-2">Name</th>
      <th class="px-4 py-2">Email</th>
      <th class="px-4 py-2">Password</th>
      <th class="px-4 py-2">Dob</th>
      <th class="px-4 py-2">Accepted terms?</th>
    </tr>
    ${tableEntries}
  </table>`;

  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

let userEntries = [];
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

  userEntries.push(entry);

  localStorage.setItem("user-entries", JSON.stringify(userEntries));

  displayEntries();
};

userForm.addEventListener("submit", saveUserForm);
