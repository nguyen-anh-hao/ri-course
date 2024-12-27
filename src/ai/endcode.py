import os
import base64
import requests

def encode_image_to_base64(image_path):
    """Mã hóa ảnh thành Base64"""
    with open(image_path, "rb") as image_file:
        base64_string = "data:image/jpeg;base64," + base64.b64encode(image_file.read()).decode('utf-8')
    return base64_string

def send_verify_request(api_url, img1_path, img2_path):
    """Gửi yêu cầu xác minh đến API"""
    # Mã hóa ảnh
    img1_base64 = encode_image_to_base64(img1_path)
    img2_base64 = encode_image_to_base64(img2_path)

    # Payload gửi đến API
    payload = {
        "img1": img1_base64,
        "img2": img2_base64
    }

    # Gửi yêu cầu POST
    response = requests.post(api_url, json=payload)

    # Trả về kết quả
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"API Error: {response.status_code} {response.text}")

def process_images_in_folder(api_url, folder_path):
    """Xử lý tất cả các cặp ảnh trong thư mục"""
    image_files = sorted([f for f in os.listdir(folder_path) if f.endswith(('.jpg', '.jpeg', '.png'))])

    # Kiểm tra số lượng ảnh
    if len(image_files) < 2:
        raise Exception("Cần ít nhất 2 ảnh trong thư mục để thực hiện xác minh.")

    # Xử lý từng cặp ảnh
    results = []
    for i in range(0, len(image_files) - 1, 2):  # Xử lý theo cặp (img1, img2)
        img1_path = os.path.join(folder_path, image_files[i])
        img2_path = os.path.join(folder_path, image_files[i + 1])

        print(f"Đang xác minh cặp ảnh: {image_files[i]} và {image_files[i + 1]}")

        try:
            result = send_verify_request(api_url, img1_path, img2_path)
            results.append({
                "img1": image_files[i],
                "img2": image_files[i + 1],
                "result": result
            })
        except Exception as e:
            print(f"Lỗi khi xử lý cặp {image_files[i]} và {image_files[i + 1]}: {e}")

    return results

if __name__ == "__main__":
    # URL API backend
    API_URL = "http://127.0.0.1:5005/verify"

    # Đường dẫn đến thư mục chứa ảnh
    IMAGE_FOLDER = "/home/kelvinle/PycharmProjects/TestProJect/database/Vu"

    # Gửi yêu cầu và xử lý
    try:
        results = process_images_in_folder(API_URL, IMAGE_FOLDER)
        for res in results:
            print(f"Kết quả xác minh cho cặp {res['img1']} và {res['img2']}:")
            print(res['result'])
    except Exception as e:
        print(f"Lỗi: {e}")
