import json
import psycopg2 as pg
from urllib.parse import urlparse

DATABASE_URL = "postgres://cjjlbjdi:Gp4loacJ0QcwAhiDYpwMF8ADFy_7Kmex@baasu.db.elephantsql.com:5432/cjjlbjdi"

url = urlparse(DATABASE_URL)


def insert_feature(data):
    conn = pg.connect(database=url.path[1:],
                      user=url.username,
                      password=url.password,
                      host=url.hostname,
                      port=url.port
                      )
    cur = conn.cursor()
    sql = 'SELECT * from reqs'
    cur.execute(sql)
    rows = cur.fetchall()
    if (cur.rowcount == 0):
        sql = "INSERT into reqs (clienta) VALUES ('" + str(data) + "')"
    else:
        sql = "UPDATE reqs SET clienta = '" + str(data) + "'"
    cur.execute(sql)
    conn.commit()
    conn.close()


def get_all_features():
    conn = pg.connect(database=url.path[1:],
                      user=url.username,
                      password=url.password,
                      host=url.hostname,
                      port=url.port
                      )

    cur = conn.cursor()
    sql = "SELECT * FROM reqs"
    cur.execute(sql)
    rows = cur.fetchall()
    #print(rows)
    cur.close()
    conn.close()
    return rows