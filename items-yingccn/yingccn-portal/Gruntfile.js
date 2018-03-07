module.exports=function(grunt){
	//任务配置，所有插件的配置信息
	grunt.initConfig({
		
		//获取package.json的信息
		pkg:grunt.file.readJSON('package.json'),
		
		
		//检查javascript语法错误--jshint配置
		jshint:{
			build:['Gruntfile.js','public/js/*.js'],
			options:{
				jshintrc:'.jshintrc'
			}
		},
		
		//检测css语法错误--csslint
//		csslint:{
//			options:{
//				csslintrc:'.csslintrc'
//			},
//			build:['src/css/*.css']
//		},
		
       
        //concat插件的配置信息
        concat: {
            options:{
                stripBanners:true, //合并时允许输出头部信息
                banner:'/*!<%= pkg.name %> - <%= pkg.version %>-'+'<%=grunt.template.today("yyyy-mm-dd") %> */'
            },
            cssConcat:{
                src:['public/css/*.css'],
                dest:'public/css/concat/<%= pkg.name %> - <%= pkg.version %>.css' //dest 是目的地输出
            },
            jsConcat:{
                src:'public/js/*.js',
                dest:'public/js/concat/<%=pkg.name %> - <%= pkg.version %>.js'
            }
        },
        
        //uglify--js压缩的配置信息
		uglify:{
			options:{
				stripBanners:false,
				banner:'/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd")%> */ \n'
			},
			// build:{
			// 	src:'public/js/concat/<%=pkg.name %> - <%= pkg.version %>.js',
			// 	dest:'dist/js/<%=pkg.name%>-<%=pkg.version%>.min.js'
			// }
			build:{
				src:'public/js/concat/anijs.js',
				dest:'dist/js/anijs.min.js'
			}
		},
		
		//css压缩
		cssmin:{
            options:{
                stripBanners:false, //合并时允许输出头部信息
                banner:'/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd")%> */ \n'
            },
            // build:{
            //     src:'public/css/concat/<%= pkg.name %> - <%= pkg.version %>.css',//压缩是要压缩合并了的
            //     dest:'dist/css/<%= pkg.name %>-<%= pkg.version %>.min.css' //dest 是目的地输出
			// }
			build:{
                src:'public/css/anicollection.css',//压缩是要压缩合并了的
                dest:'dist/css/anicollection.min.css' //dest 是目的地输出
            }
      	},
       
       	//watch--自动化检测
       	watch:{
       		options:{
       			spawn:false
       		},
       		files:['Gruntfile.js','src/css/*.css','src/js/*.js'],
       		tasks:['jshint','concat','uglify','cssmin']
       	}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
//	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	//当在终端输入grunt时需要做什么
	// grunt.registerTask('default',['jshint','concat','uglify','cssmin','watch']);
	grunt.registerTask('default',['cssmin','uglify']);
	
};