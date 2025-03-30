const apiUrl = 'http://localhost:4040/applications';

document.getElementById('applicationForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    jobID: document.getElementById('jobID').value,
    jobseekerID: document.getElementById('jobseekerID').value,
    coverletter: document.getElementById('coverletter').value
  };

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    });

    if (res.ok) {
      alert('Application submitted!');
      e.target.reset();
    } else {
      const error = await res.json();
      alert(error.error || 'Error applying!');
    }
  } catch (err) {
    console.error(err);
  }
});

async function getApplicationsBySeeker() {
  const id = document.getElementById('applicantID').value;
  const res = await fetch(`${apiUrl}/jobseeker/${id}`);
  const data = await res.json();
  displayApplications(data, 'Job Applications by Jobseeker');
}

async function getApplicationsForJob() {
  const id = document.getElementById('appliedJobID').value;
  const res = await fetch(`${apiUrl}/job/${id}`);
  const data = await res.json();
  displayApplications(data, 'Applicants for Job');
}

function displayApplications(applications, title) {
  const container = document.getElementById('applicationResults');
  container.innerHTML = `<h4>${title}</h4>`;
  if (applications.length === 0) {
    container.innerHTML += '<p>No results found.</p>';
    return;
  }
  applications.forEach(app => {
    container.innerHTML += `
      <div class="card shadow-sm p-3 my-2">
        <p><strong>Job Title:</strong> ${app.jobID?.title || 'N/A'}</p>
        <p><strong>Jobseeker Name:</strong> ${app.jobseekerID?.name || 'N/A'}</p>
        <p><strong>Cover Letter:</strong> ${app.coverletter}</p>
      </div>`;
  });
}
