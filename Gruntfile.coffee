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


	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-jade'
	grunt.registerTask 'default', ['coffee', 'jade']