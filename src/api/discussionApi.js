import api from '../lib/axios';

export const fetchAllDiscussions = () => api.get('/discussions');

export const createDiscussion = (data) => api.post('/discussions/create', data);

export const fetchDiscussionById = (id) => api.get(`/discussions/${id}`);
