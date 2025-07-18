import api from './api'; 

// Tạo thanh toán mới
export const createPayment = async (data) => {
  const res = await api.post('/payments', data);
  return res.data;
};

// Lấy danh sách tất cả thanh toán
export const getAllPayments = async () => {
  const res = await api.get('/payments');
  return res.data;
};
