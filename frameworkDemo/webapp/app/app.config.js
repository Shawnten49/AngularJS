(function () {
	'use strict';

	var app = angular.module('app');

	// define the application configure
	app.value('config', {
		docTitle: 'China Motor: ',
		remoteServiceName: '/',
		version: '0.0.0'
	});

	// define the user roles
	app.constant('USER_ROLES', {
		'all': '*',
		'admin': 'ROLE_ADMIN',
		'user': 'ROLE_USER'
	});

	/*
	Languages codes are ISO_639-1 codes, see http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
	They are written in English to avoid character encoding issues (not a perfect solution)
	*/
	app.constant('LANGUAGES', {
		'en': 'English'
	});

	app.config(function ($translateProvider) {
        //$translateProvider.preferredLanguage('en-US');
		$translateProvider.preferredLanguage('zh-CN');
		$translateProvider.useStaticFilesLoader({
			prefix: 'i18n/',
			suffix: '.json'
		});
	});

})();