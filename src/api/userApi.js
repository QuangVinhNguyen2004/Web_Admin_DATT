import api from "./api";

export const getUsersByRole = async (role = "user") => {
  const res = await api.get(`/user?role=${role}`); 
  return res.data;
};

export const updateUserStatus = async (id, status) => {
  const res = await api.patch(`/user/${id}/status`, {
    status,
  });
  return res.data;
};
