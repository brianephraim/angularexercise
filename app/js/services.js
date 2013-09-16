'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
	.value('version', '0.1')
	.factory('Records', function($http) {
		var returnObj = function(){
			this.data = [
				{
					CompanyName:"Microsoft",
					ContactName:"Bill",
					Address:"Seattle",
					Email:"bill@msn.com",
					PhoneNumber:"333-1111",
					Website:"www.msn.com",
					id:1
				},
				{
					CompanyName:"Apple",
					ContactName:"Steve",
					Address:"California",
					Email:"steve@apple.com",
					PhoneNumber:"555-1212",
					Website:"www.apple.com",
					id:2
				},
				{
					CompanyName:"Apple",
					ContactName:"Tim",
					Address:"California",
					Email:"tim@apple.com",
					PhoneNumber:"555-2222",
					Website:"www.apple.com",
					id:3
				}
			];
			this.lastId=3;
			this.typeAheadData = null;

		};
		returnObj.prototype.typeAheadSearch = function(val){
			console.log('typeAheadSearch !!');
			var data = this.data;
			var typeAheadData = [];
			if(typeof val !== 'undefined' && val !== '' && val !== null){
				for(var i=0,l=data.length;i<l;i++){
					console.log(data[i].CompanyName)

					if(data[i].CompanyName.toLowerCase().indexOf(val.toLowerCase()) !== -1){
						typeAheadData.push(data[i])
					}
				}
			}
			this.typeAheadData = typeAheadData;
			return this.typeAheadData;
		}
		returnObj.prototype.createRecord = function(frontendSubmission){
			this.lastId ++;
			var defaults = {
				CompanyName:"",
				ContactName:"",
				Address:"",
				Email:"",
				PhoneNumber:"",
				Website:"",
				id:this.lastId
			}
			function extend(){
			    for(var i=1; i<arguments.length; i++)
			        for(var key in arguments[i])
			            if(arguments[i].hasOwnProperty(key))
			                arguments[0][key] = arguments[i][key];
			    return arguments[0];
			}
			var submission = extend(defaults,frontendSubmission);
			this.data.push(submission);
			return this.lastId;
		}

		return new returnObj;
	})
;

