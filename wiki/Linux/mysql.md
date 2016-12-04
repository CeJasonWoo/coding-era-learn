# unbuntu安装
sudo apt-get install mysql-server  

# 端口监听失败
修改mysql的配置文件/etc/mysql/my.cnf，
将bind-address后面增加远程访问IP地址或者禁掉这句话就可以让远程机登陆访问了。
sudo vim etc/mysql/my.cnf

# 远程连接mysql权限
sql>
-- grant all PRIVILEGES on * to root@'%'  identified by 'vagrant';
grant all on *.* to 'root'@'%' identified by '123456' with grant option;

# 查看端口
netstat -apn|grep 3360

# 权限
参考:http://www.ttlsa.com/mysql/warning-world-writable-config-file-etcmy-cnf-is-ignored/
sudo chmod 777 etc/mysql/my.cnf
恢复
sudo chmod 644 etc/mysql/my.cnf


#表名大小写开关
lower_case_table_names=1 

#重启
sudo /etc/init.d/mysql restart
or
sudo service mysql restrart

#卸载
参考：http://www.cnblogs.com/steven_oyj/archive/2010/05/24/1742808.html