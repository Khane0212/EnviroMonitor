import React from 'react';

export default function Help() {
  return (
    <div style={{ color: 'white' }}>
      <h2 className="mb-4">📖 Hướng dẫn</h2>
      <p>
        Chào mừng bạn đến với hệ thống giám sát môi trường EnviroMonitor! Dưới đây là một số hướng dẫn cơ bản:
      </p>
      <ul>
        <li><b>Tab Tổng quan:</b> Hiển thị bản đồ môi trường với dữ liệu nhiệt độ, độ ẩm, PM2.5, v.v tại vị trí bạn chọn.</li>
        <li><b>Chọn vị trí trên bản đồ:</b> Click vào vị trí bất kỳ trên bản đồ để xem thông tin chi tiết.</li>
        <li><b>Mức độ ô nhiễm không khí:</b> Chú thích màu sắc và icon giúp bạn nhanh chóng nhận biết mức độ an toàn của không khí.</li>
      </ul>
      <p>
        Nếu có thắc mắc hay cần hỗ trợ thêm, vui lòng liên hệ với nhà phát triển.
      </p>
    </div>
  );
}
