import pika
import time
import json
import math
import urllib
import http.client
import time
import random


# traccar

id = '869170034060997'
server = 'localhost:5055'
period = 1
step = 0.001
device_speed = 30
driver_id = '22333'

def send(conn, lat, lon, course, speed, alarm, ignition, accuracy, rpm, fuel, driverUniqueId,imei):
    params = (('id', imei), ('timestamp', int(time.time())), ('lat', lat),
              ('lon', lon), ('bearing', course), ('speed', device_speed))
    if alarm:
        params = params + (('alarm', 'sos'),)
    if ignition:
        params = params + (('ignition', 'true'),)
    if accuracy:
        params = params + (('accuracy', accuracy),)
    if rpm:
        params = params + (('rpm', rpm),)
    if fuel:
        params = params + (('fuel', fuel),)
    if driverUniqueId:
        params = params + (('driverUniqueId', driver_id),)

    conn.request('GET', '?' + urllib.parse.urlencode(params))
    conn.getresponse().read()

def course(lat1, lon1, lat2, lon2):
    lat1 = lat1 * math.pi / 180
    lon1 = lon1 * math.pi / 180
    lat2 = lat2 * math.pi / 180
    lon2 = lon2 * math.pi / 180
    y = math.sin(lon2 - lon1) * math.cos(lat2)
    x = math.cos(lat1) * math.sin(lat2) - math.sin(lat1) * \
        math.cos(lat2) * math.cos(lon2 - lon1)
    return (math.atan2(y, x) % (2 * math.pi)) * 180 / math.pi    

conn = http.client.HTTPConnection(server)  
accuracy = 100 
alarm=0
ignition=1
rpm = random.randint(500, 4000)
fuel = random.randint(0, 80)  

# pika connection config

credentials = pika.PlainCredentials('admin','admin')
parameters = pika.ConnectionParameters('23.99.133.155',
                                   5672,
                                    '/',
                                    credentials)
connection=pika.BlockingConnection(parameters)
channel=connection.channel()

waypoint=[]

def callback(ch, method, properties, body):
    data = json.loads(body.decode())
    #if(data["serial"]=="869170034060997"):
    send(conn, float(data["lat"]), float(data["lng"]), 0, device_speed,alarm, ignition, accuracy, rpm, fuel, driver_id,data["serial"])
    print(" [x] Done")
     
    

channel.basic_consume(
    queue="gps_nxt21_events",on_message_callback=callback, auto_ack=True
)
channel.start_consuming()