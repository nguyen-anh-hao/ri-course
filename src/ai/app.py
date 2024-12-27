from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
import cv2
import base64
import threading
from deepface import DeepFace
import os
import datetime
from io import BytesIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

# ---  Load image database --- #
IMAGE_FOLDER = "/home/kelvinle/PycharmProjects/TestProJect/database/Vu" # Thay bằng đường dẫn đến thư mục ảnh
reference_images = {} # Khởi tạo dictionary lưu trữ ảnh tham chiếu
for filename in os.listdir(IMAGE_FOLDER):
    if filename.endswith(('.jpg', '.jpeg', '.png')):
         reference_images[filename] = os.path.join(IMAGE_FOLDER, filename)

print(reference_images)
# --- End load image database --- #

def base64_encode_frame(frame):
     _, buffer = cv2.imencode('.jpg', frame)
     return "data:image/jpeg;base64," + base64.b64encode(buffer).decode('utf-8')

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
     print("Client connected")

@socketio.on('disconnect')
def handle_disconnect():
     print("Client disconnected")

# Configure if you want to save image or not
SAVE_IMAGE = False  # Set to True to enable saving, False to disable

image_chunks = {}

@socketio.on('image_chunk')
def handle_image_chunk(data):
     sid = request.sid;
     if sid not in image_chunks:
          image_chunks[sid] = {}

     image_chunks[sid][data['chunkIndex']] = data['chunk'] # fix here

     if (len(image_chunks[sid]) == data['totalChunks']): # fix here
         full_image = ""
         for i in range(0, data['totalChunks']): # fix here
            full_image += image_chunks[sid][i]

         #handle image here.
         process_image(full_image, sid)
         del image_chunks[sid]

def process_image(base64_string, sid):
    try:
           # Load the frame image
        img_data = base64.b64decode(base64_string)

        # Create folder to store images
        SAVE_FOLDER = "captured_frames"
        os.makedirs(SAVE_FOLDER, exist_ok=True) # Create if doesn't exists

        # Save image
        if (SAVE_IMAGE):
            now = datetime.datetime.now()
            filename =  f"frame_{now.strftime('%Y-%m-%d-%H-%M-%S-%f')}.jpg" # Create name for each image
            filepath = os.path.join(SAVE_FOLDER, filename)
            with open(filepath, "wb") as f:
                f.write(img_data)
            print("Saved frame to:", filepath)
        else:
            filepath = "temp.jpg"
            with open(filepath, "wb") as f:
                f.write(img_data)


        # Verify with all reference images.
        results = []
        for key, image_path in reference_images.items():
            result = DeepFace.verify(
                img1_path=filepath,
                img2_path=image_path,
                enforce_detection=True,
                detector_backend = "retinaface"
            )
            results.append({
                  "image": key,
                  "result": result
            })
        emit('verify_results', results, to=sid)

    except Exception as e:
          emit('error', {'message': str(e)}, to=sid)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5005, debug=True)