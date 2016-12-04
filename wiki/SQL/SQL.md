# 。。
(select GROUP_CONCAT(inn.chainname) name from pur_branchinn inn where LOCATE(CONCAT(',',inn.id,','), CONCAT(',',ccUser.my_branchinns,',') )>0) myBranckinnNames

# 字符分隔
select id,group_concat(name separator ';') from aa group by id;

# 索引优化：utf8_general_ci
ALTER TABLE `cmp_approve_by_other` CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;