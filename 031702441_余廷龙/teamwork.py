#!/usr/bin/env python 
# -*- coding:utf-8 -*-

import json
import MySQLdb


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
            "money": 1.0,
            "requirement_order": "水煮肉片，不加香菜",
            "requirement_delivery": "走路，可能会有点慢",
            "pair_time": "null",
            "scheduled_delivery_time": "12:00",
            "delivery_time": "null",
            "result_time": "12:10",
            "wechat_number_customer": "15143255",
            "wechat_number_delivery": "521512145",
        }
    }
    db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
    cursor = db.cursor()
    sql = """insert into order(order_number,order_type,order_status,canteen,s_dormitory_1,
          s_dormitory_2,money,requirement_order,requirement_delivery,pair_time,
          scheduled_delivery_time,delivery_time,result_time,wechat_number_customer,
          wechat_number_delivery)
          values(%s,%s,%s,%s,%s,%s,%f,%s,%s,%s,%s,%s,%s,%s,%s)"""
    try:
        cursor.execute(
            sql % (
                json_data["data"]["order_number"], json_data["data"]["order_type"], json_data["data"]["order_status"],
                json_data["data"]["canteen"], json_data["data"]["s_dormitory_1"], json_data["data"]["s_dormitory_2"],
                json_data["data"]["money"], json_data["data"]["requirement_order"],
                json_data["data"]["requirement_delivery"],
                json_data["data"]["pair_time"], json_data["data"]["scheduled_delivery_time"],
                json_data["data"]["delivery_time"],
                json_data["data"]["result_time"], json_data["data"]["wechat_number_customer"],
                json_data["data"]["wechat_number_delivery"]))
        db.commit()
    except:
        db.rollback()

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
            "s_dormitory_2": "316",
            "requirement_order": "水煮肉片，不加香菜",
            "requirement_delivery": "走路，可能会有点慢",
            "scheduled_delivery_time": "12:00",
            "delivery_time": "null",
            "wechat_number_customer": "15143255",
            "wechat_number_delivery": "521512145",
        }
    }
    db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
    cursor = db.cursor()
    sql = """insert into order(order_number,s_dormitory_2,requirement_order,requirement_delivery,
                            scheduled_delivery_time,delivery_time,wechat_number_customer,wechat_number_delivery)
                            values(%s,%s,%s,%s,%s,%s,%s,%s)"""
    try:
        cursor.execute(
            sql % (
                json_data["data"]["order_number"], json_data["data"]["s_dormitory_2"],
                json_data["data"]["requirement_order"],
                json_data["data"]["requirement_delivery"], json_data["data"]["scheduled_delivery_time"],
                json_data["data"]["delivery_time"],
                json_data["data"]["wechat_number_customer"],
                json_data["data"]["wechat_number_delivery"]))
        db.commit()
    except:
        db.rollback()

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
            "wechat_number": "11152514",
        }
    }
    res = {
        "error_code": 0,
        "data": []
    }
    db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
    sql = """select * 
            from order 
            where wechat_number_delivery= %s"""
    try:
        cursor.execute(sql) % (json_data["data"]["wechat_number"])
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
            "wechat_number": "11152514",
        }
    }
    res = {
        "error_code": 0,
        "data": []
    }
    db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
    sql = """select * 
                from order 
                where wechat_number_customer= %s"""
    try:
        cursor.execute(sql) % (json_data["data"]["wechat_number"])
        results = cursor.fetchall()
        for row in results:
            res["data"].append(row)
    except:
        print("Error: unable to fecth data")

    db.close()
    return json.dumps(res, ensure_ascii=False)
    pass
