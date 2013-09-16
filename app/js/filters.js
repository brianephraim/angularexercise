'use strict';

/* Filters */

angular.module('myApp.filters', [])
	.filter('AsKeyArray', ['version', function(version) {
		return function(array) {
			var obj = array[0];
			var arrayOfKeys = [];
			for (var key in obj) {
			    if (obj.hasOwnProperty(key) && key!=='$$hashKey') {
			        arrayOfKeys.push(key)
			    }
			}
			return arrayOfKeys.sort();
		}
	}])
;