# -*- coding: utf-8 -*-
from flask import Flask
from flask import request
from flask import render_template
from flask import make_response, redirect, url_for
from flask import jsonify
import os
import json
import MySQLdb
import time
import datetime
# import MySQLdb  #import数据库模块
# 待补充


# 设定好ssl证书的地址
path = os.path.dirname(os.path.abspath(__file__))
print path
certfile = os.path.join(path, "sssxfd.top_public.crt")
keyfile = os.path.join(path, "sssxfd.top.key")

# 连接数据库
# 这部分待补充

app = Flask(__name__)
wsgi_app = app.wsgi_app


# index测试
# flask运行之后打开url  https://localhost:8080
# 如果出现hello world就表示flask服务开启成功
@app.route('/')
@app.route('/index')
def index():
    return json.dumps("hello world")


# 完善个人信息
@app.route('/improve_personal_information', methods=['GET', 'POST'])
def improve_personal_information():
    pass

# 注册
@app.route('/sign_up', methods=['GET', 'POST'])
def sign_up():
    json_data = request.get_json()
    # json_data = {
    #     "error_code": 0,
    #     "data": {
    #         "telephone": "14333333555",
    #         "password": "qqqqqqq",
    #         "name": "有所谓",
    #         "sex": "男",
    #         "academy": "经管学院",
    #         "student_id": "071702432",
    #         "wechat_name": "sdees111",
    #         "head_link": "1"
    #     }
    # }
    # print (json_data)
    telephone = json_data["data"]["telephone"]
    password = json_data["data"]["password"]
    name = json_data["data"]["name"]
    sex = json_data["data"]["sex"]
    academy = json_data["data"]["academy"]
    student_id = json_data["data"]["student_id"]
    wechat_name = json_data["data"]["wechat_name"]
    head_link = json_data["data"]["head_link"]

    db = MySQLdb.connect
    cursor = db.cursor()

    sql = """select password 
                from user 
                where telephone= %s """
    try:
        cursor.execute(sql % telephone)
        results = cursor.fetchone()
        if results:  #发现数据库已经有这个账号了
            res = {
                "error_code": 0,
                "data": {
                    "result": "0",
                }
            }
        else:#数据没有这个账号  进行注册
            sql = """INSERT INTO user(wechat_name, head_link, name, telephone, sex, 
                    academy, student_id, password)
                    values(%s,%s,%s,%s,%s,%s,%s,%s)"""
            #print (sql)
            try:
                # 执行sql语句
                cursor.execute(sql, (wechat_name, head_link, name, telephone, sex,
                                     academy, student_id, password))
                # 提交到数据库执行
                db.commit()
                res = {
                    "error_code": 0,
                    "data": {
                        "result": "1",
                    }
                }
            except:
                # Rollback in case there is any error
                db.rollback()
                print ("error")
    except:
        # Rollback in case there is any error
        db.rollback()
        print ("error")

    # 关闭数据库连接
    db.close()
    #print(res)
    return json.dumps(res, ensure_ascii=False)

    # 关闭数据库连接
    db.close()
    res = {
        "error_code": 0,
        "data": {
            "result": "1",
        }
    }
    return json.dumps(res, ensure_ascii=False)

#登录
@app.route('/sign_in', methods=['GET', 'POST'])
def sign_in():
    json_data = request.get_json()
    # json_data = {
    #     "error_code": 0,
    #     "data": {
    #         "telephone": "15859627306",
    #         "password": "qqqqqq",
    #     }
    # }
    telephone = json_data["data"]["telephone"]
    password = json_data["data"]["password"]
    db = MySQLdb.connect
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
    sql = """select password 
            from user 
            where telephone= %s """
    try:
        cursor.execute(sql % telephone)
        results = cursor.fetchone()
        if results:
            password1 = str(results["password"])
            if password == password1:
                result = 1  # 登录成功
            else:
                result = 0  # 登录失败
        else:
            result = 2
            # password1=str(results["password"])
            # print (password1)
            # print (type(password1))

    except:
        print("Error: unable to fecth data")
    db.close()
    # password1 = res["data"]["password"]
    res = {
        "error_code": 0,
        "data": {
            "result": result,
        }
    }
    return json.dumps(res, ensure_ascii=False)
