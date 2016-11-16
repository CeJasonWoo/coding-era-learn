关于linux下的复制命令cp，文件覆盖时不提示overwrite的方法

使用

/bin/cp -fr source dest 就不提示

\cp -R -f source target 

cp命令默认是不会提示overwrite?的，但是cp的-i选项会提示，而一般Linux的起动文件~/.bashrc中会把cp命名成 

alias cp='cp -i' 

这样在Linux下输入cp命令实际上运行的是cp -i，加上一个"\"符号就是让此次的cp命令不使用别名(cp -i)运行。 

就不会有overwrite?的提示了，至于保留链接，cp命令没有这样的功能，你可以写一个简单的脚本，cp之前判断一下就可以了。