module.exports = (grunt)->
	grunt.initConfig
		pkg: grunt.file.readJSON "package.json"		
		# compiled 
		coffee:
			compile:
				files:
					'compiled/app.js':'dev/app.coffee'
					'compiled/models/user.js':'dev/models/user.coffee'
					'compiled/controllers/culttume.js':'dev/controllers/culttume.coffee'
					'dev/public/javascripts/culttume.js':'dev/public/coffee/culttume.coffee'
					'compiled/lib/sendmail.js':'dev/lib/sendmail.coffee' 

		# compiled jade templates files
		jade:
			debug:
				options:
					data:
						debug: true
				files:
					'compiled/views/index.jade':'dev/views/index.jade'
			#release:
			#	options:
			#		data:
			#			debug: false
			#	files:
			#		'compiled/views/release.jade':'dev/views/index.jade'

		uglify:
			my_target:
				files:
					'compiled/public/javascripts/culttume.js':['dev/public/javascripts/modernizr.js',
															   'dev/public/javascripts/shurikend.js',
															   'dev/public/javascripts/verimail.jquery.js',
															   'dev/public/javascripts/socket.io.js',
															   'dev/public/javascripts/jquery.stepy.js',
															   'dev/public/javascripts/culttume.js']

		cssmin:
			my_target:
				src: 'dev/public/css/shurikend.css'
				dest: 'compiled/public/css/shurikend.css'

	# Load modules for gruntjs
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-jade'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-css'
	# Load all Task
	grunt.registerTask 'default', ['coffee', 'jade', 'uglify', 'cssmin']