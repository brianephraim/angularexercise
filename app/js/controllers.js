'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('searchSectionCtrl', ['$scope','Records',function($scope,Records) {
  	
  	$scope.Records = Records;
  	$scope.formItems = {};
  	$scope.setFormItems = function(val){
  		$scope.formItems = val;
  	};
  	$scope.invalidArray = [];
  	$scope.addToInvalid = function(val){
  		var alreadyInArray = false;
  		for(var i=0,l=$scope.invalidArray.length; i<l; i++){
  			if($scope.invalidArray[i] === val){
  				alreadyInArray = true;
  			}
  		}
  		if(!alreadyInArray){
  			$scope.invalidArray.push(val)
  		}
  	}
  	$scope.removeFromInvalid = function(val){
  		var invalidArray = $scope.invalidArray;
  		var i = invalidArray.length;
		while (i--){
		    if (val === invalidArray[i]){
		        invalidArray.splice(i, 1);
		    }
		}
  	}
  	$scope.hasSomeValidationError = true;
  }])
.controller('typeAheadCtrl', ['$scope','Records',function($scope,Records) {
  	$scope.typingInput = '';
  	$scope.typeAheadResults = [];
  	$scope.$watch('typeingInput',function(newVal){
  		if(typeof newVal !== 'undefined'){
	  		Records.typeAheadSearch(newVal,function(typeAheadResults){
	  			$scope.typeAheadResults = typeAheadResults;
	  		})
	  	}
  	})
  	$scope.populateForm=function(record){
  		$scope.setFormItems(record)
  	}
  	
  }])  	

 

  .controller('recordCreationForm', ['$scope','Records',function($scope,Records) {
  	$scope.atLeastOneNotBlankGroups = {};
  	$scope.submit=function(){
  		var returnedId = Records.createRecord($scope.formItems);
  		alert('Record added. ID: ' + returnedId)
  	}
  }])

  .controller('inputCtrl', ['$scope','Records','$timeout',function($scope,Records,$timeout) {
  		$scope.invalidMessage = '';
		$scope.init = function(settings){
			$scope.$watch('atLeastOneNotBlankGroups'+'.'+settings.atLeastOneNotBlankGroup,function(newVal){
				if(settings.validation === 'atLeastOneNotBlank'){
	    			if(typeof newVal !== 'undefined'){
	    				if(newVal.length !== 0){
	    					$scope.removeFromInvalid(settings.atLeastOneNotBlankGroup+'GROUP');
		    				$scope.invalidMessage = '';
	    				} else {
	    					$scope.addToInvalid(settings.atLeastOneNotBlankGroup+'GROUP')
			    			$scope.invalidMessage = 'One must be entered'+$scope.atLeastOneNotBlankGroups[settings.atLeastOneNotBlankGroup];
	    				}
	    			}
	    		}
    		},true)		    
		    $scope.$watch('input',function(newVal){
		    	$scope.formItems[settings.name] = newVal;
		    	if(settings.validation === 'notBlank'){
		    		if(typeof newVal === 'undefined' || newVal === ''){
		    			$scope.addToInvalid(settings.name)
		    			$scope.invalidMessage = 'Cannot be blank.'
		    		}else{
		    			$scope.removeFromInvalid(settings.name)
		    			$scope.invalidMessage = ''
		    		}
		    		
				}

				if(settings.validation === 'atLeastOneNotBlank'){
					var groupArray = $scope.atLeastOneNotBlankGroups[settings.atLeastOneNotBlankGroup];
					if(typeof groupArray === 'undefined'){
						$scope.atLeastOneNotBlankGroups[settings.atLeastOneNotBlankGroup] = [];
						groupArray = $scope.atLeastOneNotBlankGroups[settings.atLeastOneNotBlankGroup];
					}
					if(typeof newVal === 'undefined' || newVal === ''){
		    			
		    			var i = groupArray.length
						while (i--){
						    if (settings.name === groupArray[i]){
						        groupArray.splice(i, 1);
						    }
						}
		    		}else{
		    			var alreadyInArray = false;
		    			for(var i=0,l=groupArray.length; i<l; i++){
		    				if(groupArray[i] === settings.name){
		    					alreadyInArray = true;
		    				}
		    			}
		    			if(!alreadyInArray){
		    				groupArray.push(settings.name);
		    			}
		    		

		    		}
		    		
				}

				
		    })
		    $scope.$watch('formItems',function(newVal){
		    	var obj = newVal;
		    	for (var key in obj) {
				    if(settings.name === key){
				    	$scope.input = obj[key]
				    }
				}
		    })
		};

  }])



  



  ;