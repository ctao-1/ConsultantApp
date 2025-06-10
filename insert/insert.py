import psycopg2
import locale
print("系统默认编码:", locale.getpreferredencoding())
import os
os.environ['PYTHONIOENCODING'] = 'utf-8'
# 数据库连接信息
conn = psycopg2.connect(dbname="consult",user="postgres",password="123456",host="localhost",port="5432")
cur = conn.cursor()

# 读取图片文件为二进制
with open('xia.jpg', 'rb') as f:
    binary_data = f.read()

# 插入数据
sql = """
INSERT INTO consultants (name, title, profile_picture, specialties, experience, rate, is_online, education, certification, code, bio)
VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
"""

cur.execute(sql, (
    '李医生', 
    '临床心理学博士',
    psycopg2.Binary(binary_data),
    ['婚姻家庭', '职场压力', '焦虑抑郁'],
    12,
    500, 
    'false',
    'XX医科大学临床心理学博士', 
    '注册临床心理师证书',
    'XXXXXXXXX',
    '李医生在心理咨询领域深耕十余年，对婚姻关系调适、家庭冲突解决以及职场人士常见的焦虑、抑郁情绪有深入研究和丰富的干预经验。他的咨询风格温和而富有洞察力，致力于帮助来访者重建积极的家庭互动模式和健康的工作心态。'
))

conn.commit()
cur.close()
conn.close()