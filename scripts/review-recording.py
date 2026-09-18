import cv2
p=r'C:/Users/Usman Farooqi/Videos/Captures/A Life in Motion — Mohammed Rizwan - Google Chrome 2026-09-18 21-48-48.mp4'
c=cv2.VideoCapture(p); duration=c.get(cv2.CAP_PROP_FRAME_COUNT)/c.get(cv2.CAP_PROP_FPS); print(duration)
frames=[]
for t in [0, duration*.15,duration*.3,duration*.5,duration*.7,duration*.9]:
 c.set(cv2.CAP_PROP_POS_MSEC,t*1000); ok,f=c.read()
 if ok:
  f=cv2.resize(f,(640,360));cv2.putText(f,str(round(t,1))+'s',(15,30),cv2.FONT_HERSHEY_SIMPLEX,1,(0,0,255),2);frames.append(f)
import numpy as np
cv2.imwrite('review-cinematic/user-recording.jpg',np.vstack([np.hstack(frames[:2]),np.hstack(frames[2:4]),np.hstack(frames[4:6])]))
