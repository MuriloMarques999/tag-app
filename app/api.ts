const BASE_URL = 'http://localhost:4000';

let _token: string | null = null;
export function setToken(t: string | null) {
  _token = t;
}

export function logout() {
  _token = null;
}

async function request(path: string, opts: RequestInit = {}) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(opts.headers as Record<string,string> || {}) };
  if (_token) headers.Authorization = `Bearer ${_token}`;
  const res = await fetch(`${BASE_URL}${path}`, { ...opts, headers });
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

async function requestRaw(url: string, opts: RequestInit = {}) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(opts.headers as Record<string,string> || {}) };
  const res = await fetch(url, { ...opts, headers });
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

export async function getEsp32Status() {
  return requestRaw('http://localhost:3000/api/status');
}

export async function login(email: string, password: string) {
  return request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}

export async function register(name: string, email: string, password: string, role = 'admin') {
  return request('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password, role }) });
}

export async function getRequests() {
  return request('/api/requests');
}

export async function getRequest(requestId: number) {
  return request(`/api/requests/${requestId}`);
}

export async function getTags() {
  return request('/api/tags');
}

export default { setToken, logout, login, register, getRequests, getRequest, getTags, getEsp32Status };
