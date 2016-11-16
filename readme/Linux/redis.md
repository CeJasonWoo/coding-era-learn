# ubuntu install
apt-get install redis-server

# 修改监听地址
sudo chmod 644 redis.conf

# 启动
redis-server /../redis.conf

# 查看redis端口，可以看到redis安装目录？
ps -ef|grep redis