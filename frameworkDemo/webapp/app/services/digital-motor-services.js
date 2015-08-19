(function () {

	'use strict';

	var service = angular.module('app.services.digitalMotor', []);
	service.factory('digitalMotorServices', ['$http', '$resource', 'dummyGenerator', DigitalMotorService]);

	function DigitalMotorService($http, $resource, dummyGenerator) {

		var webservices = [];
		var result = [];
		var functFactory = {};

		var default_url = "http://56.50.32.78:8080/web-motor-backend/carInsurence/insured/findInsuredPackage.do";
		var test_url = "http://www.w3schools.com//website/Customers_JSON.php";

		//for create dummy data record.
		var rowAmount = 10;
		
		//Initial Factory Methods
		functFactory.testMethod = testMethod;
		functFactory.getAQuickQuote = getAQuickQuote;
		functFactory.getBrandModelData = getBrandModelData;
		functFactory.getProductPackages = getProductPackages;
		functFactory.getPolicyInfo = getPolicyInfo;
		functFactory.getPayInfo = getPayInfo;
		functFactory.getRegions = getRegions;
		functFactory.requestPost = requestPost;
		functFactory.getDriverInfo = getDriverInfo;
		functFactory.getRecentlyQuote = getRecentlyQuote;
		functFactory.getQueryQuote = getQueryQuote;

		function InitialWebServices() {

			$http.get("app/services/config/webservice.config")
				.success(function (response) {
					if (response != null && response != undefined) {
						result = response["webservices"];
						for (var i = 0; i < result.length; i++) {
							
							webservices[result[0].key] = result[0].url;
							
						}
					}
				});

			return result;

		}

		InitialWebServices();

		function testMethod() {

			$http.get()
				.success(function (response) {
					result = response;
				});

			return result;
		}

		function requestPost(_url, _data) {
			if (_data == undefined) {
				_data = '';
			}

			console.log("---- request get:" + _data);
			return $http({
				method: 'GET',
				url: _url,
				data: _data,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
		}

		function getRecentlyQuote() {
			var RecentlyQuote = [{
					brandModel: "别克SGM7900AM",
					VINNumber: "AMLLLUU9888998",
					EngineNumber: 989889,
					premium: "1889",
					createTime: "2015-02-05"
				},
				{
					brandModel: "别克SGM7900AM",
					VINNumber: "AMLLLUU9888998",
					EngineNumber: 989889,
					premium: "1889",
					createTime: "2015-02-05"
				},
				{
					brandModel: "别克SGM7900AM",
					VINNumber: "AMLLLUU9888998",
					EngineNumber: 989889,
					premium: "1889",
					createTime: "2015-02-05"
				}];
			return RecentlyQuote;

		}

		function getQueryQuote() {
			var QueryQuote = [{
					No: "0000001",
					BrandModel: "雅阁HG7241AB轿车",
					VINNumber: "L333333333333333",
					EngineNumber: "PQ4111",
					Premium: 950,
					CreateTime: "2015-02-03"
				},
				{
					No: "0000001",
					BrandModel: "雅阁HG7241AB轿车",
					VINNumber: "L333333333333333",
					EngineNumber: "PQ4111",
					Premium: 6000,
					CreateTime: "2015-02-03"
				},
				{
					No: "0000001",
					BrandModel: "雅阁HG7241AB轿车",
					VINNumber: "L333333333333333",
					EngineNumber: "PQ4111",
					Premium: 7000,
					CreateTime: "2015-02-03"
				}, ];
			return QueryQuote;

		}

		function getAQuickQuote(quoteInfo) {

			$http.post(default_url, quoteInfo)
				.success(function (data) {
					result = data;
					debugger;
				})
				.error(function (data, status, headers, config) {
					console.error("failure message: " + JSON.stringify({
						data: data
					}));
					debugger;
				});

			return result;
		}

		function getBrandModelData(searchCriteria) {
			/* rowAmount = 4;
			 result = GenerateBrandModelDummyData(rowAmount);
			 return result;*/

			/*
            $http.post(default_url, quoteInfo)
				.success(function (data) {
					result = data;
					debugger;
				})
				.error(function (data, status, headers, config) {
					console.error("failure message: " + JSON.stringify({
						data: data
					}));
					debugger;
				});
            */

			var url = "http://56.50.32.122:8080/web-motor-backend/carInsurence/insured/modelLibraryQuery.do";
			var data = "searchParam=" + searchCriteria.vehicleModel;
			return $http({
				method: 'POST',
				url: url,
				data: data,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				}
			});

		}

		//Brand ModelDummy Data.
		function GenerateBrandModelDummyData(number) {
			var dataInfo = [
				{
					brand: '上海大众',
					modelName: '帕萨特',
					displacement: '1.6L',
					transmition: '手动',
					vehicleModel: '尊贵型 2005款',
					vehicleValue: '210000'
                },
				{
					brand: '上海大众',
					modelName: '帕萨特',
					displacement: '1.6L',
					transmition: '手动',
					vehicleModel: '尊贵型 2005款',
					vehicleValue: '268000'
                }];

			return dataInfo;
		}


		function getProductPackages(quoteInfo) {

			var resultList = [];


			/*
            $http.post(default_url, quoteInfo)
				.success(function (data) {
					result = data;
					debugger;
				})
				.error(function (data, status, headers, config) {
					console.error("failure message: " + JSON.stringify({
						data: data
					}));
					debugger;
				});
            */

			resultList.push({
				"package": "全面型",
				"premium": "3000",
				"type": "static",
				"CTPL": "0",
				"VTPL": "950",
				"roadTax": "360",
				"products": GenerateDummyPackageData("static")
			});
			resultList.push({
				"package": "基本型",
				"premium": "2000",
				"CTPL": "0",
				"VTPL": "950",
				"roadTax": "500",
				"type": "static",
				"products": GenerateDummyPackageData("static")
			});
			resultList.push({
				"package": "自选",
				"premium": "0",
				"CTPL": "0",
				"VTPL": "950",
				"roadTax": "260",
				"type": "dynamic",
				"products": GenerateDummyPackageData("dynamic")
			});

			return resultList;
		}

		//Package Dummy Data
		function GenerateDummyPackageData(type) {
			var dataInfo = [];
			var optionInfo = [];
			var randomPremium = 0;

			var lstCoverages = ["机动车损失险", "第三者责任险", "盗抢险",
								"车上人员责任险（司机）", "车上人员责任险（乘客）",
								"自燃损失险", "玻璃单独破碎险", "车身划痕险",
								"发动机特别损失险", "机动车损失险", "第三者责任险",
								"盗抢险", "车上人员责任险（司机）", "车上人员责任险（乘客）",
								"自燃险", "车身划痕险"];

			var lstParentId = ["0", "0", "1", "0", "0", "0", "1", "1", "1", "0", "0", "0", "12", "12", "1", "0"];
			var lstSumInsure = ["不投保", "投保"];
			//ACTUAL OPTION IS 1,3,7,8,9,11,12,15 THE REST IS RANDOM : 
			var optionInfo = [[
					{
						"id": "1a",
						"option": "不投保",
						"premium": "0",
						"default": "true"
					},
					{
						"id": "1b",
						"option": "投保",
						"premium": "100",
						"default": "false"
					},
							  ],
							  [
					{
						"id": "2a",
						"option": "不投保",
						"premium": "0",
						"default": "true"
					},
					{
						"id": "2b",
						"option": "投保",
						"premium": "100",
						"default": "false"
					}
							  ],
							  [
					{
						"id": "3a",
						"option": "不投保",
						"premium": "0",
						"default": "true"
					},
					{
						"id": "3b",
						"option": "投保",
						"premium": "100",
						"default": "false"
					}
							  ],
							  [
					{
						"id": "4a",
						"option": "不投保",
						"premium": "0",
						"default": "true"
					},
					{
						"id": "4b",
						"option": "投保",
						"premium": "100",
						"default": "false"
					}
							  ],
							  [
					{
						"id": "5a",
						"option": "不投保",
						"premium": "0",
						"default": "true"
					},
					{
						"id": "5b",
						"option": "投保",
						"premium": "100",
						"default": "false"
					}
							  ],
							  [
					{
						"id": "6a",
						"option": "不投保",
						"premium": "0",
						"default": "true"
					},
					{
						"id": "6b",
						"option": "投保",
						"premium": "100",
						"default": "false"
					}
							  ],
							  [
					{
						"id": "7a",
						"option": "不投保",
						"premium": "0",
						"default": "true"
					},
					{
						"id": "7b",
						"option": "投保",
						"premium": "100",
						"default": "false"
					}
							  ],
							  [
					{
						"id": "8a",
						"option": "不投保",
						"premium": "0",
						"default": "true"
					},
					{
						"id": "8b",
						"option": "2000元",
						"premium": "2000",
						"default": "false"
					},
					{
						"id": "8c",
						"option": "5000元",
						"premium": "5000",
						"default": "false"
					}
							  ],
							  [
					{
						"id": "9a",
						"option": "不投保",
						"premium": "0",
						"default": "true"
					},
					{
						"id": "9b",
						"option": "投保",
						"premium": "100",
						"default": "false"
					}
							  ],
							  [
					{
						"id": "10a",
						"option": "不投保",
						"premium": "0",
						"default": "true"
					},
					{
						"id": "10b",
						"option": "投保",
						"premium": "100",
						"default": "false"
					}
							  ],
							  [
					{
						"id": "11a",
						"option": "不投保",
						"premium": "0",
						"default": "false"
					},
					{
						"id": "11b",
						"option": "20万",
						"premium": "100",
						"default": "true"
					},
					{
						"id": "11c",
						"option": "30万",
						"premium": "200",
						"default": "false"
					},
					{
						"id": "11d",
						"option": "50万",
						"premium": "300",
						"default": "false"
					},
					{
						"id": "11e",
						"option": "100万",
						"premium": "400",
						"default": "false"
					},
					{
						"id": "11f",
						"option": "200万",
						"premium": "500",
						"default": "false"
					}
							  ],
							  [
					{
						"id": "12a",
						"option": "不投保",
						"premium": "0",
						"default": "true"
					},
					{
						"id": "12b",
						"option": "1万",
						"premium": "50",
						"default": "false"
					},
					{
						"id": "12c",
						"option": "2万",
						"premium": "100",
						"default": "false"
					},
					{
						"id": "12d",
						"option": "10万",
						"premium": "250",
						"default": "false"
					}
							  ],
							  [
					{
						"id": "13a",
						"option": "不投保",
						"premium": "0",
						"default": "true"
					},
					{
						"id": "13b",
						"option": "1万",
						"premium": "50",
						"default": "false"
					},
					{
						"id": "13c",
						"option": "2万",
						"premium": "60",
						"default": "false"
					},
					{
						"id": "13d",
						"option": "10万",
						"premium": "70",
						"default": "false"
					}
							  ],
							  [
					{
						"id": "14a",
						"option": "不投保",
						"premium": "0",
						"default": "true"
					},
					{
						"id": "14b",
						"option": "1万",
						"premium": "50",
						"default": "false"
					},
					{
						"id": "14c",
						"option": "2万",
						"premium": "60",
						"default": "false"
					},
					{
						"id": "14d",
						"option": "10万",
						"premium": "70",
						"default": "false"
					}
							  ],
							  [
					{
						"id": "15a",
						"option": "不投保",
						"premium": "0",
						"default": "true"
					},
					{
						"id": "15b",
						"option": "投保",
						"premium": "100",
						"default": "false"
					}
							  ],
							  [
					{
						"id": "16a",
						"option": "不投保",
						"premium": "0",
						"default": "true"
					},
					{
						"id": "16b",
						"option": "投保",
						"premium": "100",
						"default": "false"
					}
							  ]];

			for (var i = 0; i < lstCoverages.length; i++) {

				randomPremium = ((optionInfo[i] != null && type == "dynamic") ? 0 : dummyGenerator.randomNumber(120));

				dataInfo.push({
					id: (i + 1),
					coverage: lstCoverages[i],
					parent: lstParentId[i],
					sumInsure: (randomPremium > 0 ? lstSumInsure[0] : lstSumInsure[1]),
					premium: randomPremium,
					option: optionInfo[i],
					desc1: dummyGenerator.randomName(100, "cn"),
					desc2: dummyGenerator.randomName(120, "cn")
				});
			}
			return dataInfo;
		}

		function getPolicyInfo(policyNo) {
			var policyInfo = {
				policyHolder: 'TESTER',
				carNo: '沪AWD878',
				commercialInsuranceNo: '201-1-701-15-012077-000-00',
				commercialInsurancePeriod: '2015-03-14 to 2016-03-13',
				deliveryAddress: '598 Fengyang Road, Jing\'an, Shanghai',
				insured: 'TESTER',
				applicantTelephone: '13123456789',
				compulsoryInsuranceNo: '201-1-710-15-012077-000-00',
				compulsoryInsurancePeriod: '2015-03-14 to 2016-03-13'

			};

			return policyInfo;
		}

		function getPayInfo(policyNo) {
			var payInfo = {
				payer: 'TESTER',
				paymentPremium: '212,960.00',
				paymentMerchant: 'China Merchant Bank',
				paymentMethod: 'China Unionpay'
			};

			return payInfo;
		}

		function getRegions() {
			// test url
			var url = 'http://56.50.32.122:8080/web-motor-backend/carInsurence/insured/getRunAreas.do';
			return $http.get(url);
		}

		function getDriverInfo(basicInfo) {
			var url = 'http://localhost:8090/findDriverInfo';
			return $http.post(url, basicInfo);
		}

		return functFactory;
	}

})();