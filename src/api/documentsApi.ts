const BASE_URL = import.meta.env?.VITE_API_URL;
console.log('Current BASE_URL:', import.meta.env?.VITE_API_URL);

if (!BASE_URL) {
  throw new Error('Передан пустой API');
}

async function request<T>(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка API: ${response.status}`);
  }
  return response.json();
}

export async function fetchDocuments(search?: string) {
  let url = `${BASE_URL}/documents/pageable`;
  if (search) {
    url = `${url}?search=${encodeURIComponent(search)}`;
  }
  const responseJson = request(url);
  return responseJson;
}

export async function fetchDocumentsByID(id?: string) {
  const url = `${BASE_URL}/documents/${id}`;
  const responseJson = request(url);
  return responseJson;
}
