module.exports = (grunt)->
	grunt.initConfig
		pkg: grunt.file.readJSON "package.json"		
		# compiled shurikend CSS
		# The file containing the CSS is located at: dev/shurikend/sass/app/app.scss
		compass:
			dist:
				options:
					config: 'dev/shurikend/config.rb',  # css_dir = 'dev/css'
					cssDir: 'dev/public/css/'	
	    # compiled coffee 2 js for shurikend
		coffee:
			compile:
				files:
					'compiled/app.js':'dev/app.coffee'
					'compiled/models/user.js':'dev/models/user.coffee'
					'compiled/controllers/culttume.js':'dev/controllers/culttume.coffee'
					'compiled/lib/sendmail.js':'dev/lib/sendmail.coffee'
					'dev/public/javascripts/culttume.js':'dev/public/coffee/culttume.coffee'
					# integrated shurikend
					'dev/public/javascripts/shurikend.js':[
						'dev/shurikend/coffee/jquery-cookie.coffee',
						'dev/shurikend/coffee/jquery-event-move.coffee',
						'dev/shurikend/coffee/jquery-event-swipe.coffee',
						'dev/shurikend/coffee/jquery-offcanvas.coffee',
						'dev/shurikend/coffee/media-query-toggle.coffee',
						'dev/shurikend/coffee/jquery-placeholder.coffee',
						'dev/shurikend/coffee/alerts.coffee',
						#'coffee/accordion.coffee', 
						'dev/shurikend/coffee/buttons.coffee',
						'dev/shurikend/coffee/tooltips.coffee',
						'dev/shurikend/coffee/forms.coffee',
						#'coffee/tabs.coffee',
						'dev/shurikend/coffee/cursorup.coffee',
						'dev/shurikend/coffee/modal.coffee',
						#'coffee/topbar.coffee',
						'dev/shurikend/coffee/nextstep.coffee',
						#'coffee/magellan.coffee',
						'dev/shurikend/coffee/navigation.coffee',
						#'coffee/slide.coffee',
						'dev/shurikend/coffee/app.coffee']

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
															   'dev/public/javascripts/jquery.imagesload.js',
															   'dev/public/javascripts/jquery.wookmark.js',
															   'dev/public/javascripts/jquery.validate.js',
															   # Add localization file for spanish http://bit.ly/1d8PfiJ
															   'dev/public/javascripts/localization/messages_es.js',
															   'dev/public/javascripts/verimail.jquery.js',
															   'dev/public/javascripts/socket.io.js',
															   'dev/public/javascripts/jquery.stepy.js',
															   'dev/public/javascripts/progressbar.js',
															   'dev/public/javascripts/jquery.hoverdir.js',
															   'dev/public/javascripts/culttume.js']
		# obfuscate CSS													   	
		cssmin:
			my_target:
				src: 'dev/public/css/app.css'
				dest: 'compiled/public/css/shurikend.css'

	# Load modules for gruntjs
	grunt.loadNpmTasks 'grunt-contrib-compass'
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-jade'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-css'
	# Load all Task
	grunt.registerTask 'default', ['compass', 'coffee', 'jade', 'uglify', 'cssmin']