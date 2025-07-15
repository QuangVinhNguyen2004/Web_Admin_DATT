const cron = require('node-cron');
const Schedule = require('../models/Schedule');
const Notification = require('../models/notification');

const checkScheduleAndNotify = async () => {
  const now = new Date();
  const nowHour = now.getHours();
  const nowMinute = now.getMinutes();

  console.log(`🕒 [CRON] Đang kiểm tra lịch trình tại ${nowHour}:${nowMinute}`);

  try {
    const schedules = await Schedule.find();
    console.log(`📋 Tìm thấy ${schedules.length} lịch trình.`);

    for (const schedule of schedules) {
      const scheduleTime = new Date(schedule.startTime);
      const scheduleHour = scheduleTime.getHours();
      const scheduleMinute = scheduleTime.getMinutes();

      const isSameTime = scheduleHour === nowHour && scheduleMinute === nowMinute;
      if (!isSameTime) {
        console.log(`⏩ Bỏ qua: ${schedule.activity} (${scheduleHour}:${scheduleMinute})`);
        continue;
      }

      console.log(`🔍 Kiểm tra lịch trình khớp giờ: ${schedule.activity}`);

      if (schedule.repeat === 'Có') {
        // Lặp lại hằng ngày => kiểm tra thông báo hôm nay đã tạo chưa
        const startOfToday = new Date(now);
        startOfToday.setHours(0, 0, 0, 0);

        const existed = await Notification.findOne({
          schedule_id: schedule._id,
          thoi_gian: { $gte: startOfToday },
        });

        if (existed) {
          console.log(`⚠️ Đã có thông báo hôm nay cho lịch trình lặp lại: ${schedule.activity}`);
          continue;
        }
      } else {
        // Không lặp => kiểm tra đã có thông báo chưa
        const existed = await Notification.findOne({ schedule_id: schedule._id });
        if (existed) {
          console.log(`⚠️ Đã có thông báo 1 lần cho lịch trình không lặp: ${schedule.activity}`);
          continue;
        }
      }

      // Tạo thông báo mới
      await Notification.create({
        schedule_id: schedule._id,
        noi_dung: `Đến giờ: ${schedule.activity}`,
        thoi_gian: now,
      });

      console.log(`✅ Tạo thông báo cho lịch trình: ${schedule.activity}`);
    }
  } catch (error) {
    console.error('❌ Lỗi khi kiểm tra lịch trình:', error);
  }
};

const startScheduleNotificationJob = () => {
  // Cron chạy mỗi phút
  cron.schedule('* * * * *', () => {
    checkScheduleAndNotify();
  });
  console.log('🔔 Cron job kiểm tra lịch trình đã khởi động');
};

module.exports = startScheduleNotificationJob;
