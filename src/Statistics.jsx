import React, { useState, useEffect } from "react";
import { getAllPayments } from "./api/paymentApi"; // hàm API lấy tất cả thanh toán
import "./css/statistics.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Statistics() {
  // Khoảng thời gian thống kê
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 1); // mặc định 1 tháng trước
    return d.toISOString().slice(0, 10);
  });
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().slice(0, 10);
  });

  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const data = await getAllPayments();
        setPayments(data);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu thanh toán:", error);
      }
    }
    fetchPayments();
  }, []);

  // Lọc theo ngày
  useEffect(() => {
    if (!startDate || !endDate) return;
    const filtered = payments.filter((p) => {
      const paidDate = new Date(p.createdAt).toISOString().slice(0, 10);
      return paidDate >= startDate && paidDate <= endDate;
    });
    setFilteredPayments(filtered);
  }, [payments, startDate, endDate]);

  // Tổng doanh thu và số giao dịch
  const totalRevenue = filteredPayments.reduce(
    (sum, p) => sum + p.amount,
    0
  );
  const totalTransactions = filteredPayments.length;

  // Chuẩn bị data cho biểu đồ: nhóm doanh thu theo ngày
  const revenueByDate = filteredPayments.reduce((acc, p) => {
    const dateKey = new Date(p.createdAt).toISOString().slice(0, 10);
    acc[dateKey] = (acc[dateKey] || 0) + p.amount;
    return acc;
  }, {});

  // Chuyển thành mảng để vẽ biểu đồ
  const chartData = Object.entries(revenueByDate)
    .sort((a, b) => (a[0] > b[0] ? 1 : -1))
    .map(([date, amount]) => ({ date, amount }));

  return (
    <div className="statistics-container">
      <h2>Thống kê doanh thu</h2>

      {/* Bộ lọc khoảng thời gian */}
      <div className="filter-date">
        <label>
          Từ ngày:{" "}
          <input
            type="date"
            value={startDate}
            max={endDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          Đến ngày:{" "}
          <input
            type="date"
            value={endDate}
            min={startDate}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      {/* Thống kê tổng quan */}
      <div className="stats-summary">
        <div className="stat-card">
          <h4>Tổng doanh thu</h4>
          <div className="value">{totalRevenue.toLocaleString("vi-VN")} VNĐ</div>
        </div>
        <div className="stat-card">
          <h4>Tổng giao dịch</h4>
          <div className="value">{totalTransactions}</div>
        </div>
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bảng chi tiết */}
      <div className="table-wrapper">
        <h3>Chi tiết giao dịch</h3>
        <div className="scrollable-table">
          <table className="payment-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Người dùng</th>
                <th>Số tiền (VNĐ)</th>
                <th>Thời gian gia hạn (ngày)</th>
                <th>Phương thức</th>
                <th>Trạng thái</th>
                <th>Ngày thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((p) => (
                <tr key={p._id}>
                  <td>{p._id}</td>
                  <td>{p.user_id?.name || "Không rõ"}</td>
                  <td>{p.amount.toLocaleString("vi-VN")}</td>
                  <td>{p.duration}</td>
                  <td>{p.method}</td>
                  <td>{p.status}</td>
                  <td>{new Date(p.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
