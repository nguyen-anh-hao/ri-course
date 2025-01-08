import cv2
import torch
from ultralytics import YOLO
import numpy as np

model = YOLO('/home/kelvinle/runs/segment/train7/weights/best.pt')  # Thay thế 'path/to/your/yolov8n-seg.pt' bằng đường dẫn đến model của bạn

# Open the default camera (camera index 0)
cap = cv2.VideoCapture(0)

# Check if the camera opened successfully
if not cap.isOpened():
    print("Error: Could not open camera.")
    exit()

# Get the video's width and height
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

# Define the codec and create VideoWriter object (nếu bạn muốn lưu video đầu ra)
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
output_path = "output.mp4"
out = cv2.VideoWriter(output_path, fourcc, 30.0, (width, height))

def calculate_iou(box1, box2):
    # Determine the (x, y)-coordinates of the intersection rectangle
    xA = max(box1[0], box2[0])
    yA = max(box1[1], box2[1])
    xB = min(box1[2], box2[2])
    yB = min(box1[3], box2[3])

    # Compute the area of intersection rectangle
    interArea = max(0, xB - xA) * max(0, yB - yA)

    # Compute the area of both the prediction and ground-truth
    # rectangles
    box1Area = (box1[2] - box1[0]) * (box1[3] - box1[1])
    box2Area = (box2[2] - box2[0]) * (box2[3] - box2[1])

    # Compute the intersection over union by taking the intersection
    # area and dividing it by the sum of prediction + ground-truth
    # areas - the intersection area
    iou = interArea / float(box1Area + box2Area - interArea)

    return iou

# Create a dictionary to store the previous frame's bounding boxes for each class
prev_boxes = {}

# Loop through the video frames
while cap.isOpened():
    # Read a frame from the video
    success, frame = cap.read()

    if success:
        # Run YOLOv8 inference on the frame
        results = model(frame)

        # Get the current frame's boxes, labels, and confidences
        boxes = results[0].boxes.xyxy.tolist()
        try:
            labels = results[0].boxes.cls.int().tolist()
            confidences = results[0].boxes.conf.float().tolist()
        except:
            labels = []
            confidences = []

        # Initialize the dictionary for the current frame's bounding boxes
        curr_boxes = {}

        # Loop through the results and draw bounding boxes and labels on the frame
        for i, box in enumerate(boxes):
            label = labels[i]
            confidence = confidences[i]

            # Get the class name
            class_name = model.names[label]

            # Add the box to the current frame's dictionary
            if class_name not in curr_boxes:
                curr_boxes[class_name] = []
            curr_boxes[class_name].append(box)

            # Draw the bounding box and label on the frame
            x1, y1, x2, y2 = map(int, box)
            
            # Vẽ bounding box và nhãn trong mọi trường hợp
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)  # Màu xanh lá cho bounding box
            label_text = f"{class_name}: {confidence:.2f}"
            cv2.putText(frame, label_text, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

        # Calculate and print IoU for each class
        for class_name in set(prev_boxes.keys()).union(curr_boxes.keys()):
            if class_name in prev_boxes and class_name in curr_boxes:
                for prev_box in prev_boxes[class_name]:
                    for curr_box in curr_boxes[class_name]:
                        iou = calculate_iou(prev_box, curr_box)
                        # print(f"IoU for {class_name}: {iou:.2f}")

        # Update the previous frame's boxes with the current frame's boxes
        prev_boxes = curr_boxes

        # Write the annotated frame to the output video
        out.write(frame)

        # Display the annotated frame
        cv2.imshow("YOLOv8 Inference", frame)

        # Break the loop if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break
    else:
        # Break the loop if the end of the video is reached
        break

# Release the video capture and writer objects
cap.release()
out.release()

# Close all the frames
cv2.destroyAllWindows()