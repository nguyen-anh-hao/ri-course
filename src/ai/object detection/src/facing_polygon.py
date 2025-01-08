import face_alignment
import cv2
import numpy as np
import os

fa = face_alignment.FaceAlignment(face_alignment.LandmarksType.THREE_D, flip_input=False)

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

def detect_and_draw_landmarks_3dmm(image_path, output_path):
    try:
        img = cv2.imread(image_path)
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        preds = fa.get_landmarks(img_rgb)

        if preds is not None:
            # Lưu landmark vào file .txt
            landmark_file = os.path.splitext(output_path)[0] + ".txt"
            save_landmarks_to_file(preds, landmark_file)
            print(f"Saved landmarks to: {landmark_file}")

            for pred in preds:
                for point in pred:
                    x, y = int(point[0]), int(point[1])
                    cv2.circle(img, (x, y), 2, (0, 255, 0), -1)

            cv2.imwrite(output_path, img)
            print(f"Saved image to: {output_path}")
        else:
            print(f"No faces detected in: {image_path}")

    except Exception as e:
        print(f"Error processing {image_path}: {e}")

# Đường dẫn đến thư mục chứa ảnh
image_dir = '/home/kelvinle/datasets/images/non_cheating'
# Đường dẫn đến thư mục lưu ảnh đã vẽ landmark
output_dir = '/home/kelvinle/MSU Online /kaggle/input/extended-oep/extended_OEP_single/non_cheating polygon'

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for filename in os.listdir(image_dir):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        image_path = os.path.join(image_dir, filename)
        output_path = os.path.join(output_dir, filename)
        detect_and_draw_landmarks_3dmm(image_path, output_path)