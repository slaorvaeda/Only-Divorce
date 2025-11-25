const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Helper function to make API requests
async function apiRequest(endpoint, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Auth APIs
export const authAPI = {
  sendOTP: (phone, role = 'user') => apiRequest('/auth/send-otp', {
    method: 'POST',
    body: { phone, role },
  }),

  verifyOTP: (phone, otp, role = 'user') => apiRequest('/auth/verify-otp', {
    method: 'POST',
    body: { phone, otp, role },
  }),

  getProfile: () => apiRequest('/auth/profile'),
  
  updateProfile: (data) => apiRequest('/auth/profile', {
    method: 'PUT',
    body: data,
  }),
};

// Topics APIs
export const topicsAPI = {
  getAll: () => apiRequest('/topics'),
  getById: (id) => apiRequest(`/topics/${id}`),
};

// Groups APIs
export const groupsAPI = {
  getAll: (params) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/groups${query ? `?${query}` : ''}`);
  },
  getMyGroups: () => apiRequest('/groups/my-groups'),
  join: (groupId) => apiRequest(`/groups/${groupId}/join`, { method: 'POST' }),
  leave: (groupId) => apiRequest(`/groups/${groupId}/leave`, { method: 'POST' }),
};

// Sessions APIs
export const sessionsAPI = {
  getMySessions: () => apiRequest('/sessions/my-sessions'),
  getUpcoming: () => apiRequest('/sessions/upcoming'),
};

// Messages APIs
export const messagesAPI = {
  getMessages: (params) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/messages${query ? `?${query}` : ''}`);
  },
  sendMessage: (data) => apiRequest('/messages', {
    method: 'POST',
    body: data,
  }),
};

// User APIs
export const userAPI = {
  getDashboard: () => apiRequest('/users/dashboard'),
  updateTopics: (topics) => apiRequest('/users/topics', {
    method: 'PUT',
    body: { topics },
  }),
};

// Moderator APIs
export const moderatorAPI = {
  getDashboard: () => apiRequest('/moderator/dashboard'),
  getGroups: () => apiRequest('/moderator/groups'),
  createGroup: (data) => apiRequest('/moderator/groups', {
    method: 'POST',
    body: data,
  }),
  getPendingRequests: () => apiRequest('/moderator/pending-requests'),
};

// Admin APIs
export const adminAPI = {
  getDashboard: () => apiRequest('/admin/dashboard'),
  getUsers: () => apiRequest('/admin/users'),
  getModerators: () => apiRequest('/admin/moderators'),
  createModerator: (data) => apiRequest('/admin/moderators', {
    method: 'POST',
    body: data,
  }),
  updateUserStatus: (userId, status) => apiRequest(`/admin/users/${userId}/status`, {
    method: 'PUT',
    body: { status },
  }),
};

