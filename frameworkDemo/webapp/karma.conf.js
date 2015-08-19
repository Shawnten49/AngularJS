module.exports = function (config) {
    'use strict';
    config.set({
        basePath: '',
        files: [
            
			'lib/angular/angular.js',
			'lib/angular/angular-mocks.js',
			'lib/angular/angular-route.js',
			'lib/angular/angular-resource.min.js',
            'lib/angular/angular-animate.js',
            'app/app.js',

			'lib/jquery/jquery.min.js',	
			'lib/bootstrap/js/bootstrap.min.js',
			'lib/angular/ui-bootstrap-tpls-0.12.0.min.js',

			'lib/angular/module-multilanguage/angular-translate.min.js',
			'lib/angular/module-multilanguage/angular-translate-loader-static-files.min.js',
			'lib/angular/module-rich-text-editor/*.js',

			'lib/angular/module-file-upload/angular-file-upload-all.min.js',
			'lib/angular/module-file-upload/FileAPI.js',
			'lib/angular/module-tree-control/angular-tree-control.js',
			
			'lib/angular/module-ng-grid/ng-grid-2.0.14.min.js',			
			'lib/angular/module-validator/angular-validator.js',

			'app/services/http-auth-interceptor.js',
			'app/services/authentication.js',
            'app/services/session.js',
			'app/services/digital-motor-services.js',
			'app/services/utilities.js',
			
			'app/core/app.core.module.js',			
            'app/app.config.js',
            'app/app.config.routes.js',
          
			
		     /* Class file */
			'app/components/02-normal-quote/01-basic-information/01-basic-info-form.js',
            'unit_test/spec/app.js'
        ],
  		//reporters: ['progress','bracket','html','mocha','htmlReporter'],
		reporters: ['brackets','mocha'],
        frameworks: ['jasmine'],
		
        port: 9790,
        runnerPort: 9100,
        colors: true,
        autoWatch: false,
        
		browsers: ['PhantomJS','Chrome'],
        captureTimeout: 60000,
        singleRun: true,
		
		htmlReporter: {
		  outputFile: 'unit_test/result.html'
		},
		
		 plugins : [
			'karma-chrome-launcher',
//			'karma-firefox-launcher',
//			'karma-ie-launcher',
			'karma-jasmine',
			'karma-phantomjs-launcher',
			'karma-htmlfile-reporter',
			'karma-mocha-reporter',
			'karma-brackets'
		]
    });
};