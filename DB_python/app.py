from flask import Flask, render_template, request
from DB import conn, sql
app=Flask(__name__)

@app.route('/')
def test():
  cur=conn.cursor()
  cur.execute(sql)

  conn.commit()
  conn.close()

  return test('/')


@app.route('/users')
def users():
	# users 데이터를 Json 형식으로 반환한다
  return {"members": [{ "id" : 1, "name" : "yerin" },
  { "id" : 2, "name" : "dalkong" }]}

if __name__ == "__main__":
  app.run(debug = True)
