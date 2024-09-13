import pymysql

conn= pymysql.connect(
  host='192.168.30.73',
  user='team3_user',
  password='mariadb',
  db='team3',
  charset='utf8'
)

cur =conn.cursor()

name='사람4'
age=29

sql=f"insert into test_db (test_name, test_age) values ('{name}', '{age}')"

cur.execute(sql)

conn.commit()

conn.close()
