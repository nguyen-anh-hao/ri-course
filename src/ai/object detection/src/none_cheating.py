import cv2
import os

def extract_frames_outside_groundtruth(video_path, gt_path, output_dir, frames_per_second=1):
    """
    Trích xuất khung hình từ video KHÔNG thuộc khoảng thời gian trong file groundtruth (định dạng MMSS).

    Args:
        video_path: Đường dẫn đến tệp video.
        gt_path: Đường dẫn đến tệp groundtruth.
        output_dir: Đường dẫn đến thư mục lưu trữ khung hình.
        frames_per_second: Số khung hình được trích xuất mỗi giây.
    """

    # Tạo thư mục đầu ra nếu chưa tồn tại
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Mở video
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    # Đọc file groundtruth và lưu các khoảng thời gian đã được gán nhãn (định dạng MMSS)
    labeled_intervals = []
    with open(gt_path, 'r') as f:
        for line in f:
            start_time, end_time, _ = map(int, line.strip().split())

            # Chuyển đổi thời gian MMSS sang số giây
            start_sec = (start_time // 100) * 60 + (start_time % 100)
            end_sec = (end_time // 100) * 60 + (end_time % 100)

            # Chuyển đổi thời gian sang số khung hình
            start_frame = int(start_sec * fps)
            end_frame = int(end_sec * fps)
            labeled_intervals.append((start_frame, end_frame))

    # Trích xuất khung hình không thuộc các khoảng thời gian đã được gán nhãn
    frame_count = 0
    save_count = 0
    while frame_count < total_frames:
        is_labeled = False
        for start, end in labeled_intervals:
            if start <= frame_count <= end:
                is_labeled = True
                break

        if not is_labeled:
            if frame_count % int(fps / frames_per_second) == 0:
                cap.set(cv2.CAP_PROP_POS_FRAMES, frame_count)
                ret, frame = cap.read()
                if ret:
                    filename = os.path.join(output_dir, f"frame_{frame_count:06d}.jpg")
                    cv2.imwrite(filename, frame)
                    save_count += 1

        frame_count += 1

    # Giải phóng tài nguyên
    cap.release()
    print(f"Finished extracting {save_count} frames outside groundtruth to {output_dir}")


# Sử dụng hàm
video_path = "/home/kelvinle/MSU Online /kaggle/input/oep-dataset/OEP database/subject24/mustaffa1.avi"
gt_path = "/home/kelvinle/MSU Online /kaggle/input/oep-dataset/OEP database/subject24/gt.txt"
output_dir = "/home/kelvinle/datasets/images/non_cheating"
frames_per_second = 1 #  Số frame mỗi giây

extract_frames_outside_groundtruth(video_path, gt_path, output_dir, frames_per_second)