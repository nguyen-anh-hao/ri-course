import face_alignment
import cv2
import numpy as np
import os
import math

# Khởi tạo face alignment model
fa = face_alignment.FaceAlignment(face_alignment.LandmarksType.THREE_D, flip_input=False)

def get_bbox_from_landmarks(landmarks):
    """Lấy bounding box bao quanh tất cả các landmarks."""
    if landmarks is None or len(landmarks) == 0:
        return None
    landmarks = landmarks[0]
    landmarks_np = np.array(landmarks)
    x_min = landmarks_np[:, 0].min()
    y_min = landmarks_np[:, 1].min()
    x_max = landmarks_np[:, 0].max()
    y_max = landmarks_np[:, 1].max()
    return (x_min, y_min, x_max, y_max)

def create_yolo_segmentation_label(image_path, output_dir, landmarks, label):
    """Tạo file label YOLOv8 segmentation với tọa độ được chuẩn hóa."""
    try:
        if landmarks is None or len(landmarks) == 0:
            print(f"No landmarks found for {image_path}")
            return

        img = cv2.imread(image_path)
        if img is None:
            print(f"Error: Could not read image {image_path}")
            return

        image_height, image_width, _ = img.shape
        landmarks = landmarks[0]
        class_id = 0 if label == "cheating" else 1
        filename = os.path.splitext(os.path.basename(image_path))[0]
        label_file_path = os.path.join(output_dir, filename + ".txt")

        with open(label_file_path, "w") as f:
            f.write(f"{class_id}")
            for landmark in landmarks:
                normalized_x = landmark[0] / image_width
                normalized_y = landmark[1] / image_height
                f.write(f" {normalized_x:.6f} {normalized_y:.6f}")
            f.write("\n")

    except Exception as e:
        print(f"Error creating YOLO segmentation label file for {image_path}: {e}")

def load_landmarks_from_file(landmark_file):
    """Đọc landmark từ file."""
    landmarks = []
    try:
        with open(landmark_file, "r") as f:
            for line in f:
                x, y, z = map(float, line.strip().split())
                landmarks.append([x, y, z])

        # Chuyển về dạng list chứa 1 list
        return [np.array(landmarks)]

    except Exception as e:
        print(f"Error reading landmark file {landmark_file}: {e}")
        return None

def save_landmarks_to_file(preds, landmark_file):
    """Lưu landmark vào file."""
    if preds is None or len(preds) == 0:
        return

    try:
        with open(landmark_file, "w") as f:
            for landmark in preds[0]:
                f.write(f"{landmark[0]:.6f} {landmark[1]:.6f} {landmark[2]:.6f}\n")
    except Exception as e:
        print(f"Error writing to landmark file {landmark_file}: {e}")

def process_images(image_dir, label, output_dir):
    files_to_delete = []  # Danh sách các file cần xóa
    for filename in os.listdir(image_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            image_path = os.path.join(image_dir, filename)
            try:
                img = cv2.imread(image_path)
                if img is None:
                    print(f"Error: Could not read image {image_path}")
                    continue
                img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                preds = fa.get_landmarks(img_rgb)

                if preds is None or len(preds) == 0:
                    print(f"No face detected by face_alignment in {image_path}, trying to load from file...")
                    # Thử đọc landmark từ file
                    landmark_file = os.path.splitext(image_path)[0] + ".txt"  # Giả định tên file landmark giống tên ảnh
                    if os.path.exists(landmark_file):
                        try:
                            preds = load_landmarks_from_file(landmark_file)
                            create_yolo_segmentation_label(image_path, output_dir, preds, label)
                        except Exception as e:
                            print(f"Error loading or creating label from landmark file {landmark_file}: {e}")
                            files_to_delete.append(image_path)
                    else:
                        print(f"No landmark file found for {image_path}, adding to delete list...")
                        files_to_delete.append(image_path)  # Thêm vào danh sách cần xóa
                    continue
                else:
                    create_yolo_segmentation_label(image_path, output_dir, preds, label)
                    # Lưu landmark vào file (nếu bạn muốn cập nhật file landmark)
                    save_landmarks_to_file(preds, os.path.splitext(image_path)[0] + ".txt")

            except Exception as e:
                print(f"Error processing image {image_path}: {e}")

    # Xóa các file sau khi duyệt xong
    for file_path in files_to_delete:
        try:
            os.remove(file_path)
            print(f"Deleted: {file_path}")
        except OSError as e:
            print(f"Error deleting file {file_path}: {e}")

def process_dataset(image_dir_cheating, image_dir_none_cheating, output_dir):
    """Xử lý toàn bộ dataset và tạo file label YOLOv8 segmentation."""
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    process_images(image_dir_cheating, "cheating", output_dir)
    process_images(image_dir_none_cheating, "none_cheating", output_dir)

# Đường dẫn đến thư mục chứa ảnh - Thay thế bằng đường dẫn của bạn
image_dir_cheating = "/home/kelvinle/MSU Online /kaggle/input/extended-oep/extended_OEP_single/cheating polygon"
image_dir_none_cheating = "/home/kelvinle/MSU Online /kaggle/input/extended-oep/extended_OEP_single/non_cheating polygon"
output_dir = "/home/kelvinle/MSU Online /kaggle/input/extended-oep/extended_OEP_single/label_1"

process_dataset(image_dir_cheating, image_dir_none_cheating, output_dir)

print("Label creation completed.")