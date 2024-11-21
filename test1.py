from deepface import DeepFace
import cv2
import time
import os
from pathlib import Path
import pandas as pd

model_name = "VGG-Face"
detector_backend = 'dlib'
verification_threshold = 0.6

def capture_and_analyze(interval=10, num_frames=5, output_dir="report"):
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    cap = cv2.VideoCapture(0)
    previous_frames = None

    while True:
        start_time = time.time()
        cycle_key = time.strftime("%Y-%m-%d_%H-%M-%S", time.localtime(start_time))
        current_frames = []

        for i in range(num_frames):
            ret, frame = cap.read()
            if not ret:
                print("Lỗi khi đọc frame từ camera.")
                break

            current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
            frame_path = os.path.join(output_dir, f"{cycle_key}_{i}.jpg")
            cv2.imwrite(frame_path, frame)

            try:
                results = DeepFace.find(img_path=frame, db_path="database",
                                        model_name=model_name,
                                        detector_backend=detector_backend,
                                        enforce_detection=False,
                                        anti_spoofing=True)

                if results:
                    if isinstance(results, pd.DataFrame):
                        for _, result in results.iterrows():
                            liveness_result = result['antispoof']
                            liveness_score = liveness_result['score']
                            is_real = liveness_result['verified']
                            identity = result['identity'] if is_real else "Spoof"
                            status = "Real" if is_real else "Spoof"
                            print(f"Time: {current_time}, Face: {i}, Identity: {identity}, Liveness: {status}, Score: {liveness_score}")

                    elif isinstance(results, list):
                         for j, result in enumerate(results):
                            liveness_result = result.get('antispoof',{}) # Xử lý trường hợp key 'antispoof' không tồn tại
                            liveness_score = liveness_result.get('score', None)
                            is_real = liveness_result.get('verified',False)
                            identity = result.get('identity') if is_real else "Spoof"
                            status = "Real" if is_real else "Spoof"

                            print(f"Time: {current_time}, Face: {i}, Identity: {identity if identity else 'Unknown'}, Liveness: {status}, Score: {liveness_score if liveness_score else 'N/A'}")

                    current_frames.append({"frame_path": frame_path, "results": results})
                else:
                    print("Không tìm thấy khuôn mặt.")
                    current_frames.append({"frame_path": frame_path, "results": None})

            except Exception as e:
                print(f"Lỗi Deepface: {str(e)}")

            time.sleep(interval / num_frames)

        # So sánh với chu kỳ trước và lưu report (file .txt)
        report_path = os.path.join(output_dir, f"report_{cycle_key}.txt")
        with open(report_path, "w") as f:
            if previous_frames:
                for current_frame_info in current_frames:
                    for prev_frame_info in previous_frames:
                        try:
                            if current_frame_info['results'] and prev_frame_info['results']:
                                # Thêm đoạn code để xử lý trường hợp results là list
                                if isinstance(current_frame_info['results'], list) and isinstance(prev_frame_info['results'], list):
                                     # Lấy frame_path đầu tiên trong list results (nếu có nhiều khuôn mặt được nhận dạng)
                                    img1_path = current_frame_info['results'][0].get('face_path', current_frame_info['frame_path']) if current_frame_info['results'] else current_frame_info['frame_path']

                                    img2_path = prev_frame_info['results'][0].get('face_path', prev_frame_info['frame_path']) if prev_frame_info['results'] else prev_frame_info['frame_path']
                                    # Xử lý trường hợp không nhận diện được khuôn mặt nào

                                    verification = DeepFace.verify(img1_path=img1_path,
                                                                   img2_path=img2_path,
                                                                   model_name=model_name,
                                                                   detector_backend=detector_backend,
                                                                   enforce_detection=False)
                                    is_verified = verification['verified'] and verification['distance'] <= verification_threshold
                                    f.write(f"Compare {img1_path} with {img2_path}: Verified: {is_verified}, Distance: {verification['distance']}\n")

                                elif isinstance(current_frame_info['results'], pd.DataFrame) and isinstance(prev_frame_info['results'], pd.DataFrame): # xử lý dataframe
                                     img1_path = current_frame_info['results']['face_path'].iloc[0] if not current_frame_info['results'].empty else current_frame_info['frame_path']
                                     img2_path = prev_frame_info['results']['face_path'].iloc[0] if not prev_frame_info['results'].empty else prev_frame_info['frame_path']

                                     verification = DeepFace.verify(img1_path=img1_path,
                                                                   img2_path=img2_path,
                                                                   model_name=model_name,
                                                                   detector_backend=detector_backend,
                                                                   enforce_detection=False)
                                     is_verified = verification['verified'] and verification['distance'] <= verification_threshold
                                     f.write(f"Compare {img1_path} with {img2_path}: Verified: {is_verified}, Distance: {verification['distance']}\n")

                            else:
                                f.write(f"Không thể so sánh do không có khuôn mặt được nhận dạng.\n")

                        except Exception as e:
                            f.write(f"Lỗi khi so sánh khuôn mặt: {str(e)}\n")

        previous_frames = current_frames
        print(f"Đã ghi lại {num_frames} frames và report. Chờ {interval} giây để tiếp tục...")
        time.sleep(max(0, interval - (time.time() - start_time)))

    cap.release()

capture_and_analyze()