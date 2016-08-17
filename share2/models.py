#-*- coding: UTF-8 -*- 

from django.db import models
  
class Group(models.Model):   #集团数据库
  name=models.CharField(max_length=50)#集团名称
  konggutype=models.CharField(max_length=50) #控股类型
  time=models.CharField(max_length=50) #成立时间
  registratetype=models.CharField(max_length=50)#注册类型
  safetype=models.CharField(max_length=50) #安全评估分类
  size=models.CharField(max_length=50)#企业规模
  gtype=models.CharField(max_length=50)#企业性质
  def __unicode__(self):
    return self.name
class Company(models.Model):
  groupname=models.ForeignKey(Group)#集团名称
  name=models.CharField(max_length=50) #煤矿企业数据库
  time=models.CharField(max_length=50) #成立时间
  longitude=models.CharField(max_length=50)#经度
  latitude=models.CharField(max_length=50)#纬度
  address=models.CharField(max_length=100)#地点
  approvepro=models.CharField(max_length=50)#核定生产能力
  actualpro=models.CharField(max_length=50)#实际生产能力
  gaslevel=models.CharField(max_length=50)#瓦斯等级
  certificate=models.CharField(max_length=50)#持证情况
  explorationmap=models.CharField(max_length=50)#勘探图件
  def __unicode__(self):
    return str(self.groupname)
# Create your models here.
class Accident(models.Model):#煤矿事故数据库
  name=models.ForeignKey(Company) #煤矿名称
  time=models.DateTimeField() #时间
  atype=models.CharField(max_length=50) #事故类型
  death=models.CharField(max_length=50) #死亡人数
  injury=models.CharField(max_length=50)#受伤人数
  loss=models.CharField(max_length=50) #经济损失
  location=models.CharField(max_length=50) #事故位置
  weather=models.CharField(max_length=50) #天气状况
  rain=models.CharField(max_length=50)#降水
  temperature=models.CharField(max_length=50)#温度
  windy=models.CharField(max_length=50)#风力
  humidity=models.CharField(max_length=50)#湿度
  # companyname=models.CharField(max_length=50)#
  def __unicode__(self):
    return str(self.name)

class UserOr(models.Model):#普通用户数据库表
  userid=models.CharField(max_length=50) 
  password=models.CharField(max_length=50)
  email=models.CharField(max_length=50)
  def __unicode__(self):
    return self.userid
class GroupUser(models.Model): #集团用户数据库表
  userid=models.CharField(max_length=50)
  password=models.CharField(max_length=50)
  groupname=models.ForeignKey(Group)
  def __unicode__(self):
    return self.userid
class Government(models.Model):#政府用户数据库
  userid=models.CharField(max_length=50)
  password=models.CharField(max_length=50)
  governname=models.CharField(max_length=50)
  def __unicode__(self):
    return self.userid
class Workers(models.Model):#煤矿工人基础数据库
  companyname=models.ForeignKey(Company) #煤矿名称
  name=models.CharField(max_length=50)
  sex=models.CharField(max_length=4)
  post=models.CharField(max_length=10) #职务
  education=models.CharField(max_length=10)#学历
  age=models.CharField(max_length=10)#年龄
  experience=models.CharField(max_length=10)#从业年龄
  major=models.CharField(max_length=10)#专业
  def __unicode__(self):
    return self.companyname
class Equipment(models.Model):#煤矿装备数据库
  companyname=models.ForeignKey(Company) #煤矿名称
  name=models.CharField(max_length=50)
  factory=models.CharField(max_length=50)#生产厂家
  time=models.CharField(max_length=50) #开始使用时间
  def __unicode__(self):
    return self.companyname
class WorkerTime(models.Model): #当班工人数据库
  companyname=models.ForeignKey(Company) #煤矿名称
  weekworktime=models.CharField(max_length=50)#一周工作时长
  bodycondition=models.CharField(max_length=50)#身体状况
  injurycondition=models.CharField(max_length=50)#事故伤害情况
  bodyinjury=models.CharField(max_length=50)#身体受伤部位
  def __unicode__(self):
    return self.companyname
class TimeIndex(models.Model): #煤矿井下实时参数数据库
  companyname=models.ForeignKey(Company) #煤矿名称
  gasdensity=models.CharField(max_length=50)#瓦斯浓度
  dustdensity=models.CharField(max_length=30)#粉尘浓度
  workersum=models.CharField(max_length=10)#井下人数
  illuminance=models.CharField(max_length=20)#照度
  noise=models.CharField(max_length=20)#噪音
  temperture=models.CharField(max_length=20)#温度
  wind=models.CharField(max_length=20)#风速
  def __unicode__(self):
    return self.companyname
class WholeCondition(models.Model):#煤矿数据总览
  year=models.CharField(max_length=4)
  accidentsum=models.CharField(max_length=10)#事故数量
  deaths=models.CharField(max_length=10)#死亡人数
  production=models.CharField(max_length=10) #产能
  drmt=models.CharField(max_length=10)#百万吨死亡率
  def __unicode__(self):
    return self.year
class Policy(models.Model):#政策制度数据库
  name=models.CharField(max_length=50) #政策名称
  time=models.DateField(max_length=50)#颁布时间
  department=models.CharField(max_length=50)#颁布部门
  context=models.CharField(max_length=200)#主要约束
  def __unicode__(self):
    return self.name