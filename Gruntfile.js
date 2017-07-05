copy: {
		//写法一
		dist_html: {
			//源文件
			src: '<%=config.app%>/index.html',
			//目标文件
			dest: '<%=config.dist%>/index.html'
		},
		dist_js: {
			//源文件
			src: '<%=config.app%>/js/index.js',
			//目标文件
			dest: '<%=config.dist%>/js/index.js'
		}
		//写法二
		dist: {
			files: [{
				//源文件
				src: '<%=config.app%>/index.html',
				//目标文件
				dest: '<%=config.dist%>/index.html'
			}, {
				//源文件
				src: '<%=config.app%>/js/index.js',
				//目标文件
				dest: '<%=config.dist%>/js/index.js'
			}]
		}
		//写法三
		dist: {
			files: {
				//目标文件在前，源文件在后面
				'<%=config.dist%>/index.html': '<%=config.app%>/index.html',
				'<%=config.dist%>/js/index.js': ['<%=config.app%>/js/index.js']
			}
		}
		//写法四
		dist: {
			files: [{
				expand: true,
				//源路径
				cwd: '<%= config.app%>/',
				//寻找文件后缀
				src: '**/*.js',
				//目标路径
				dest: '<%= config.dist%>/',
				//替换后缀名
				ext: '.js',
				//逗号分隔后缀
				extDot: 'last',
				//不生成目录true，生成目录false
				flatten: true,
				//重命名
				rename: function(dest, src) {
					return dest + 'js/' + src;
				}
			}]
		}
	},
	clean: {
		//写法一
		dist: {
			src: ['<%= config.dist %>/index.html',
				'<%=config.dist%>/js/index.js'
			]
		}
		//写法二 删除目录文件
		dist: {
			src: ['<%=config.dist%>/**/*']
				//* 匹配任意字符除了/
				//? 匹配一个字符除了/
				//**匹配任意数量任意字符
				//{a,b}.js匹配a.js和b.js
				//!取反匹配
		}
		//写法三 删除文件
		dist: {
			src: ['<%=config.dist%>/**/*'],
			filter: 'isFile'
		}
		//写法四 删除文件
		dist: {
			src: ['<%=config.dist%>/**/*'],
			filter: function(filepath) {
				return (!grunt.file.isDir(filepath));
			},
			//nonull调试
			//dot:true 包含.XXX的文件
			//matchBase a?b
			//expand:true src动态文件映射
		}
	}