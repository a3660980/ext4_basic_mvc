Ext.application({
	name: 'Login',
	appFolder: 'public',

	views: [
		'MainView',
		'LoginForm'
	],

	launch: function() {
		Ext.create('Login.view.MainView');
	}
});