const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

async function request(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, options);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `API request failed with status ${response.status}`);
  }

  return response.json();
}

/*
  Get all government schemes
*/
export async function getAllSchemes() {
  return request("/schemes");
}


/*
  Get a particular scheme
*/
export async function getSchemeById(id) {
  return request(`/schemes/${encodeURIComponent(id)}`);
}


/*
  Get personalized recommendations
*/
export async function recommendSchemes(farmerData) {
  return request("/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(farmerData)
  });
}