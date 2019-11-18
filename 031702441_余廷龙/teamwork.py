#!/usr/bin/env python 
# -*- coding:utf-8 -*-

import json
import MySQLdb


def issue_order():
    json_data = {
        "error_code": 0,
        "data": {
            "canteen": "sss",
            "delivery_time": "null",
            "money": 1.0,
            "order_delivery_time": "null",
            "order_number": "10023278",
            "order_status": "0",
            "order_type": "0",
            "requirement_customer": "ada",
            "requirement_delivery": "fasd",
            "result_time": "12:10",
            "scheduled_delivery_time": "12:00",
            "s_dormitory_1": "32",
            "s_dormitory_2": "316",
            "telephone_delivery": "13223332333",
            "telephone_customer": "13223332333"
        }
    }

    canteen = json_data["data"]["canteen"]
    delivery_time = json_data["data"]["delivery_time"]
    money = json_data["data"]["money"]
    order_delivery_time = json_data["data"]["order_delivery_time"]
    order_number = json_data["data"]["order_number"]
    order_status = json_data["data"]["order_status"]
    order_type = json_data["data"]["order_type"]
    requirement_customer = json_data["data"]["requirement_customer"]
    requirement_delivery = json_data["data"]["requirement_delivery"]
    result_time = json_data["data"]["result_time"]
    scheduled_delivery_time = json_data["data"]["scheduled_delivery_time"]
    s_dormitory_1 = json_data["data"]["s_dormitory_1"]
    s_dormitory_2 = json_data["data"]["s_dormitory_2"]
    telephone_delivery = json_data["data"]["telephone_delivery"]
    telephone_customer = json_data["data"]["telephone_customer"]

    db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
    cursor = db.cursor()
    sql = """INSERT INTO order2 (order_number, order_type, order_status, canteen,s_dormitory_1, 
            s_dormitory_2, money, requirement_customer, requirement_delivery, 
            order_delivery_time, scheduled_delivery_time, delivery_time, result_time, telephone_delivery, 
            telephone_customer)
          values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""

    try:
        # 执行sql语句
        cursor.execute(sql, (order_number, order_type, order_status, canteen, s_dormitory_1,
                             s_dormitory_2, money, requirement_customer, requirement_delivery,
                             order_delivery_time, scheduled_delivery_time, delivery_time,
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
            "order_number": "13124329",
            "s_dormitory_2": "316",
            "requirement_customer": "dfs",
            "requirement_delivery": "asd",
            "scheduled_delivery_time": "12:00",
            "delivery_time": "1234",
        }
    }
    order_number = json_data["data"]["order_number"]
    s_dormitory_2 = json_data["data"]["s_dormitory_2"]
    requirement_customer = json_data["data"]["requirement_customer"]
    requirement_delivery = json_data["data"]["requirement_delivery"]
    scheduled_delivery_time = json_data["data"]["scheduled_delivery_time"]
    delivery_time = json_data["data"]["delivery_time"]

    db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
    cursor = db.cursor()
    sql = """INSERT INTO order2 (order_number, s_dormitory_2, requirement_customer, requirement_delivery,
                            scheduled_delivery_time, delivery_time)
                        values(%s,%s,%s,%s,%s,%s)"""
    try:
        cursor.execute(sql, (order_number, s_dormitory_2, requirement_customer, requirement_delivery,
        scheduled_delivery_time, delivery_time))
        db.commit()
    except:
        db.rollback()
        print "error"

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
            "telephone": "13223332333",
        }
    }
    res = {
        "error_code": 0,
        "data": []
    }
    telephone = json_data["data"]["telephone"]
    db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
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
    print (res)
    return json.dumps(res, ensure_ascii=False)


# 查询历史点单
def show_historical_customer_orders():
    json_data = {
        "error_code": 0,
        "data": {
            "telephone": "13223332333",
        }
    }
    res = {
        "error_code": 0,
        "data": []
    }
    telephone = json_data["data"]["telephone"]
    db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
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
    print (res)
    return json.dumps(res, ensure_ascii=False)
