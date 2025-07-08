import api from "./api";

// Lấy tất cả bài viết 
export const getPosts = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await api.get(`/post${params ? `?${params}` : ''}`);
  return res.data;
};

// Duyệt bài viết (cập nhật trạng thái)
export const approvePost = async (id) => {
  const res = await api.put(`/post/${id}`, { trang_thai: 'đã duyệt' });
  return res.data;
};

// Xóa bài viết
export const deletePost = async (id) => {
  const res = await api.delete(`/post/${id}`);
  return res.data;
};

// Lấy bài viết theo ID
export const getPostById = async (id) => {
  const res = await api.get(`/post/${id}`);
  return res.data;
};

// Tạo bài viết mới
export const createPost = async (data) => {
  const res = await api.post('/post', data);
  return res.data;
};


