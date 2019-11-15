#!/usr/bin/env python
# -*- coding:utf-8 -*-

import json
import MySQLdb

#查看订单详情

def show_order_detail():
    json_data = {
            "error_code": 0,
            "data": {
                "order_number": "123456",
            }
    }
    print(json_data['data']['order_number'])
    #    json_data = json.loads(json_data)
    db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
    cursor = db.cursor()
    sql = "SELECT * FROM `order` \
       WHERE order_number = %s " % (json_data['data']['order_number'])
    try:
        # 执行SQL语句
        cursor.execute(sql)
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
        delivery_time = results[0][11]
        result_time = results[0][12]
        telephone_delivery = results[0][13]
        telephone_customer = results[0][14]
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
                "delivery_time": delivery_time,
                "result_time": result_time,
                "telephone_delivery": telephone_delivery,
                "telephone_customer": telephone_customer,
            }
        }
        json_res = json.dumps(res, ensure_ascii=False)
        print(json_res)
        db.close()
        return json_res
    except:
        print "Error: unable to fecth data"

    # 关闭数据库连接
    db.close()

def cancel_order():
    json_data = {
            "error_code": 0,
            "data": {
                "order_number": "123456",
            }
    }
    print(json_data['data']['order_number'])
    #    json_data = json.loads(json_data)
    db = MySQLdb.connect("47.101.217.136", "phd", "11111111", "software", charset='utf8')
    cursor = db.cursor()
    #sql = "SELECT * FROM `order` \
    #   WHERE order_number = %s " % (json_data['data']['order_number'])

    sql = """UPDATE `order` SET `order_status` = '2' WHERE `order`.`order_number` = '123456'"""
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()

        res = {
                  "error_code": 0,
                  "data": {
                      "result": "1",
                  }
                }
        json_res = json.dumps(res, ensure_ascii=False)
        print(json_res)
        db.close()
        return json_res
    except:
        print "Error: unable to fecth data"

    # 关闭数据库连接
    db.close()



cancel_order()
show_order_detail()