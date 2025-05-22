const api = "https://job-board-2-8ing.onrender.com/jobseekers";

// CREATE
document.getElementById('createForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById('createName').value,
    email: document.getElementById('createEmail').value,
    skills: document.getElementById('createSkills').value.split(',').map(s => s.trim()),
    resume: document.getElementById('createResume').value
  };
  await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  alert('Jobseeker Created');
  e.target.reset();
});

// READ
document.getElementById('getForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('getId').value;
  const res = await fetch(`${api}/${id}`);
  const data = await res.json();
  document.getElementById('getResult').innerHTML = `
    <div class="alert alert-secondary">
      <strong>Name:</strong> ${data.name}<br>
      <strong>Email:</strong> ${data.email}<br>
      <strong>Skills:</strong> ${data.skills.join(', ')}<br>
      <strong>Resume:</strong> <a href="${data.resume}" target="_blank">View</a>
    </div>
  `;
});

// UPDATE
document.getElementById('updateForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('updateId').value;
  const data = {
    name: document.getElementById('updateName').value,
    email: document.getElementById('updateEmail').value,
    skills: document.getElementById('updateSkills').value.split(',').map(s => s.trim()),
    resume: document.getElementById('updateResume').value
  };
  await fetch(`${api}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  alert('Jobseeker Updated');
  e.target.reset();
});

// DELETE
document.getElementById('deleteForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('deleteId').value;
  if (!confirm("Are you sure you want to delete?")) return;
  await fetch(`${api}/${id}`, { method: 'DELETE' });
  alert('Jobseeker Deleted');
  e.target.reset();
});