# 查看个人信息
@app.route('/show_personal_information', methods=['GET', 'POST'])
def show_personal_information():
    json_data = request.get_json()
    # json_data = {
    #     "error_code": 0,
    #     "data": {
    #         "telephone": "10000000000",
    #     }
    # }
    res = {
        "error_code": 0,
        "data": []
    }
    telephone = json_data["data"]["telephone"]
    db = MySQLdb.connect
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
    sql = """select * 
            from user 
            where telephone= %s """
    try:
        cursor.execute(sql % telephone)
        results = cursor.fetchall()
        for row in results:
            res["data"].append(row)
    except:
        print("Error: unable to fecth data")

    db.close()
    print (res)
    return json.dumps(res, ensure_ascii=False)

# 接单
@app.route('/get_order', methods=['GET', 'POST'])
def get_order():
    json_data = request.get_json()
    # json_data = {
    #     "error_code": 0,
    #     "data": {
    #         "order_number": "1",
    #         "order_type": "0",
    #         "order_status": "0",
    #         "canteen": "紫荆园二楼",
    #         "s_dormitory_1": "32",
    #         "s_dormitory_2": "316",
    #         "money": "2.0",
    #         "requirement_customer": "水煮肉片，不加香菜",
    #         "requirement_delivery": "走路，可能会有点慢",
    #         #"order_delivery_time": "null", 删掉
    #         "telephone_delivery": "13205030028",
    #         "telephone_customer": "13859040643"
    #     }
    # }

    canteen = json_data["data"]["canteen"]
    money = json_data["data"]["money"]
    order_delivery_time = datetime.datetime.now().strftime("%H:%M")
    order_number = json_data["data"]["order_number"]
    order_status = json_data["data"]["order_status"]
    order_type = json_data["data"]["order_type"]
    requirement_customer = json_data["data"]["requirement_customer"]
    requirement_delivery = json_data["data"]["requirement_delivery"]
    s_dormitory_1 = json_data["data"]["s_dormitory_1"]
    s_dormitory_2 = json_data["data"]["s_dormitory_2"]
    telephone_delivery = json_data["data"]["telephone_delivery"]
    telephone_customer = json_data["data"]["telephone_customer"]

    db = MySQLdb.connect
    cursor = db.cursor()
    sql = """update order2 
                set order_type= %s, order_status= %s, canteen= %s,s_dormitory_1= %s, 
                s_dormitory_2= %s, money= %s, requirement_customer= %s, requirement_delivery= %s, 
                order_delivery_time= %s, telephone_delivery= %s, 
                telephone_customer= %s
                where order_number= %s"""

    try:
        # 执行sql语句
        cursor.execute(sql, (order_type, order_status, canteen, s_dormitory_1,
                             s_dormitory_2, money, requirement_customer, requirement_delivery,
                             order_delivery_time, telephone_delivery, telephone_customer, order_number))
        db.commit()
    except:
        db.rollback()
        print ("error")

    db.close()
    res = {
        "error_code": 0,
        "data": {
            "result": "接单成功",
        }
    }
    return json.dumps(res, ensure_ascii=False)


