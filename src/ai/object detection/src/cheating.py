import cv2
import os

def extract_frames_from_groundtruth(video_path, gt_path, output_dir):
    """
    Trích xuất khung hình từ video dựa trên thông tin trong file groundtruth (định dạng MMSS).

    Args:
        video_path: Đường dẫn đến tệp video.
        gt_path: Đường dẫn đến tệp groundtruth.
        output_dir: Đường dẫn đến thư mục lưu trữ khung hình.
    """

    # Tạo thư mục đầu ra nếu chưa tồn tại
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Mở video
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)

    # Đọc file groundtruth
    with open(gt_path, 'r') as f:
        for line in f:
            start_time, end_time, cheat_type = map(int, line.strip().split())

            # Chuyển đổi thời gian MMSS sang số giây
            start_sec = (start_time // 100) * 60 + (start_time % 100)
            end_sec = (end_time // 100) * 60 + (end_time % 100)

            # Chuyển đổi thời gian sang số khung hình
            start_frame = int(start_sec * fps)
            end_frame = int(end_sec * fps)

            # Trích xuất khung hình trong khoảng thời gian đã cho
            for frame_num in range(start_frame, end_frame + 1, int(fps)):  # Mỗi giây lấy 1 frame
                cap.set(cv2.CAP_PROP_POS_FRAMES, frame_num)
                ret, frame = cap.read()

                if ret:
                    filename = os.path.join(output_dir, f"frame_{frame_num:06d}_type_{cheat_type}.jpg")
                    cv2.imwrite(filename, frame)

    # Giải phóng tài nguyên
    cap.release()
    print(f"Finished extracting frames to {output_dir}")

# Sử dụng hàm
video_path = "/home/kelvinle/MSU Online /kaggle/input/oep-dataset/OEP database/subject24/mustaffa1.avi"
gt_path = "/home/kelvinle/MSU Online /kaggle/input/oep-dataset/OEP database/subject24/gt.txt"
output_dir = "/home/kelvinle/datasets/train/cheaing"
extract_frames_from_groundtruth(video_path, gt_path, output_dir)