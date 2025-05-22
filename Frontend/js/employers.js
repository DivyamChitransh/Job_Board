const employerApiUrl = 'https://job-board-2-8ing.onrender.com/employers';

document.getElementById('employerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const employer = {
    companyName: document.getElementById('companyName').value,
    email: document.getElementById('email').value,
    mobile: document.getElementById('mobile').value,
    address: document.getElementById('address').value,
    skills: document.getElementById('skills').value.split(',').map(s => s.trim())
  };

  try {
    const res = await fetch(employerApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employer)
    });

    const data = await res.json();
    alert('Employer created!');
    e.target.reset();
    displayEmployer(data);
  } catch (error) {
    console.error('Error creating employer:', error);
  }
});

async function getEmployerById() {
  const id = document.getElementById('employerId').value;
  try {
    const res = await fetch(`${employerApiUrl}/${id}`);
    const data = await res.json();
    displayEmployer(data);
  } catch (error) {
    console.error('Error fetching employer:', error);
  }
}

async function updateEmployer() {
  const id = document.getElementById('employerId').value;

  const updated = {
    companyName: document.getElementById('companyName').value,
    email: document.getElementById('email').value,
    mobile: document.getElementById('mobile').value,
    address: document.getElementById('address').value,
    skills: document.getElementById('skills').value.split(',').map(s => s.trim())
  };

  try {
    const res = await fetch(`${employerApiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });

    const data = await res.json();
    alert('Employer updated!');
    displayEmployer(data);
  } catch (error) {
    console.error('Error updating employer:', error);
  }
}

async function deleteEmployer() {
  const id = document.getElementById('employerId').value;
  if (!confirm('Are you sure you want to delete this employer?')) return;

  try {
    await fetch(`${employerApiUrl}/${id}`, { method: 'DELETE' });
    alert('Employer deleted!');
    document.getElementById('employerInfo').classList.add('d-none');
  } catch (error) {
    console.error('Error deleting employer:', error);
  }
}

function displayEmployer(data) {
  document.getElementById('empCompany').textContent = data.companyName;
  document.getElementById('empEmail').textContent = data.email;
  document.getElementById('empMobile').textContent = data.mobile;
  document.getElementById('empAddress').textContent = data.address;
  document.getElementById('empSkills').textContent = data.skills.join(', ');
  document.getElementById('employerInfo').classList.remove('d-none');
}
