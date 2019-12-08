#!/usr/bin/env python 
# -*- coding:utf-8 -*-

import json
import MySQLdb
import time
import datetime


def issue_order():
    json_data = {
        "error_code": 0,
        "data": {
            "order_number": "1",
            "order_type": "0",
            "order_status": "0",
            "canteen": "紫荆园二楼",
            "s_dormitory_1": "32",
            "s_dormitory_2": "316",
            "money": "1.0",
            "requirement_customer": "水煮肉片，不加香菜",
            "requirement_delivery": "走路，可能会有点慢",
            "order_delivery_time": "null",
            "scheduled_delivery_countdown": 20,
            "result_countdown": 10,
            "telephone_delivery": "13205030028",
            "telephone_customer": "13859040643"
        }
    }

    canteen = json_data["data"]["canteen"]
    money = json_data["data"]["money"]
    order_delivery_time = json_data["data"]["order_delivery_time"]
    order_number = str(int(time.time() * 10))
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
    db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
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


# 确认接单
def get_order():
    json_data = {
        "error_code": 0,
        "data": {
            "order_number": "1",
            "order_type": "0",
            "order_status": "0",
            "canteen": "紫荆园二楼",
            "s_dormitory_1": "32",
            "s_dormitory_2": "316",
            "money": "2.0",
            "requirement_customer": "水煮肉片，不加香菜",
            "requirement_delivery": "走路，可能会有点慢",
            # "order_delivery_time": "null", 删掉
            "telephone_delivery": "13205030028",
            "telephone_customer": "13859040643"
        }
    }

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

    db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
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


# 查询历史配送单
def show_historical_business_orders():
    json_data = {
        "error_code": 0,
        "data": {
            "telephone": "13205030028"
        }
    }
    res = {
        "error_code": 0,
        "data": []
    }
    telephone = json_data["data"]["telephone"]
    time_now = time.strftime('%H:%M', time.localtime(time.time()))
    db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
    sql = """update order2
            set order_status='3'
            where telephone_delivery= %s and result_time< %s """
    try:
        cursor.execute(sql, (telephone, time_now))
        db.commit()
    except:
        print("Error: unable to update data")

    sql = """select * 
            from order2 
            where telephone_delivery= %s
            order by order_number desc"""
    try:
        cursor.execute(sql % telephone)
        results = cursor.fetchall()
        for row in results:
            res["data"].append(row)
    except:
        print("Error: unable to fecth data")

    db.close()
    return json.dumps(res, ensure_ascii=False)


# 查询历史点单
def show_historical_customer_orders():
    json_data = {
        "error_code": 0,
        "data": {
            "telephone": "13205030028"
        }
    }
    res = {
        "error_code": 0,
        "data": []
    }
    telephone = json_data["data"]["telephone"]
    time_now = time.strftime('%H:%M', time.localtime(time.time()))
    db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
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
            where telephone_customer= %s 
            order by order_number desc"""
    try:
        cursor.execute(sql % telephone)
        results = cursor.fetchall()
        for row in results:
            res["data"].append(row)
    except:
        print("Error: unable to fecth data")

    db.close()
    return json.dumps(res, ensure_ascii=False)


# 筛选点单广场
def sift_customer_order():
    json_data = {
        "error_code": 0,
        "data": {
            "s_dormitory_1": "32",
            "canteen": "紫荆园一楼",
        }
    }
    res = {
        "error_code": 0,
        "data": []
    }
    time_now = time.strftime('%H:%M', time.localtime(time.time()))
    s_dormitory_1 = json_data["data"]["s_dormitory_1"]
    canteen = json_data["data"]["canteen"]
    db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
    cursor = db.cursor(MySQLdb.cursors.DictCursor)

    sql = """update order2
                set order_status='3'
                where result_time< '%s' """
    try:
        cursor.execute(sql % time_now)
        db.commit()
    except:
        print("update error")

    sql = """select * 
                from order2 
                where canteen= %s and  s_dormitory_1= %s and order_type='1' and order_status='0'
                order by order_number desc"""
    try:
        cursor.execute(sql, (canteen, s_dormitory_1))
        results = cursor.fetchall()
        for row in results:
            res["data"].append(row)
    except:
        print("Error: unable to fecth data")

    db.close()
    return json.dumps(res, ensure_ascii=False)


# 筛选配送广场
def sift_delivery_order():
    json_data = {
        "error_code": 0,
        "data": {
            "s_dormitory_1": "32",
            "canteen": "紫荆园一楼",
        }
    }
    res = {
        "error_code": 0,
        "data": []
    }
    time_now = time.strftime('%H:%M', time.localtime(time.time()))
    s_dormitory_1 = json_data["data"]["s_dormitory_1"]
    canteen = json_data["data"]["canteen"]
    db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
    cursor = db.cursor(MySQLdb.cursors.DictCursor)

    sql = """update order2
                set order_status='3'
                where result_time< '%s' """
    try:
        cursor.execute(sql % time_now)
        db.commit()
    except:
        print("update error")

    sql = """select * 
                from order2 
                where canteen= %s and  s_dormitory_1= %s and order_type='0' and order_status='0'
                order by order_number desc"""
    try:
        cursor.execute(sql, (canteen, s_dormitory_1))
        results = cursor.fetchall()
        for row in results:
            res["data"].append(row)
    except:
        print("Error: unable to fecth data")

    db.close()
    return json.dumps(res, ensure_ascii=False)
sift_delivery_order()