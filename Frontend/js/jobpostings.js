const jobApiUrl = 'http://localhost:4040/jobs';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('jobForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const job = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      companyName: document.getElementById('companyName').value,
      location: document.getElementById('location').value,
      salaryRange: document.getElementById('salaryRange').value
    };

    try {
      const res = await fetch(jobApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job)
      });

      const data = await res.json();
      alert('Job posted!');
      e.target.reset();
      displayJob(data);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  });

  document.getElementById('getJobBtn').addEventListener('click', getJobById);
  document.getElementById('updateJobBtn').addEventListener('click', updateJob);
  document.getElementById('deleteJobBtn').addEventListener('click', deleteJob);
  document.getElementById('searchJobBtn').addEventListener('click', searchJobs);
});

async function getJobById() {
  const id = document.getElementById('jobId').value;
  try {
    const res = await fetch(`${jobApiUrl}/${id}`);
    const data = await res.json();
    displayJob(data);
  } catch (error) {
    console.error('Error fetching job:', error);
  }
}

async function updateJob() {
  const id = document.getElementById('jobId').value;

  const updatedJob = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    companyName: document.getElementById('companyName').value,
    location: document.getElementById('location').value,
    salaryRange: document.getElementById('salaryRange').value
  };

  try {
    const res = await fetch(`${jobApiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedJob)
    });

    const data = await res.json();
    alert('Job updated!');
    displayJob(data.jobPosting || data);
  } catch (error) {
    console.error('Error updating job:', error);
  }
}

async function deleteJob() {
  const id = document.getElementById('jobId').value;
  if (!confirm('Are you sure you want to delete this job posting?')) return;

  try {
    await fetch(`${jobApiUrl}/${id}`, { method: 'DELETE' });
    alert('Job deleted!');
    document.getElementById('jobInfo').classList.add('d-none');
  } catch (error) {
    console.error('Error deleting job:', error);
  }
}

async function searchJobs() {
  const title = document.getElementById('searchTitle').value;
  const location = document.getElementById('searchLocation').value;
  const companyName = document.getElementById('searchCompany').value;

  const queryParams = new URLSearchParams();
  if (title) queryParams.append('title', title);
  if (location) queryParams.append('location', location);
  if (companyName) queryParams.append('companyName', companyName);

  try {
    const res = await fetch(`${jobApiUrl}?${queryParams.toString()}`);
    const jobs = await res.json();

    if (Array.isArray(jobs) && jobs.length > 0) {
      displayJob(jobs[0]); // display first match
    } else {
      alert('No matching jobs found.');
      document.getElementById('jobInfo').classList.add('d-none');
    }
  } catch (error) {
    console.error('Error searching jobs:', error);
  }
}

function displayJob(data) {
  document.getElementById('jobTitle').textContent = data.title;
  document.getElementById('jobDesc').textContent = data.description;
  document.getElementById('jobCompany').textContent = data.companyName;
  document.getElementById('jobLoc').textContent = data.location;
  document.getElementById('jobSalary').textContent = data.salaryRange;
  document.getElementById('jobInfo').classList.remove('d-none');
}
