import React, { useEffect, useState } from "react";
import { getPosts, approvePost } from "./api/postApi";
import "./css/post.css";

export default function PostManagement() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // Modal nội dung

  const fetchPosts = async () => {
    try {
      const data = await getPosts({
        loai: "cộng đồng",
        trang_thai: "chờ duyệt",
      });
      setPosts(data);
    } catch (err) {
      console.error("Lỗi khi lấy bài viết:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approvePost(id);
      fetchPosts();
    } catch (err) {
      console.error("Lỗi duyệt bài:", err);
    }
  };

  return (
    <div className="post-container">
      <h2 className="post-title">Danh sách bài viết cộng đồng chờ duyệt</h2>
      <table className="post-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Người đăng</th>
            <th>Tiêu đề</th>
            <th>Loại</th>
            <th>Trạng thái</th>
            <th>Thời gian</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post._id}>
              <td>{index + 1}</td>
              <td>{post.user?.name || "Không rõ"}</td>
              <td>{post.tieu_de || "Không có tiêu đề"}</td>
              <td>{post.loai}</td>
              <td>{post.trang_thai}</td>
              <td>{new Date(post.createdAt).toLocaleString()}</td>
              <td className="action-buttons">
                <button
                  className="btn btn-approve"
                  onClick={() => handleApprove(post._id)}
                >
                  Duyệt
                </button>
                <button
                  className="btn btn-detail"
                  onClick={() => setSelectedPost(post)}
                >
                  Xem chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal xem nội dung bài viết */}
      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedPost.tieu_de || "Tiêu đề không có"}</h3>
            <p>{selectedPost.noi_dung}</p>
            <button className="btn btn-close" onClick={() => setSelectedPost(null)}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
