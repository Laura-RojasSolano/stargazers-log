const repoList = document.getElementById("repo-list");
const status = document.getElementById("status");

function formatDate(value) {
  const date = new Date(value);

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function renderRepositories(repositories) {
  repoList.innerHTML = "";

  repositories.forEach((repository) => {
    const item = document.createElement("li");
    item.className = "repo-item";

    item.innerHTML = [
      '<h3 class="repo-title">',
      `  <a class="repo-link" href="${repository.html_url}" target="_blank" rel="noreferrer">`,
      `    ${repository.owner}/${repository.name}`,
      "  </a>",
      "</h3>",
      '<p class="repo-description">',
      `  ${repository.description}`,
      "</p>",
      '<p class="repo-meta">',
      `  <span>Language: ${repository.language}</span>`,
      `  <span>Starred: ${formatDate(repository.starred_at)}</span>`,
      "</p>"
    ].join("\n");

    repoList.appendChild(item);
  });

  status.textContent = `${repositories.length} repositories loaded.`;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    renderRepositories(repositories);
  } catch (error) {
    status.textContent = "Unable to load starred repositories.";
    repoList.innerHTML = '<li class="repo-item">Check that the project is being served over HTTP.</li>';
    console.error(error);
  }
}

loadRepositories();