# 发布订单
@app.route('/issue_order', methods=['GET', 'POST'])
def issue_order():
    json_data = request.get_json()
    # json_data = {
    #     "error_code": 0,
    #     "data": {
    #         "order_number": "1",
    #         "order_type": "0",
    #         "order_status": "0",
    #         "canteen": "紫荆园二楼",
    #         "s_dormitory_1": "32",
    #         "s_dormitory_2": "316",
    #         "money": "1.0",
    #         "requirement_customer": "水煮肉片，不加香菜",
    #         "requirement_delivery": "走路，可能会有点慢",
    #         "order_delivery_time": "null",
    #         "scheduled_delivery_countdown": 20,
    #         "result_countdown": 10,
    #         "telephone_delivery": "13205030028",
    #         "telephone_customer": "13859040643"
    #     }
    # }

    canteen = json_data["data"]["canteen"]
    money = json_data["data"]["money"]
    order_delivery_time = json_data["data"]["order_delivery_time"]
    order_number = json_data["data"]["order_number"]
    order_status = json_data["data"]["order_status"]
    order_type = json_data["data"]["order_type"]
    requirement_customer = json_data["data"]["requirement_customer"]
    requirement_delivery = json_data["data"]["requirement_delivery"]
    result_time = (
            datetime.datetime.now() + datetime.timedelta(minutes=json_data["data"]["result_countdown"])).strftime(
        "%H:%M")  # 自动取消时间
    scheduled_delivery_time = (datetime.datetime.now() + datetime.timedelta(
        minutes=json_data["data"]["scheduled_delivery_countdown"])).strftime(
        "%H:%M")  # 预计送达时间
    s_dormitory_1 = json_data["data"]["s_dormitory_1"]
    s_dormitory_2 = json_data["data"]["s_dormitory_2"]
    telephone_delivery = json_data["data"]["telephone_delivery"]
    telephone_customer = json_data["data"]["telephone_customer"]
    print (scheduled_delivery_time)
    print (result_time)
    db = MySQLdb.connect
    cursor = db.cursor()
    sql = """INSERT INTO order2 (order_number, order_type, order_status, canteen,s_dormitory_1, 
            s_dormitory_2, money, requirement_customer, requirement_delivery, 
            order_delivery_time, scheduled_delivery_time, result_time, telephone_delivery, 
            telephone_customer)
          values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""

    try:
        # 执行sql语句
        cursor.execute(sql, (order_number, order_type, order_status, canteen, s_dormitory_1,
                             s_dormitory_2, money, requirement_customer, requirement_delivery,
                             order_delivery_time, scheduled_delivery_time,
                             result_time, telephone_delivery, telephone_customer))
        # 提交到数据库执行
        db.commit()
    except:
        # Rollback in case there is any error
        db.rollback()
        print ("error")

    # 关闭数据库连接
    db.close()
    res = {
        "error_code": 0,
        "data": {
            "result": "1",
        }
    }
    return json.dumps(res, ensure_ascii=False)


# 取消订单
@app.route('/delete_order', methods=['GET', 'POST'])
def delete_order():
    json_data = request.get_json()
    # json_data = {
    #         "error_code": 0,
    #         "data": {
    #             "order_number": "1002327",
    #         }
    # }
    print(json_data['data']['order_number'])
    #    json_data = json.loads(json_data)
    db = MySQLdb.connect
    cursor = db.cursor()
    #sql = "SELECT * FROM `order` \
    #   WHERE order_number = %s " % (json_data['data']['order_number'])

    sql = """UPDATE order2 SET order_status = '3' WHERE order_number = %s"""
    try:
        # 执行SQL语句
        cursor.execute(sql % json_data['data']['order_number'])
        # 执行SQL语句
        db.commit()
        res = {
                  "error_code": 0,
                  "data": {
                      "result": "1",
                  }
                }
        json_res = json.dumps(res, ensure_ascii=False)
        print(json_res)

    except:
        print "Error: unable to fecth data"

    # 关闭数据库连接
    db.close()
    return json_res


# 确认送达
@app.route('/confirm_order', methods=['GET', 'POST'])
def confirm_order():
    json_data = request.get_json()
    # json_data = {
    #     "error_code": 0,
    #     "data": {
    #         "order_number": "1",
    #     }
    # }
    res = {
        "error_code": 0,
        "data": {
            "result": "1",
        }
    }
    print(json_data['data']['order_number'])
    #    json_data = json.loads(json_data)
    db = MySQLdb.connect
    cursor = db.cursor()
    # sql = "SELECT * FROM `order` \
    #   WHERE order_number = %s " % (json_data['data']['order_number'])
    sql = """UPDATE order2 SET order_status = '2' WHERE order_number = %s"""
    try:
        # 执行SQL语句
        cursor.execute(sql % json_data['data']['order_number'])
        # 执行SQL语句
        db.commit()
    except:
        print "Error: unable to fecth data"

    # 关闭数据库连接
    db.close()
    return json.dumps(res, ensure_ascii=False)


# 查看历史点单
@app.route('/show_historical_customer_orders', methods=['GET', 'POST'])
def show_historical_customer_orders():
    json_data = request.get_json()
    # json_data = {
    #     "error_code": 0,
    #     "data": {
    #         "telephone": "13223332333",
    #     }
    # }
    res = {
        "error_code": 0,
        "data": []
    }
    telephone = json_data["data"]["telephone"]
    time_now = time.strftime('%H:%M', time.localtime(time.time()))
    db = MySQLdb.connect
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
    sql = """update order2
                set order_status='3'
                where telephone_customer= %s and result_time< %s """
    try:
        cursor.execute(sql, (telephone, time_now))
        db.commit()
    except:
        print("Error: unable to update data")

    sql = """select * 
            from order2 
            where telephone_customer= %s """
    try:
        cursor.execute(sql % telephone)
        results = cursor.fetchall()
        for row in results:
            res["data"].append(row)
    except:
        print("Error: unable to fecth data")

    db.close()
    return json.dumps(res, ensure_ascii=False)


# 查看历史配送单
@app.route('/show_historical_business_orders', methods=['GET', 'POST'])
def show_historical_business_orders():
    json_data = request.get_json()
    # json_data = {
    #     "error_code": 0,
    #     "data": {
    #         "telephone": "13223332333",
    #     }
    # }
    res = {
        "error_code": 0,
        "data": []
    }
    telephone = json_data["data"]["telephone"]
    db = MySQLdb.connect
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
    sql = """select * 
                from order2 
                where telephone_delivery= %s """
    try:
        cursor.execute(sql % telephone)
        results = cursor.fetchall()
        for row in results:
            res["data"].append(row)
    except:
        print("Error: unable to fecth data")

    db.close()
    josn_res = json.dumps(res, ensure_ascii=False)
    return josn_res


# 显示订单详情
@app.route('/show_order_detail', methods=['GET', 'POST'])

def show_order_detail():
    json_data = request.get_json()
    # json_data = {
    #         "error_code": 0,
    #         "data": {
    #             "order_number": "1002327",
    #         }
    # }
    print(json_data['data']['order_number'])
    #    json_data = json.loads(json_data)
    db = MySQLdb.connect
    cursor = db.cursor()
    sql = "SELECT * FROM order2 WHERE order_number = %s "
    try:
        # 执行SQL语句
        cursor.execute(sql % (json_data['data']['order_number']))
        # 获取所有记录列表
        results = cursor.fetchall()
        order_number = results[0][0]
        order_type = results[0][1]
        order_status = results[0][2]
        canteen = results[0][3]
        s_dormitory_1 = results[0][4]
        s_dormitory_2 = results[0][5]
        money = results[0][6]
        requirement_customer = results[0][7]
        requirement_delivery = results[0][8]
        order_delivery_time = results[0][9]
        scheduled_delivery_time = results[0][10]
        result_time = results[0][11]
        telephone_delivery = results[0][12]
        telephone_customer = results[0][13]
        time_now = time.strftime('%H:%M', time.localtime(time.time()))
        if time_now > result_time :
            order_status = 3
        # print(wechat_number)
        #print("order_number={0},order_type={1}".format(wechat_number, wechat_name))
        res = {
            "error_code": 0,
            "data": {
                "order_number": order_number,
                "order_type": order_type,
                "order_status": order_status,
                "canteen": canteen,
                "s_dormitory_1": s_dormitory_1,
                "s_dormitory_2": s_dormitory_2,
                "money": money,
                "requirement_customer": requirement_customer,
                "requirement_delivery": requirement_delivery,
                "order_delivery_time": order_delivery_time,
                "scheduled_delivery_time": scheduled_delivery_time,
                "result_time": result_time,
                "telephone_delivery": telephone_delivery,
                "telephone_customer": telephone_customer,
            }
        }
        json_res = json.dumps(res, ensure_ascii=False)
        print(json_res)
    except:
        print "Error: unable to fecth data"
    # 关闭数据库连接
    db.close()
    return json_res

# 刷新点单广场
@app.route('/refresh_customer', methods=['GET', 'POST'])
def refresh_customer():
    time_now = time.strftime('%H:%M', time.localtime(time.time()))
    types = '3'
    # json_data = {
    #     "error_code": 0,
    #     "data": {
    #         "order_type": "0",
    #     }
    # }
    res = {
        "error_code": 0,
        "data": []
    }
    ordertype = '0'

    db = MySQLdb.connect
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
    sql = """update order2 
                    set order_status=%s 
                    where result_time < %s"""
    try:
        cursor.execute(sql, (types, time_now))
        db.commit()
    except:
        print("Error: unable to fecth data1")

    db.close()

    db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
    sql = """select * 
                from order2 
                where result_time > %s and order_type = %s"""
    try:
        cursor.execute(sql, (time_now, ordertype))
        results = cursor.fetchall()
        for row in results:
            res["data"].append(row)
    except:
        print("Error: unable to fecth data2")

    db.close()
    lens = len(res["data"])
    for i in range(lens):
        tele = res["data"][i]["telephone_delivery"]
        db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
        cursor = db.cursor(MySQLdb.cursors.DictCursor)
        sql = """select head_link 
                        from user 
                        where telephone=%s"""
        try:
            cursor.execute(sql % tele)
            results = cursor.fetchone()
            if results:
                results = results["head_link"]
            else:
                results = ""

            res["data"][i]["head_link"] = results
        except:
            print("Error: unable to fecth data3")

        db.close()
    print (res)
    return json.dumps(res, ensure_ascii=False)


# 刷新配送广场
@app.route('/refresh_business', methods=['GET', 'POST'])
def refresh_business():
    time_now = time.strftime('%H:%M', time.localtime(time.time()))
    types = '3'
    # json_data = {
    #     "error_code": 0,
    #     "data": {
    #         "order_type": "0",
    #     }
    # }
    res = {
        "error_code": 0,
        "data": []
    }
    ordertype = '1'

    db = MySQLdb.connect
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
    sql = """update order2 
                    set order_status=%s 
                    where result_time < %s"""
    try:
        cursor.execute(sql, (types, time_now))
        db.commit()
    except:
        print("Error: unable to fecth data1")

    db.close()

    db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
    sql = """select * 
                from order2 
                where result_time > %s and order_type = %s"""
    try:
        cursor.execute(sql, (time_now, ordertype))
        results = cursor.fetchall()
        for row in results:
            res["data"].append(row)
    except:
        print("Error: unable to fecth data2")

    db.close()
    lens = len(res["data"])
    for i in range(lens):
        tele = res["data"][i]["telephone_delivery"]
        db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
        cursor = db.cursor(MySQLdb.cursors.DictCursor)
        sql = """select head_link 
                        from user 
                        where telephone=%s"""
        try:
            cursor.execute(sql % tele)
            results = cursor.fetchone()
            if results:
                results = results["head_link"]
            else:
                results = ""

            res["data"][i]["head_link"] = results
        except:
            print("Error: unable to fecth data3")

        db.close()
    print (res)
    return json.dumps(res, ensure_ascii=False)


if __name__ == '__main__':
    app.config['JSON_AS_ASCII'] = False
    app.run(host='0.0.0.0', port=8080, ssl_context=(certfile, keyfile))
    # 外网访问，端口为8080，服务端需开启8080端口，并加上ssl证书
