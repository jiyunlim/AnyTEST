//UI 스크립트
$.fn.extend({
	//일부 안드로이드용 maxlength
	max: function (max) {
		if (max != undefined) {
			$(this).attr("max", max);
		}
		$(this).attr('oninput', "javascript: if ( this.max > -1 &&this.value.length > this.max) this.value = this.value.slice(0, this.max);");
	},
	maxLength: function (maxlength) {
		if (maxlength != undefined) {
			$(this).attr("maxlength", maxlength);
		}
		$(this).attr('oninput', "javascript: if ( this.maxLength > -1 &&this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");
	},
	textCount: function (text) {
		var $text = text == undefined ? $(this).parent().find('.count-words em') : $(text);
		$(this).on('keydown paste', function (event) {
			var _this = this;
			setTimeout(function () {
				var textLength = $(_this).val().length;
				//console.log(textLength);
				$text.text(textLength);
			}, 100);
		}).blur(function () {
			var length = $(this).val().length;
			if (length != 0) {
				$(this).addClass('on');
			} else {
				$(this).removeClass('on');
			}
		});
	},
	modal: function (param) {
		param = param ? param : {};
		$(this).off('click');
		$(this).click(function () {
			param.modal = $(this).data('modal');
			param.modalMode = $(this).data('modal-mode') ? $(this).data('modal-mode') : param.modalMode;
			$.extend(param, $(this).data('modal-param'));
			if ($(this).data('modal-callback')) {
				param.callBack = eval($(this).data('modal-callback'));
			}
			UI.modal(param);
		});
	},
	copyToClipboard: function (url) {
		$(this).click(function () {
			UI.copyToClipboard(url);
		});
	},
	setSelectBoxOptgroup: function () {
		//UI.debug(UI.getDevice());
		//$('select:eq(0) :last-child').is('optgroup[label=""]')
		if (UI.getDevice() == 'iPhone') {
			//$(this).append('<optgroup label=""></optgroup>');
			$(this).not(':last-child optgroup[label=""]').append('<optgroup label=""></optgroup>');
		}
	}
});

var UI = {
	init: function () {
		this.numberFormAll();
		this.telFormAll();
		this.telWifiFormAll();
		this.cardFormAll();
		this.corpFormAll();
		this.compFormAll();
		this.foreignerFormAll();
		this.residentFormAll();
		this.noKoreanFormAll();
		this.accountFormAll();
		this.minusFormAll();
		this.plusFormAll();
		this.modalAll();
		this.tab();
		$('input[type=tel][maxlength],input[type=text][maxlength],input[type=password][maxlength],textarea[maxlength]').maxLength();
		$('textarea[maxlength]').textCount();
		$('input[type=number][max]').max();
		this.setMobileNumberKeyPad('input[type=number], input[data-mode=resident], input[data-mode=foreigner], input[data-mode=comp], input[data-mode=corp], input[data-mode=card], input[data-mode=account]');
		$('.url-copy button').click(function () {
			UI.copyToClipboard($(this).parents('.url-copy').find('a').text());
		});
		this.global();
		this.tabGroup('.tab-list', '.tab-item');
		this.tabGroup('.sort-list', '.sort-item');
		this.tabGroup('.rdo-list', '.rdo-item');
		$('select').setSelectBoxOptgroup();
		this.fileFormAll();
	},
	fileFormAll: function () {
		//파일첨부
		$('input[type=file]').on('change', function () {
			$(this).parent('.form-group').find('input[type=text]').val($(this).val().replace('C:\\fakepath\\', ''));
		});
	},
	numberFormInit: function (obj) {
		obj = obj ? obj : 'input[type=number]';
		this.numberFormAll(obj);
		this.setMobileNumberKeyPad(obj);
		$(obj + '[max]').max();
	},
	startIdx: 0, // 포커스 시작점
	debug: function (val) {
		var dh = $(document).height();
		var wh = $(window).height();
		var html = '<div id="consoleLog" style="width:100%;height:100px;overflow:auto;border:1px solid black;position:absolute;top:0px;"></div>';
		if ($('#consoleLog').length == 0) {
			$('body').append(html);
		}
		$('#consoleLog').css({
			'top': $(document).scrollTop()
		});
		$('#consoleLog').append(val + '<br/>');
		//console.log($(this).scrollHeight);
		$('#consoleLog').scrollTop($('#consoleLog')[0].scrollHeight);
	},
	getBrowser: function () {
		var agent = navigator.userAgent.toLowerCase();
		//console.log(agent);
		Browser = {
			ie: /*@cc_on true || @*/ false,
			ie6: agent.indexOf('msie 6') != -1,
			ie7: agent.indexOf('msie 7') != -1,
			ie8: agent.indexOf('msie 8') != -1,
			ie9: agent.indexOf('msie 9') != -1,
			ie10: agent.indexOf('msie 10') != -1,
			ie11: agent.indexOf('rv:11.0') != -1,
			opera: !!window.opera,
			safari: agent.indexOf('safari') != -1,
			safari3: agent.indexOf('applewebkit/5') != -1,
			mac: agent.indexOf('mac') != -1,
			chrome: agent.indexOf('chrome') != -1,
			firefox: agent.indexOf('firefox') != -1,
			name: 'unkown'
		}

		if (Browser.chrome) {
			//console.log("It is chrome browser");
			Browser.name = 'chrome';
		} else if (Browser.ie6) {
			//console.log("It is ie6 browser");
			Browser.name = 'ie6';
		} else if (Browser.ie7) {
			//console.log("It is ie7 browser");
			Browser.name = 'ie7';
		} else if (Browser.ie8) {
			//console.log("It is ie8 browser");
			Browser.name = 'ie8';
		} else if (Browser.ie9) {
			//console.log("It is ie9 browser");
			Browser.name = 'ie9';
		} else if (Browser.ie10) {
			//console.log("It is ie10 browser");
			Browser.name = 'ie10';
		} else if (Browser.ie11) {
			//console.log("It is ie11 browser");
			Browser.name = 'ie11';
		} else if (Browser.opera) {
			//console.log("It is opera browser");
			Browser.name = 'opera';
		} else if (Browser.safari) {
			//console.log("It is safari browser");
			Browser.name = 'safari';
		} else if (Browser.safari3) {
			//console.log("It is safari3 browser");
			Browser.name = 'safari3';
		} else if (Browser.mac) {
			//console.log("It is mac browser");
			Browser.name = 'mac';
		} else if (Browser.firefox) {
			//console.log("It is firefox browser");
			Browser.name = 'firefox';
		} else {
			//console.log("It is maybe ie");
			Browser.name = 'ie';
			Browser.ie = true;
		}
		//console.log(Browser);
		return Browser;
	},
	getDevice: function () {
		var mobileArr = new Array("iPhone", "iPod", "BlackBerry", "Android", "Windows CE", "LG", "MOT", "SAMSUNG", "SonyEricsson");
		var device = 'unknown';
		for (var txt in mobileArr) {
			if (navigator.userAgent.match(mobileArr[txt]) != null) {
				// 작업
				device = mobileArr[txt];
				break;
			}
		}
		return device;
	},
	getDeviceVersion: function () {
		var agent = navigator.userAgent.toLowerCase();
		version = {
			android7: agent.indexOf('android 7.') != -1,
			android5: agent.indexOf('android 5.') != -1,
			name: 'unkown'
		}
		if (version.android7) {
			version.name = 'android7';
		} else if (version.android5) {
			version.name = 'android5';
		}
		return version;

	},
	isExceptDevice: function () {
		var result;
		if (this.getDeviceVersion().name == 'android7' || this.getDeviceVersion().name == 'andriod') {
			result = true;
		} else {
			result = false;
		}
		return result;
	},
	trim: function (val) {
		return val.replace(/(^\s*)|(\s*$)/gi, "");
	},
	numberFormAll: function (obj) {
		obj = obj ? obj : 'input[type=number]';
		$(obj).keydown(function (event) {
			//백스페이스 허용
			if (event.keyCode != 8) {
				//숫자 입력
				if ((!(event.keyCode >= 48 && event.keyCode <= 57) && !(event.keyCode >= 96 && event.keyCode <= 105))) {
					//if(event.which && (event.which < 48 || event.which > 57) ) {
					event.preventDefault();
				}
			}
		}).keyup(function (event) {
			var length = $(this).data('length') != undefined ? $(this).data('length') : $(this).val().length;
			var max = $(this).attr('max') ? $(this).attr('max') : Math.pow(2, 64);
			var val = $(this).val();
			if (val.indexOf('.') > -1) {
				$(this).val(val.replace(/\./g, ''));
				val = $(this).val();
				length--;
			}

			if (event.keyCode == 8) {
				if (length > 0 && max >= length) {
					length--;
				}
			} else if (event.keyCode != 8 && (max >= length)) {
				length++;
			}

			$(this).data('length', length);
			//UI.debug(length +'|' +$(this).val().length + '|' + $(this).val() );
			if (length > $(this).val().length) {
				$(this).val('');
				$(this).val(val);
				length--;
				$(this).data('length', length);
			}


			if ($(this).val() != val.replace(/[^0-9]/g, '')) {
				$(this).val(val.replace(/[^0-9]/g, ''));
			}
		}).blur(function () {
			//if( $(this).val() != null && $(this).val() != '' ) {
			var val = $(this).val();
			$(this).val('');
			$(this).val(val);
			$(this).val(val.replace(/[^0-9]/g, ''));
			//}
		});
	},
	/*numberMaskFormAll : function(event){
		$('input[type=tel][data-mode=numbermask]').keydown(function(event) {
			//백스페이스 허용
			if(event.keyCode!=8){
				//숫자 입력
				if( (!(event.keyCode >= 48 && event.keyCode <= 57) && !(event.keyCode >= 96 && event.keyCode <= 105)) ) {
					event.preventDefault();
				}
			}
			
		 }).keyup(function(event){
			//console.log(event);
			
			$('#testX').val($('#testX').val()+event.key);
			var mask = '';
			for(var i=0; $('#testX').val().length > i; i++){
				mask += '*';
			}
			//console.log(mask);
			$(this).val(mask);
			
		 });
	},*/
	telFormAll: function () {
		$('input[type=tel]').not('[data-mode]').keydown(function (event) {
			//백스페이스 허용
			if (event.keyCode != 8) {
				//숫자 백스페이스만 입력
				if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
					event.preventDefault();
				}
				//자리수제한
				/*var valLength = $(this).val().replace(/[^0-9]/g, '').length;
				if(valLength >= 11) {
					$(this).val($(this).val().slice(0, 10));
				}*/
			}
		}).keyup(function () {
			if ($(this).val() != $(this).val().replace(/[^0-9]/g, '')) {
				$(this).val($(this).val().replace(/[^0-9]/g, ''));
			}
			//전화번호형식 변환
		}).blur(function () {
			if ($(this).val() != null && $(this).val() != '') {
				/*var valLength = $(this).val().replace(/[^0-9]/g, '').length;
				if(valLength >= 11) {
					$(this).val($(this).val().slice(0, 11));
				}*/
				$(this).val($(this).val().replace(/[^0-9]/g, ''));
			}
			$(this).val($(this).val().replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3"));
		}).focus(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$(this).val($(this).val().replace(/[^0-9]/g, ''));
			}
		});
	},
	//tel wifi
	telWifiFormAll: function () {
		$('input[type=tel][data-mode=wifi]').keydown(function (event) {
			//백스페이스 허용
			if (event.keyCode != 8) {
				//숫자 백스페이스만 입력
				if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
					event.preventDefault();
				}
			}
		}).keyup(function () {
			if ($(this).val() != $(this).val().replace(/[^0-9]/g, '')) {
				$(this).val($(this).val().replace(/[^0-9]/g, ''));
			}
			//전화번호형식 변환
		}).blur(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$(this).val($(this).val().replace(/[^0-9]/g, ''));
			}
			$(this).val($(this).val().replace(/([0-9]+)([0-9]{4})/, "$1-$2"));
		}).focus(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$(this).val($(this).val().replace(/[^0-9]/g, ''));
			}
		});
	},
	// 카드번호
	cardFormAll: function () {
		$('input[data-mode=card]').keyup(function (event) {
			endIdx = event.target.selectionEnd;
			var val = $(this).val();
			var dataVal = $(this).data('val') ? $(this).data('val') : '';
			var mergeVal = '';
			var newVal;
			//console.log(val);

			if (val.length > dataVal.length) {
				newVal = $(this).val().substring(startIdx, endIdx).replace(/([^0-9])/g, '');
				//console.log(newVal);

				mergeVal = dataVal.substring(0, startIdx) + newVal + dataVal.substring(startIdx);
			} else if (val.length < dataVal.length) {
				if (startIdx == endIdx) {
					if (val.length > endIdx) {
						mergeVal = dataVal.substring(0, startIdx) + dataVal.substring(startIdx + dataVal.length - val.length);
					} else {
						mergeVal = dataVal.substring(0, val.length);
					}
				} else {
					mergeVal = dataVal.substring(0, endIdx) + '' + dataVal.substring(startIdx);
				}

			} else {
				mergeVal = dataVal;
			}
			//console.log(startIdx+'|'+endIdx);

			$(this).data('val', mergeVal);
			//var newDataVal = $(this).data('val');
			if ($("#" + this.id + "Num").length > 0) {
				$("#" + this.id + "Num").val(mergeVal);
			}

			var newDataVal1 = mergeVal.substring(0, 4);
			var newDataVal2 = mergeVal.substring(4, 12);
			var newDataVal3 = mergeVal.substring(12);
			var maskStr = '';
			for (var i = 0; i < newDataVal2.length; i++) {
				maskStr += '*';
			}

			$(this).val(newDataVal1 + maskStr + newDataVal3);

			$(this)[0].selectionEnd = newVal != '' ? endIdx : startIdx;
			startIdx = event.target.selectionStart;
		}).focus(function () {
			startIdx = 0;
			$(this).val($(this).val().replace(/([^*0-9])/g, ''));
			if ($("#" + this.id + "Num").length > 0) {
				$('#' + this.id + 'Num').val($('#' + this.id + 'Num').val().replace(/([^*0-9])/g, ''));
			}
		}).blur(function () {
			//console.log($(this).val().replace(/([0-9]{6})([*]{7})/g,"$1-$2"));
			$(this).val($(this).val().replace(/([0-9]{4})([*]{4})([*]{4})([0-9]+)/, "$1-$2-$3-$4"));
			if ($("#" + this.id + "Num").length > 0) {
				$("#" + this.id + "Num").val($("#" + this.id + "Num").val().replace(/([0-9]{4})([0-9]{4})([0-9]{4})([0-9]+)/, "$1-$2-$3-$4"));
			}
		}).on('touchend click', function (event) {
			var _this = this;
			setTimeout(function () {
				startIdx = $(_this)[0].selectionStart;
			}, 100);
		}).on('paste cut', function (event) {
			//alert('x');
			event.preventDefault();
		});
	},
	// 법인등록번호
	corpFormAll: function () {
		$('input[data-mode=corp]').keydown(function (event) {
			//백스페이스 허용
			if (event.keyCode != 8) {
				//숫자 백스페이스만 입력
				if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
					event.preventDefault();
				}
				//자리수제한
				/*var valLength = $(this).val().replace(/([^0-9])/g, '').length;
				if(valLength >= 13) {
					event.preventDefault();
				}*/
			}
		}).keyup(function () {
			if ($(this).val() != $(this).val().replace(/([^0-9])/g, '')) {
				$(this).val($(this).val().replace(/([^0-9])/g, ''));
			}
			// 법인등록번호형식 변환
		}).blur(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$(this).val($(this).val().replace(/([^0-9])/g, ''));
			}
			$(this).val($(this).val().replace(/([0-9]{6})([0-9]+)/, "$1-$2"));
		}).focus(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$(this).val($(this).val().replace(/([^0-9])/g, ''));
			}
		});
	},
	// 사업자등록번호
	compFormAll: function () {
		$('input[data-mode=comp]').keydown(function (event) {
			//백스페이스 허용
			if (event.keyCode != 8) {
				//숫자 백스페이스만 입력
				if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
					event.preventDefault();
				}
			}
		}).keyup(function () {
			if ($(this).val() != $(this).val().replace(/([^0-9])/g, '')) {
				$(this).val($(this).val().replace(/([^0-9])/g, ''));
			}
			// 사업자등록번호형식 변환
		}).blur(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$(this).val($(this).val().replace(/([^0-9])/g, ''));
			}
			$(this).val($(this).val().replace(/([0-9]{3})([0-9]{2})([0-9]+)/, "$1-$2-$3"));
		}).focus(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$(this).val($(this).val().replace(/([^0-9])/g, ''));
			}
		});
	},
	// 외국인등록번호
	foreignerFormAll: function () {
		$('input[data-mode=foreigner]').keydown(function (event) {
			//백스페이스 허용
			if (event.keyCode != 8) {
				//숫자 백스페이스만 입력
				if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
					event.preventDefault();
				}
				//자리수제한
				/*var valLength = $(this).val().replace(/([^0-9])/g, '').length;
				if(valLength >= 11) {
					event.preventDefault();
				}*/
			}
		}).keyup(function () {
			if ($(this).val() != $(this).val().replace(/([^0-9])/g, '')) {
				$(this).val($(this).val().replace(/([^0-9])/g, ''));
			}
			// 외국인등록번호형식 변환
		}).blur(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$(this).val($(this).val().replace(/([^0-9])/g, ''));
			}
			$(this).val($(this).val().replace(/([0-9]{6})([0-9]+)/, "$1-$2"));
		}).focus(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$(this).val($(this).val().replace(/([^0-9])/g, ''));
			}
		});
	},
	//주민등록번호
	residentFormAll: function () {
		$('input[data-mode=resident]').keyup(function () {
			endIdx = event.target.selectionEnd;
			var val = $(this).val();
			var dataVal = $(this).data('val') ? $(this).data('val') : '';
			var mergeVal = '';
			var newVal;
			//console.log(val);

			if (val.length > dataVal.length) {
				newVal = $(this).val().substring(startIdx, endIdx).replace(/([^0-9])/g, '');
				//console.log(newVal);

				mergeVal = dataVal.substring(0, startIdx) + newVal + dataVal.substring(startIdx);
			} else if (val.length < dataVal.length) {
				if (startIdx == endIdx) {
					if (val.length > endIdx) {
						mergeVal = dataVal.substring(0, startIdx) + dataVal.substring(startIdx + dataVal.length - val.length);
					} else {
						mergeVal = dataVal.substring(0, val.length);
					}
				} else {
					mergeVal = dataVal.substring(0, endIdx) + '' + dataVal.substring(startIdx);
				}

			} else {
				mergeVal = dataVal;
			}
			//console.log(startIdx+'|'+endIdx);

			$(this).data('val', mergeVal);
			//var newDataVal = $(this).data('val');
			if ($("#" + this.id + "Num").length > 0) {
				$("#" + this.id + "Num").val(mergeVal);
			}

			var newDataVal1 = mergeVal.substring(0, 7);
			var newDataVal2 = mergeVal.substring(7);
			var maskStr = '';
			for (var i = 0; i < newDataVal2.length; i++) {
				maskStr += '*';
			}

			$(this).val(newDataVal1 + maskStr);

			$(this)[0].selectionEnd = newVal != '' ? endIdx : startIdx;
			startIdx = event.target.selectionStart;
		}).focus(function () {
			startIdx = 0;
			$(this).val($(this).val().replace(/([^*0-9])/g, ''));
			if ($("#" + this.id + "Num").length > 0) {
				$('#' + this.id + 'Num').val($('#' + this.id + 'Num').val().replace(/([^*0-9])/g, ''));
			}
		}).blur(function () {
			//console.log($(this).val().replace(/([0-9]{6})([*]{7})/g,"$1-$2"));
			$(this).val($(this).val().replace(/([0-9]{6})([0-9]{1}[*]{6})/g, "$1-$2"));
			if ($("#" + this.id + "Num").length > 0) {
				$('#' + this.id + 'Num').val($('#' + this.id + 'Num').val().replace(/([0-9]{6})([0-9]{7})/g, "$1-$2"));
			}
		}).on('touchend click', function (event) {
			var _this = this;
			setTimeout(function () {
				startIdx = $(_this)[0].selectionStart;
			}, 100);
		}).on('paste cut', function (event) {
			//alert('x');
			event.preventDefault();
		});
	},
	// 한글 금지
	noKoreanFormAll: function () {
		$('input[data-mode=noKorean]').keydown(function (event) {
			//백스페이스 허용
			if (event.keyCode != 8) {
				//숫자 백스페이스만 입력
				if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode >= 65 && event.keyCode <= 90))) {
					event.preventDefault();
				}
			}
		}).keyup(function () {
			var _this = this;
			if ($(_this).val() != $(_this).val().replace(/[^a-zA-Z0-9]/g, "")) {
				$(_this).val($(_this).val().replace(/[^a-zA-Z0-9]/g, ""));
			}
		}).blur(function () {
			var _this = this;
			if ($(_this).val() != $(_this).val().replace(/[^a-zA-Z0-9]/g, "")) {
				$(_this).val($(_this).val().replace(/[^a-zA-Z0-9]/g, ""));
			}
		}).on('paste', function () {
			var _this = this;
			setTimeout(function () {
				if ($(_this).val() != $(_this).val().replace(/[^a-zA-Z0-9]/g, "")) {
					$(_this).val($(_this).val().replace(/[^a-zA-Z0-9]/g, ""));
				}
			}, 100);
		});
	},
	//계좌번호
	accountFormAll: function () {
		$('input[data-mode=account]').keyup(function () {
			endIdx = event.target.selectionEnd;
			var val = $(this).val();
			var dataVal = $(this).data('val') ? $(this).data('val') : '';
			var mergeVal = '';
			var newVal;
			//console.log(val);

			if (val.length > dataVal.length) {
				newVal = $(this).val().substring(startIdx, endIdx).replace(/([^0-9])/g, '');
				//console.log(newVal);

				mergeVal = dataVal.substring(0, startIdx) + newVal + dataVal.substring(startIdx);
			} else if (val.length < dataVal.length) {
				if (startIdx == endIdx) {
					if (val.length > endIdx) {
						mergeVal = dataVal.substring(0, startIdx) + dataVal.substring(startIdx + dataVal.length - val.length);
					} else {
						mergeVal = dataVal.substring(0, val.length);
					}
				} else {
					mergeVal = dataVal.substring(0, endIdx) + '' + dataVal.substring(startIdx);
				}

			} else {
				mergeVal = dataVal;
			}
			//console.log(startIdx+'|'+endIdx);

			$(this).data('val', mergeVal);
			//var newDataVal = $(this).data('val');
			if ($("#" + this.id + "Num").length > 0) {
				$("#" + this.id + "Num").val(mergeVal);
			}


			var newDataVal1 = mergeVal.substring(0, 8);
			var newDataVal2 = mergeVal.substring(8);
			var newDataVal3 = newDataVal2.substr(0, newDataVal2.length < 3 ? 0 : newDataVal2.length - 3);

			var maskStr = '';

			for (var i = 0; i < newDataVal2.length - newDataVal3.length; i++) {
				maskStr += '*';
			}

			$(this).val(newDataVal1 + newDataVal3 + maskStr);

			$(this)[0].selectionEnd = newVal != '' ? endIdx : startIdx;
			startIdx = event.target.selectionStart;
		}).focus(function () {
			startIdx = 0;
			$(this).val($(this).val().replace(/([^*0-9])/g, ''));
			if ($("#" + this.id + "Num").length > 0) {
				$('#' + this.id + 'Num').val($('#' + this.id + 'Num').val().replace(/([^*0-9])/g, ''));
			}
		}).blur(function () {
			//console.log($(this).val().replace(/([0-9]{6})([*]{7})/g,"$1-$2"));
			//$(this).val( $(this).val().replace(/([0-9]{6})([*]{7})/g,"$1-$2") );
			if ($("#" + this.id + "Num").length > 0) {
				$("#" + this.id + "Num").val($("#" + this.id + "Num").val().replace(/([^0-9]+)/, "$1"));
			}
		}).on('touchend click', function (event) {
			var _this = this;
			setTimeout(function () {
				startIdx = $(_this)[0].selectionStart;
			}, 100);
		}).on('paste cut', function (event) {
			//alert('x');
			event.preventDefault();
		});
	},
	getAddList: function (html, id) {
		$("#" + id).append(html);

		UI.addListEndFlag++;

		UI.addListFlag = 0;

		$('#loadingDiv').hide();
	},
	addListFlag: 0, // 로딩중 중복 작업 방지용 플래그
	addListEndFlag: 0, // 가져올 데이터 유무 체크용 플래그
	accountValidityCheckBtnChange: function (flag, id) {
		if (flag) {
			//console.log("if");
			$('#' + id).removeClass('disabled');
		} else {
			//console.log("else");
			$('#' + id).addClass('disabled');
		}
	},
	currentTabId: "",
	tabGroup: function ($tabList, $tabItem) {
		$($tabItem).on('click', function () {
			if ($(this).siblings().hasClass('active')) {
				$(this).addClass('active').siblings().removeClass('active');
			} else {
				if ($tabList == ".paytab-list") {
					var $tabPanel = $(this).attr('aria-controls');
					var $tabPanelOn = $("#" + $tabPanel);
					//console.dir($tabPanel);
					//console.dir($tabPanelOn);
					//console.dir(currentTabId);
					if (UI.currentTabId == $tabPanel) {
						UI.currentTabId = "_slcPymPnl0";
						$tabPanelOn = $("#_slcPymPnl0");

						$(this).attr('aria-selected', false).siblings().attr('aria-selected', false);
						$tabPanelOn.attr('aria-selected', true);
						$tabPanelOn.parent($tabList).nextAll('[role="tabpanel"]').attr('aria-hidden', true);
						$tabPanelOn.attr('aria-hidden', false);
					} else {
						UI.currentTabId = $tabPanel;

						$(this).attr('aria-selected', true).siblings().attr('aria-selected', false);
						$(this).parent($tabList).nextAll('[role="tabpanel"]').attr('aria-hidden', true);
						$tabPanelOn.attr('aria-hidden', false);
					}
				} else {
					if ($(this).attr('aria-controls') == '_mbrClsPnl3') {
						UI.modal({
							modal: '#modalAlert',
							title: '알림',
							content: '휴대폰 구매를 원하시는 법인 고객님께서는 전화상담 주문을 이용하세요. (국번없이 1599-0111)',
							buttonType: 'alert'
						});
						return false;
					}
					$(this).attr('aria-selected', true).siblings().attr('aria-selected', false);
					var $tabPanel = $(this).attr('aria-controls');
					var $tabPanelOn = $("#" + $tabPanel);
					$(this).parent($tabList).nextAll('[role="tabpanel"]').attr('aria-hidden', true);
					$tabPanelOn.attr('aria-hidden', false);
				}
			}
		});
	},
	tab: function () {
		var tabGroup = [];
		$('[data-tab]').each(function (key, value) {
			if ($.inArray($(this).data('tab'), tabGroup) == -1) {
				tabGroup.push($(this).data('tab'));
			}
		});

		$.each(tabGroup, function (key, value) {
			var $tab = $('[data-tab=' + value + ']');
			var $content = $('[data-tab-content=' + value + ']');
			var onIndex = $tab.index($tab.filter('.on'));
			$content.hide();
			$content.eq(onIndex).show();
			$tab.click(function () {
				var index = $(this).index();
				$tab.removeClass('on');
				$tab.eq(index).addClass('on');
				$content.hide();
				$content.eq(index).show();

				var txt = $(this).find("a").text();
				var $tgArea = $(this).parents('.tab-sub-wrap').find('.g-invisible');
				$tgArea.text(txt);
			});
		});
		//this.tabBookMark();
	},
	tabBookMark: function () {
		var hash = location.hash;
		var tabGroup = [];
		$('[data-tab]').each(function (key, value) {
			if ($.inArray($(this).data('tab'), tabGroup) == -1) {
				tabGroup.push($(this).data('tab'));
			}
		});

		$.each(tabGroup, function (key, value) {
			var $tab = $('[data-tab=' + value + ']');
			var $content = $('[data-tab-content=' + value + ']');
			var onIndex = $tab.index($tab.filter('.on'));
			var contentIndex = $content.index($content.find(hash).parents('[data-tab-content=' + value + ']'));
			var index = contentIndex > -1 ? contentIndex : onIndex;
			$tab.eq(index).trigger('click');
		});
	},
	// 마이너스 버튼
	minusFormAll: function () {
		$('.btn-minus').on('click', function () {
			//debugger;
			console.dir($(this).next('input').val());
			var val = Number($(this).next('input').val()) - 1;
			if (val < 2) {
				val = 1;
			}
			$(this).next('input').val(val);
		});
	},
	// 플러스 버튼
	plusFormAll: function () {
		$('.btn-plus').on('click', function () {
			//debugger;
			console.dir($(this).prev('input').val());
			var val = Number($(this).prev('input').val()) + 1;

			// 임시로 10까지만 증가 해당 제품의 재고 수량 만큼만 증가하게 수정 필요
			if (val > 10) {
				val = 10;
			}
			$(this).prev('input').val(val);
		});
	},
	modal: function (param) {
		if (param.modalMode != 'overlap') {
			$('.modal, .modal-full, .popup').hide();
			//IOS modal-full 대응
			if ($('body').css('position') == 'fixed') {
				var top = -$('body').offset().top;
				$('body').css({
					position: '',
					top: '',
					left: '',
					right: '',
					bottom: ''
				});
				$(window).scrollTop(top);
			}
		}

		if (param.execute) {
			$(param.execute).off('click');
			$(param.execute).click(function () {
				UI.modal(param);
			});
		}
		var modal = param.modal;

		var button = param.button;
		if (param.buttonType == 'alert') {
			button = '<span class="group-r"><button type="button" class="btn-secondary-text js-modal-close">확인</button></span>';
		} else if (param.buttonType == 'confirm') {
			button = '<span class="group-l"><button type="button" class="btn-default-text js-modal-close">취소</button></span><span class="group-r"><button type="button" class="btn-secondary-text">확인</button></span>';
		} else if (param.buttonType == 'yesno') {
			button = '<span class="group-l"><button type="button" class="btn-default-text js-modal-close">아니오</button></span><span class="group-r"><button type="button" class="btn-secondary-text">예</button></span>';
		}

		if ($(modal).length == 0 || param.modalType != undefined) {
			if ($(modal).length > 0) $(modal).remove();
			var modalType = param.modalType == undefined ? 'alert' : param.modalType;
			var modalId = modal.replace('#', '');
			var html = '';
			if (modalType == 'alert') {
				html += '<div class="modal modal-overlay" id="' + modalId + '" role="dialog" aria-modal="true">';
				html += '<div class="modal-dialog" role="document">';
				html += '<div class="modal-body">';
				html += '<div class="modal-header">';
				html += '<h1 class="modal-title"></h1>';
				html += '</div>';
				html += '<div class="modal-content">';
				html += '</div>';
				html += '<div class="modal-footer">';
				html += '</div>';
				html += '</div>';
				html += '</div>';
				html += '<div class="dimmed"></div>';
				html += '</div>';
			} else if (modalType == 'full') {
				html += '<div class="modal-full" id="' + modalId + '" role="dialog" aria-modal="true">';
				html += '<div class="modal-body">';
				html += '<div class="modal-header">';
				html += '<h1 class="modal-title"></h1>';
				html += '</div>';
				html += '<div class="modal-content" role="document">';
				html += '</div>';
				html += '<button type="button" class="btn-close">';
				html += '<span class="ico-close">팝업 닫기</span>';
				html += '</button>';
				html += '</div>';
				html += '</div>';
			}

			$('body').append(html);
		}

		$(modal).find('.modal-title').html(param.title);
		$(modal).find('.modal-content').html(param.content);
		$(modal).find('.modal-footer').html(button);

		$(modal).find('.modal-footer').children().click(function () {
			$(modal).hide();
			if (!($('.modal-full:visible').length > 0 && $(modal).hasClass('modal-overlay')) && (UI.isAllLayerPopupHide())) {
				$('body').removeClass('js-noscroll');
			}
		});

		//닫기버튼
		$(modal + ' .modal-body .btn-close').on('click', function (e) {
			if (!($('.modal-full:visible').length > 0 && $(modal).hasClass('modal-overlay')) && (UI.isAllLayerPopupHide())) {
				$('body').removeClass('js-noscroll');
			}
			//IOS modal-full 대응
			if ($('body').css('position') == 'fixed') {
				var top = -$('body').offset().top;
				$('body').css({
					position: '',
					top: '',
					left: '',
					right: '',
					bottom: ''
				});
				$(window).scrollTop(top);
			}
			$(modal).hide();

		});

		//dimmed
		$(modal).not('.modal-full, .popup').has('.modal-body').click(function (e) {
			if (!$('.modal-body').has(e.target).length) {
				if (!($('.modal-full:visible').length > 0 && $(modal).hasClass('modal-overlay')) && (UI.isAllLayerPopupHide())) {
					$('body').removeClass('js-noscroll');
				}
				$(modal).hide();
			}
		});

		//popup레이어3개 개별 닫힘 처리
		$('.popup-major-guide .btn-close, .popup-imei .btn-close, .popup-model-sn  .btn-close').on('click', function () {
			$('body').removeClass('js-noscroll');
			//IOS modal-full 대응
			if ($('body').css('position') == 'fixed') {
				var top = -$('body').offset().top;
				$('body').css({
					position: '',
					top: '',
					left: '',
					right: '',
					bottom: ''
				});
				$(window).scrollTop(top);
			}

			$(modal).hide();
		});

		if (param.callBack) {
			param.callBack(modal, param);
		}


		$('body').addClass('js-noscroll');
		//IOS스크롤방지
		// $(modal + '.modal, ' + modal + ' .dimmed').on('touchmove', function (e) {
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// });
		$(modal).show();

		//IOS modal-full 대응
		if (UI.getDevice() == 'iPhone' && ($(modal).is('.popup') || $(modal).is('.modal-full'))) {
			//if($(modal).is('.popup') || $(modal).is('.modal-full')){
			$('body').css({
				position: 'fixed',
				top: -$(modal).offset().top,
				left: 0,
				right: 0,
				bottom: 0
			});
		}
	},
	modalAll: function () {
		$('[data-modal]').modal();
	},
	isAllLayerPopupHide: function () {
		var $popup = $('.popup');
		var isAllHide = true;

		$popup.each(function () {
			if (!($(this).is(':hidden'))) {
				isAllHide = false;

				return false;
			}
		})

		return isAllHide;
	},
	modalClose: function (_this) {
		var modal = $(_this).closest('.popup, .modal-full');

		$(modal).hide();
		if (UI.isAllLayerPopupHide()) {
			$('body').removeClass('js-noscroll');
		}

		//IOS modal-full 대응
		if (($('body').css('position') == 'fixed') && UI.isAllLayerPopupHide()) {
			var top = -$('body').offset().top;
			$('body').css({
				position: '',
				top: '',
				left: '',
				right: '',
				bottom: ''
			});
			$(window).scrollTop(top);
		}
	},
	copyToClipboard: function (val) {
		val = val == undefined ? location.href : val;
		//var clipboardData;

		if (this.getBrowser().name == 'chrome') {
			var t = document.createElement("textarea");
			document.body.appendChild(t);
			t.value = val;
			t.select();
			document.execCommand('copy');
			document.body.removeChild(t);
		} else if (this.getBrowser().name == 'firefox') {
			var t = document.createElement("a");
			document.body.appendChild(t);
			t.text = val;
			var range = document.createRange();
			range.selectNode(t);
			window.getSelection().addRange(range);
			document.execCommand('copy');
			window.getSelection().removeAllRanges();
		} else if (this.getBrowser().name == 'safari') {
			//window.prompt('아래의 URL을 길게 누르면 복사할 수 있습니다.', val);
			alert('URL을 길게 누르면 복사할 수 있습니다.');
			$('.url-copy a').focus();

		} else {
			window.clipboardData.setData("Text", val);
		}

		if (this.getBrowser().name != 'safari') {
			alert('주소가 복사되었습니다.\n원하는 곳에 붙여넣기 해주세요.');
		}
	},
	setMobileNumberKeyPad: function (obj) {
		obj = obj ? obj : 'input[type=number]';
		//IOS 키패드
		$(obj).attr('pattern', '[0-9]*').attr('inputmode', 'numeric');
	},
	global: function () {
		/* ===============================================================
		Form
		================================================================*/
		//우편번호 조회 팝업에서 input 텍스트 입력시 검색어 삭제 버튼 UI
		if ($('.c-input input').val()) {
			$('.c-input .btn-delete').show();
		}

		$('.c-input input').on('input', function () {
			$('.c-input .btn-delete').toggle(!!this.value);
		});

		$('.c-input .btn-delete').on('touchstart click', function () {
			$('.c-input input').val('').trigger('input');
			$('.auto_complete_layer').hide();/* 20211118추가 */
		});

		$('.dropdown-toggle').on('click', function () {
			var $targetElem = $(this).parents('.dropdown');
			$targetElem.toggleClass('active');

			if ($targetElem.hasClass('active')) {
				$(this).find('.g-invisible').text('접어두기');
				$(this).attr('aria-expanded', true)
			} else {
				$(this).find('.g-invisible').text('펼쳐보기');
				$(this).attr('aria-expanded', false)
			}
		});

		//동의하기
		//$checkAllInput.on('change', function() {
		$(document).on('change', '.agree-item.check-all .c-ick input', function () {
			var $checkSingle = $(this).parents('.agree-area').find('.agree-list .c-ick input');
			if (this.checked) {
				$checkSingle.each(function () {
					this.checked = true;
				});
			} else {
				$checkSingle.each(function () {
					this.checked = false;
				});
			}

			checkMainAgree(this);
		});

		//$checkSingle.on('click', function () {
		$(document).off('click.agreement').on('click.agreement', '.agree-area:has(.agree-item.check-all .c-ick input) .agree-list .c-ick input', function () {
			var $checkAllInput = $(".agree-item.check-all .c-ick input");
			var $checkSingle = $checkAllInput.parents('.agree-area').find('.agree-list .c-ick input');
			var requiredTermsArray = Array.prototype.slice.call($('.agree-checkbox').not('.agree-checkbox:first'));
			var $advertisingReceptionTerm = $('#chk_agree222');

			if ($(this).attr('id') === 'chk_agree222' && !requiredTermsArray.some(function (element) {
					return element['checked'];
				})) {
				alert("'혜택 제공을 위한 제3자 제공(재제공), 처리위탁 모두 동의 (선택)' 약관에 먼저 동의해주세요.");
				return false;
			}

			if ($(this).is(":checked")) {
				var $isAllChecked = 0;

				$checkSingle.each(function () {
					if (!this.checked) {
						$isAllChecked = 1;
					}
				});

				if ($isAllChecked == 0) {
					//개별 input 전체 체크시
					$checkAllInput.prop("checked", true);
				}
			} else {
				//개별 input 체크 해제시
				$checkAllInput.prop("checked", false);
			}

			if ($(this).parents('.agree-item').hasClass('check-all-native')) {
				checkLowerAgree();
				if (!$(this).prop('checked')) {
					$advertisingReceptionTerm.prop('checked', false);
				}
			}
		});

		//하위약관 전체동의 기본체크박스 
		$(document).on('click', '.check-all-native .agree-checkbox', function (e) {
			var $checkAgreeAll = $('.agree-checkbox:first');
			var $checkUpperAgreeItem = $('.check-all-native .c-ick');
			var $checkAgreeItem = $('.agree-checkbox').not('.agree-checkbox:first');
			var requiredTermsArray = Array.prototype.slice.call($checkAgreeItem);
			var $advertisingReceptionTerm = $('#chk_agree222');

			//전체동의 체크박스 클릭 시
			if ($(this).get(0) === $checkAgreeAll.get(0)) {
				if ($(this).prop('checked')) {

					$checkAgreeItem.each(function () {
						$(this).prop('checked', true);
					});

					$checkUpperAgreeItem.children('input:checkbox').prop('checked', true);
				} else {
					$checkAgreeItem.each(function () {
						$(this).prop('checked', false);
					});

					$checkUpperAgreeItem.children('input:checkbox').prop('checked', false);
					$advertisingReceptionTerm.prop('checked', false);
				}
			}
			//개별동의 항목 체크박스 클릭 시
			else {
				$checkAgreeItem.each(function () {
					if ($(this).prop('checked')) {
						$checkUpperAgreeItem.children('input:checkbox').prop('checked', true);
					} else {
						if (requiredTermsArray.every(function (element) {
								return !element['checked'];
							})) {
							$advertisingReceptionTerm.prop('checked', false);
						}
						$checkAgreeAll.prop('checked', false);
						$checkUpperAgreeItem.children('input:checkbox').prop('checked', false);

						return false;
					}
					$checkAgreeAll.prop('checked', true);
				});
			}

			checkMainAgree();
		});

		//상위약관전체동의 > 개별약관(.agree-list > .agree-item) 순회 함수
		function checkMainAgree($eachLowerAgreeItem) {
			var $checkAgreeAll = $('.check-all .c-ick');
			var $eachAgreeItemCheckbox = $('.agree-list .agree-item .c-ick');
			var $checkLowerAgreeAll = $('.lower-check-all');
			var $checkLowerAgreeItem = $('.agree-checkbox').not('.agree-checkbox:first');
			var $agreeItemCheckbox = $('.check-all-native .c-ick');

			$eachAgreeItemCheckbox.each(function () {
				if (!$(this).children('input:checkbox').prop('checked')) {
					$checkAgreeAll.children('input:checkbox').prop('checked', false);

					return false;
				}

				$checkAgreeAll.children('input:checkbox').prop('checked', true);
			});

			if ($agreeItemCheckbox.children('input:checkbox').prop('checked')) {
				if (!$checkLowerAgreeAll.prop('checked')) {
					$checkLowerAgreeAll.prop('checked', true);

					$checkLowerAgreeItem.filter(function () {
						return !$(this).prop('checked');
					}).each(function () {
						$(this).prop('checked', true);
					});
				}
			} else {
				$checkLowerAgreeAll.prop('checked', false);
				if (!($eachLowerAgreeItem === undefined)) {
					$checkLowerAgreeItem.each(function () {
						$(this).prop('checked', false);
					});
				}
			}
		}

		//하위약관전체동의 체크/비체크
		function checkLowerAgree() {
			var $lowerAgreeTrigger = $('.check-all-native .c-ick input:checkbox');
			var $lowerAgreeItems = $('.agree-checkbox');

			if ($lowerAgreeTrigger.prop('checked')) {
				$lowerAgreeItems.each(function () {
					$(this).prop('checked', true);
				});
			} else {
				$lowerAgreeItems.each(function () {
					$(this).prop('checked', false);
				});
			}
		}

		//$checkAllFold.on('click', function () {
		$(document).on('click', '.btn-trigger-all', function () {
			var $checkAllFold = $('.btn-trigger-all');
			var $checkSingleFold = $('.btn-trigger');
			var $agreeItem = $checkSingleFold.parents('.agree-item');
			var $checkAllBtn = $(this).parents('.agree-item.check-all');
			var $checkAllList = $checkAllBtn.next('.agree-list');

			$checkAllBtn.toggleClass('active');
			$checkAllFold.attr('aria-expanded',
				$checkAllFold.attr('aria-expanded') == 'false' ? 'true' : 'false'
			);
			$checkAllList.toggle();

			if ($checkAllList.children('.agree-item').length < 3) {
				$agreeItem.addClass('active');
				$checkSingleFold.attr('aria-expanded',
					$checkSingleFold.attr('aria-expanded') == 'false' ? 'true' : 'false'
				);
			}
		});

		function triggerGroup($btnTrigger, $parentEl) {
			//$($btnTrigger).on('click', function () {
			$(document).on('click', $btnTrigger, function () {
				if ($parentEl.length) {
					var $this = $(this);
					var $parentCur = $this.closest($parentEl);

					//console.log($parentCur);

					$parentCur.toggleClass('active');
					$this.attr('aria-expanded',
						$this.attr('aria-expanded') == 'false' ? 'true' : 'false'
					);
				}
			});
		}
		triggerGroup('.agree-area .btn-trigger', '.agree-item');
		triggerGroup('.spot-body .btn-trigger', '.spot-panel');

		/* ===============================================================
		Layout
		================================================================*/
		//home
		$('.gnb-btn-hamburger').on('click', function () {
			$('.gnb-drawer').toggleClass('active');
			$('body').toggleClass('js-noscroll');
		});

		$('.gnb-drawer .btn-close').on('click', function () {
			$('.gnb-drawer').toggleClass('active');
			$('body').toggleClass('js-noscroll');
		});

		/*$('.gnb-btn-search').on('click', function() {
			$('.gnb-search').toggleClass('active');
			$('body').toggleClass('js-noscroll');
		});
		*/
		$('.gnb-drawer .main-item.has-sub > .link-block').on('click', function () {
			$(this).closest('.gnb-drawer .main-item.has-sub').toggleClass('active');
		});

		$('.lnb .lnb-item, .tab-list .tab-list-item').on('click', function () {
			$(this).children('.link-block').attr('aria-current', 'page');
			$(this).siblings().children('.link-block').removeAttr('aria-current');
		});

		/* 요금계산기 */
		$('.product-wrap .title-field').on('click', function () {
			$(this).parent().toggleClass('active');
		});

		$('.product-wrap .select-item').on('click', function () {
			var f_da = $(this).find('label .title').html();
			if ($(this).find('input:radio:checked').val() != undefined) {
				$(this).parent().parent().find('.title-field .select-txt').html(f_da).addClass('active');
			} else {
				$(this).parent().parent().find('.title-field .select-txt').html('선택하세요.').removeClass('active');
			}
		});
		/* //요금계산기 */

		/* 보헙가입하기 */
		$('.insurance-wrap .title-field').on('click', function () {
			$(this).parent().toggleClass('active');
		});

		$('.purchasing-insurance-area .agree-title2').on('click', function () {
			$(this).parent().toggleClass('active');
		});
		/* //보험가입하기  */

		/* IMEI 확인방법 */
		$('.fold-area .btn-toggle').on('click', function () {
			$(this).closest('.fold-item').siblings('.fold-item').removeClass('active');
			$(this).closest('.fold-item').toggleClass('active');
		});
		// 일련번호 '확인방법' 내용 열고/ 닫음
		$('.serial-number-way .title', $('.seller-cont-area')).on('click', function () {
			$(this).parent().toggleClass('active');
		});

		/* 체크포인트 확인방법 */
		$('.checkpoint-area .title-field').on('click', function () {
			$(this).parent().toggleClass('active');
			$('.checkpoint-area .checkpoint-item').not($(this).parent('.checkpoint-item')).removeClass('active').find('button').attr('aria-expanded', false);
		});

		/* 매장검색-지하철노선별(2021.10.18) */
		$('.subway .result-field .subway-field').on('click', function () {
			$(this).parent().toggleClass('active');
			$('.subway .area-result .result-field').not($(this).parent('.result-field')).removeClass('active');
		});

		/* 매장검색-지역별(2021.10.18) */
		$('.pop-shop-detail .seller-tab-wrap .tab-item').on('click', function () {
			// window.scrollTo(0, -200);
			var idx_tab = $(this).index();

			if(idx_tab == '0'){
				$('html,body').css('oveflow','auto');
				$('.popup.pop-seller.pop-shop-detail .popup-content').removeClass('active');
			} 
			if(idx_tab == '1'){
				$('html,body').css('oveflow','hidden');
				$('.popup.pop-seller.pop-shop-detail .popup-content').addClass('active'); 
			}
		});

		/* 매장검색-지하철노선별(2021.10.18) */
		var window_h = $(window).height();
 		var top_tl_h = $('.popup-header').height();
		var shop_tl_h = $('.shop-title').height();
		var tab_tl_h = $('.seller-tab-wrap').height();
		var footer_h = $('.popup-footer').height();
		var map_h = window_h - (top_tl_h+shop_tl_h+tab_tl_h+95)

		$('.pop-shop-detail .shop-detail-map').css('height', map_h)



		//product list
		$('.filter-group .label').on('click', function () {
			$(this).parent().parent().siblings().removeClass('active');
			$(this).parent().parent().toggleClass('active');
		});

		//##NOTUSE .label을 사용하지 않은 상태
		$('.disclosure-check-area .label').on('click', function () {
			$('.disclosure-check-area').toggleClass('active');
		});

		$('.disclosure-notice-area .label').on('click', function () {
			$(this).parent().parent().toggleClass("active");
			if ($(this).parent().parent().hasClass('active')) {
				$('main.content').css('padding-bottom', '27rem');
			} else {
				$('main.content').css('padding-bottom', '5rem');
			}
			//$(window).scrollTop($(document).height() - $(window).outerHeight());
		});

		$('.notice-panel .btn-delete').on('click', function () {
			$(this).parent().parent().hide();
		});

		// 상품상세 더보기
		$('.product-detail-wrap .btn-more-product').on('click', function () {
			$('.product-detail.fewer').removeClass('fewer');
			$(this).remove();
		});
		//주문하기
		$('.layer-pay .btn-toggle-pay').on('click', function () {
			$(this).parent().toggleClass('active');

			$('.content').css('padding-bottom', $(this).parent().outerHeight());
		});
		if ($('.sticky-bar').length > 0) {
			//플로팅 스크롤방지
			$(document).on('touchmove', function (e) {
				var isSticky = $('.sticky-bar').has(e.target).length;
				if (isSticky) {
					$('body').css({
						'overflow': 'hidden'
						
					});
				} else {
					$('body').css({
						'overflow': 'auto',
					
					});
				}
			});
		}

		//모바일상세-이용방법
		$('.product-options #_payType12,.product-options #_payType24,.product-options #_payType30').on('click', function () {
			$('#_layerPayTypeSingle').hide();
			$('#_layerPayType').show();
		});

		$('.product-options #_payTypeSingle').on('click', function () {
			$('#_layerPayType').hide();
			$('#_layerPayTypeSingle').show();
		});

		//문의 접기/펴기
		$('.c-inquiry .btn-toggle-inquiry').on('click', function () {
			$(this).parent().parent().toggleClass('fold');
		});

		// 바로픽업 매장검색
		$('.agent-search-result .group-head .btn-toggle').on('click', function () {
			$(this).parent().parent().toggleClass('fold');
		});

		//공시지원금-상세검색
		$('.js-view-search, .review-filter .btn-filter').on('click', function () {
			$('.search-detail-area').show();
			$('body').addClass('js-noscroll');
		});

		$('.search-detail-area .btn-close').on('click', function () {
			$('.search-detail-area').hide();
			$('body').removeClass('js-noscroll');
			$('.filter-group.vendor.active').removeClass('active');
		});

		// 구매후기 필터
		$('#_filterReviewCategory input').on('click', function () {
			if ($('#_filterCategory1').is(':checked')) {
				$('#_filterReviewDelivery').show();
			} else {
				$('#_filterReviewDelivery').hide();
			}
		});

		//부가서비스 가입하기
		$('.popup-optional-service .btn-trigger-all').on('click', function () {
			var $thisHeading = $(this).parents('.h-area');

			//console.log($thisHeading);

			$thisHeading.toggleClass('active');

			if ($thisHeading.hasClass('active')) {
				$thisHeading.next('.service-area').show();

			} else {
				$thisHeading.next('.service-area').hide();
			}
		});

		// 쇼핑가이드
		$('.c-review .btn-toggle-review').on('click', function () {
			$(this).parent().parent().toggleClass('fold');
		});

		$('.my-item .delivery-info .status').on('click', function () {
			//console.log($(this));
			if ($(this).hasClass('unfold')) {
				$(this).addClass('fold');
				$(this).removeClass('unfold');
			} else if ($(this).hasClass('fold')) {
				$(this).addClass('unfold');
				$(this).removeClass('fold');
			}
		});

		$('.precautions-field .tit .label').on('click', function () {
			//console.log($(this).parents('.tit').next('.con'));

			var $this = $(this).parents('.tit');
			var $next = $(this).parents('.tit').next('.con');
			$this.toggleClass('fold');
			//$next.toggleClass('js-hide');
		});

		//반품안내
		$('.return-info .label').on('click', function () {
			$(this).parent().parent().toggleClass("active");
		});

		//요금제 선택하기 - Data 인피니티
		$('.popup-rate-list #_dtInfPnl1').show();

		$('#_dtInf1').on('change', function () {
			$('.popup-rate-list .folded-panel').hide();
			$('.popup-rate-list #_dtInfPnl1').show();
		});

		$('#_dtInf2').on('change', function () {
			$('.popup-rate-list .folded-panel').hide();
			$('.popup-rate-list #_dtInfPnl2').show();
		});

		$('#_dtInf3').on('change', function () {
			$('.popup-rate-list .folded-panel').hide();
			$('.popup-rate-list #_dtInfPnl3').show();
		});

		//요금제 선택하기 - 5GX 프라임
		$('.popup-rate-list #_fgPrmPnl1').show();

		$('#_fgPrm1').on('change', function () {
			if (this.checked) {
				$('.popup-rate-list .fg-prm-optional .folded-panel').hide();
				$('.popup-rate-list #_fgPrmPnl1').show();
			}
		});

		$('#_fgPrm2').on('change', function () {
			if (this.checked) {
				$('.popup-rate-list .fg-prm-optional .folded-panel').hide();
				$('.popup-rate-list #_fgPrmPnl2').show();
			}
		});

		$('#_fgPrm3').on('change', function () {
			if (this.checked) {
				$('.popup-rate-list .fg-prm-optional .folded-panel').hide();
				$('.popup-rate-list #_fgPrmPnl3').show();
			}
		});

		/* ===============================================================
		//구매프로세스
		================================================================*/
		$('.sticky-top .btn-trigger').on('click', function () {
			var navbarHeight = $('.sticky-top').outerHeight();
			$('main.content').css('padding-top', navbarHeight);
			//console.log(navbarHeight);
		});

		$('.purchase-page .spot-panel .btn-trigger').on('click', function () {
			$('.purchase-page .spot-panel').toggleClass('active');
		});

		//요금안내서 수신방법 > 다회선 통합청구 체크시 노출/해제
		$('#_receiveMethod').on('change', function () {
			if (this.checked) {
				$('.bill-method .expand-group').show();
			} else {
				$('.bill-method .expand-group').hide();
			}
		});

		//요금안내서 수신방법 > 우편 요금안내서 선택시 노출
		$('#_receiveBills').on('change', function () {
			if ($('#_receiveBills').val() == 'opt5') {
				$('.bill-panel .buyer-item.v5').show();
			} else {
				$('.bill-panel .buyer-item.v5').hide();
			}
		});

		//usim
		function usim() {
			if ($('#_optionUsimV1').is(':checked')) {
				$('.usim-expand.v1').show();
				$('.usim-expand.v2').hide();
			} else if ($('#_optionUsimV2').is(':checked')) {
				$('.usim-expand.v1').hide();
				$('.usim-expand.v2').show();
			}
		}
		usim();

		$('.usim-panel .c-ick-var input').on('change', function () {
			usim();
		});

		$('#_usimDlvrEdt').on('click', function () {
			$('.usim-panel .delivery-info').hide();
			$('.usim-panel .delivery-edit').show();
		});

		//아코디언
		$('.popup .order-detail-area:not(.not-accordion) .tit').first().addClass('active');
		$(document).on('click', '.popup .order-detail-area:not(.not-accordion) .tit', function () {
			$(this).siblings('.tit').removeClass('active');
			$(this).toggleClass('active');
		});

		$('.popup .list-reservation .tit-item').first().addClass('active');
		$(document).on('click', '.popup .list-reservation .tit-item', function () {
			$(this).parent('.item-reservation').siblings().find('.tit-item').removeClass('active');
			$(this).toggleClass('active');
		});

		//not 아코디언
		$('.popup .order-detail-area.not-accordion .tit').addClass('active');
		$(document).on('click', '.popup .order-detail-area.not-accordion .tit', function () {
			$(this).toggleClass('active');
		});

		//구매팁 반품
		$('.shopguide-return2-warp .tab-item a').on('click', function () {
			var PageBtnData = $(this).attr('href');
			$('.shopguide-return2-warp .txt-field-warp').removeClass('on');
			$(PageBtnData).addClass('on')
			$('.shopguide-return2-warp .tab-item').removeClass('on');
			$(this).parent().addClass('on');
		});

		//구매팁 설정
		$('.shopguide-setting-warp .tab-item a').on('click', function () {
			var PageBtnData = $(this).attr('href');
			$('.shopguide-setting-warp .txt-field-warp').removeClass('on');
			$(PageBtnData).addClass('on')
			$('.shopguide-setting-warp .tab-item').removeClass('on');
			$(this).parent().addClass('on');
		});

		//구매팁 가입유형 번호이동
		$('.purchase-tip-wrap .btn-trigger').on('click', function () {
			$(this).parents('.trigger-wrap').toggleClass('active');
		});

		//이것이 궁금해요 아코디언
		$('.h-type.question').on('click', function () {
			var $thisItem = $(this).parent('.item-accordion');
			var $thisList = $thisItem.parent('.list-accordion');

			if ($thisItem.hasClass('opened')) {
				$thisItem.removeClass('opened');
			} else {
				$thisList.find('.item-accordion.opened').removeClass('opened');
				$thisItem.addClass('opened');
				$('html, body').scrollTop($thisItem.offset().top);
			}
		});
		$('.link-accordion').on('click', function () {
			$('#exchange-answer').trigger('click');
		});

		//라디오 unchecked
		$('input[data-radio=unchecked]:radio').click(function () {
			var thisName = $(this).attr('name');
			var thisGroup = $('input[name=' + thisName + '][data-radio=unchecked]:radio');
			var index = thisGroup.index(this);

			if ($(this).is('input[data-radio=unchecked]:radio')) {
				if ($(this).data('radio-chckedindex') == index) {
					$(this).prop('checked', false);
					$(this).parent().removeClass('checked');
					thisGroup.removeData('radio-chckedindex');
				} else {
					thisGroup.data('radio-chckedindex', index);
				}
				//console.log($(this).data('radio-chckedindex'));
			}
		});
	},
	componentInitSwipers: function (obj) {
		return obj.find('.swiper-config-pagination.swiper-container').parent().attr('visibility', 'hidden');
	},
	componentBindingEvent: function (obj, callback) {
		UI.componentBindingCallback.callback = callback;
		var result = [];
		//스와이프 타입
		obj.find('.swiper-config-pagination.swiper-container').each(function (index) {
			var _this = this;
			var loop = true;
			var sildeLength = $(this).find('.swiper-slide').length;
			if (sildeLength == 1) {
				loop = false;
				$(_this).find('.swiper-pagination').hide();
				$(_this).find('.swiper-btn-bottom').hide();
			}
			//console.log(sildeLength);
			result.push(
				new Swiper(this, {
					slidesPerView: 1,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					autoplay: {
						delay: 5000,
						disableOnInteraction: false
					},
					loop: loop,
					on: {
						init: function () {
							//console.log('init');
							var swiper = this;
							if ($(_this).parent().css('visibility') == 'hidden') {
								$(_this).parent().hide();
								$(_this).parent().css('visibility', 'visible');
								$(_this).parent().fadeIn();
							}
							UI.componentBindingCallback.swiperInit(swiper);
						},
						imagesReady: function () {

						},
						click: function () {
							var param = $(this.slides[this.activeIndex]).find('[data-tos-click-params]').data('tos-click-params');
							UI.componentBindingCallback.excute(param);
						}
					}
				})
			);

			//autoplay
			result[index].autoplay.stop();
			if ($(_this).find('.swiper-btn-bottom .swiper-btn-play').length > 0 && $(_this).find('.swiper-btn-bottom .swiper-btn-stop').length > 0) {
				result[index].autoplay.start();
				$(_this).find('.swiper-btn-bottom .swiper-btn-play').click(function () {
					$(this).hide().siblings('.swiper-btn-stop').show();
					result[index].autoplay.start();
				});
				$(_this).find('.swiper-btn-bottom .swiper-btn-stop').click(function () {
					$(this).hide().siblings('.swiper-btn-play').show();
					result[index].autoplay.stop();
				});
			}

		});

		//일반타입
		obj.find('.component-binding-event').each(function (index) {
			$(this).find('[data-tos-load-params]:not([data-tos-load-params=""])').each(function () {
				var loadParam = $(this).data('tos-load-params');
				UI.componentBindingCallback.excute(loadParam);
			});

			$(this).find('[data-tos-click-params]:not([data-tos-click-params=""])').click(function () {
				var clickParam = $(this).data('tos-click-params');
				UI.componentBindingCallback.excute(clickParam);
			});

		});

		return result;
	},
	componentBindingCallback: {
		callback: '',
		isExcute: [],
		swiperInit: function (swiper) {
			var param = $(swiper.slides[0]).find('[data-tos-load-params]').data('tos-load-params');
			//console.log(param);
			this.excute(param);
			swiper.on('slideChange', function () {
				var param = $(this.slides[this.activeIndex]).find('[data-tos-load-params]').data('tos-load-params');
				UI.componentBindingCallback.excute(param);
			});
		},
		excute: function (param) {
			if (param && $.inArray(param, this.isExcute) == -1) {
				//console.log(param);
				if ($.isFunction(this.callback)) {
					this.callback(param);
				}
				this.isExcute.push(param);
			}
		}
	}

}

UI.init();
//UI.tabGroup('.tab-menu-wrap','.tab-content-wrap');

/* ===============================================================
 //Modal
 ================================================================*/
/*function modalGroup($modalBtn, $modalOpenGroup) {
	$($modalBtn).on('click', function() {
		$($modalOpenGroup).show();
		$('body').addClass('js-noscroll');
	});
}
*/
//modalGroup('.js-modal-counsel', '.modal-counsel'); 	  						  //modal 상담주문하기
//modalGroup('.js-modal-share', '.modal-share');                          	  //modal SNS공유하기
//modalGroup('.js-modal-agree', '.modal-agree');                          	  //modal 약관동의안내
//modalGroup('.js-modal-notice', '.modal-notice');                        	  //modal 알림
//modalGroup('.js-modal-notice-require', '.modal-notice-require');        	  //modal 알림 : 필수항목
//modalGroup('.js-modal-login-guide', '.modal-login-guide');              	  //modal 로그인안내
//modalGroup('.js-modal-delivery', '.modal-delivery');                    	  //modal 주문하기전확인 : 수령
//modalGroup('.js-modal-delivery2', '.modal-delivery2');                  	  //modal 주문하기전확인 : 입고알림
//modalGroup('.js-modal-trental', '.modal-trental');                      	  //modal T렌탈
//modalGroup('.js-modal-free-service', '.modal-free-service');            	  //modal 부가서비스 가입안내
//modalGroup('.js-modal-optional-service-end', '.modal-optional-service-end');  //modal 부가서비스 가입완료
//modalGroup('.js-modal-discount', '.modal-discount');                    	  //modal 할인방법
//modalGroup('.js-modal-discount2', '.modal-discount2');                  	  //modal 할인종류
//modalGroup('.js-modal-penalty', '.modal-penalty');                      	  //modal 해지위약금안내
//modalGroup('.js-modal-check', '.modal-check');                          	  //modal 유의사항
//modalGroup('.js-modal-compare', '.modal-compare');                      	  //modal 금액비교
//modalGroup('.js-modal-imei', '.modal-imei');                            	  //modal imei
//modalGroup('.review-product .btn-secondary', '.modal-review-write');          //구매후기 작성
//modalGroup('.js-modal-coupon', '.modal-coupon');          					  //modal 쿠폰 사용안내
//modalGroup('.js-modal-device', '.modal-device');          					  //modal 단말확인
//modalGroup('.js-modal-device-fail', '.modal-device-fail');          		  //modal 단말확인 실패
//modalGroup('.js-modal-line-auth', '.modal-line-auth');          		  //회선 인증
//modalGroup('.js-modal-auth', '.modal-auth');          		  //본인 인증
//modalGroup('.js-modal-usim', '.modal-usim');          		  //USIM 카드 일련번호란
//modalGroup('.js-modal-return-usedphone', '.modal-return-usedphone');          		  //알림 : 쓰던 폰 반납 신청완료

// modal
/*$('.modal .js-modal-close, .modal .btn-close,.modal-full .btn-close').on('click', function() {
	$('.modal,.modal-full').hide();
	$('body').removeClass('js-noscroll');
});*/
/* ===============================================================
Library - Swiper
================================================================*/
//메인GNB 스크립트 : 메인페이지에서 실행
/*var swiperLnb = new Swiper('.lnb.swiper-container', {
	slidesPerView: 'auto'
});*/

var swiperSearch = new Swiper('.search-panel .swiper-container', {
	slidesPerView: 'auto',
	spaceBetween: 12,
});

var swiperOffering = new Swiper('.offering-list .swiper-container', {
	slidesPerView: 1,
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	}
});

var swiperRateProduct = new Swiper('.popup-rate-list .swiper-container', {
	slidesPerView: 'auto',
	spaceBetween: 12,
});

var swiperRateProduct2 = new Swiper('.slide-num-wrap .swiper-container', {
	slidesPerView: 1,
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	}
});

//[D] 2023 웹접근성 수정
var KeyVisualCnt = $(".swiper-slide",".product-key-visual .swiper-container").length; // 상품 이미지 갯수
var swiperProductKeyVisual = new Swiper('.product-key-visual .swiper-container', {
	a11y: {
		enabled: false
	},
	pagination: {
      el: '.swiper-pagination',
      clickable: true,
      bulletClass: 'bullet',
      bulletActiveClass: 'active',
      renderBullet: function (index, className) {
        return '<div class="' + className + '" role="presentation" ><button type="button" role="tab" id="banner-swiper' + (index + 1) + '" aria-controls="product-visual-' + (index + 1) + '" aria-lable="'+ (index + 1) +' of '+ KeyVisualCnt + '">' + (index + 1) + '</button></div>';   
      }
    },
  on: {
    slideChange : function(){
      $('.product-key-visual .bullet').find('button').attr('aria-selected', false);
      $('.product-key-visual .bullet.active').find('button').attr('aria-selected', true);
			
      var thisEl = $('.product-key-visual .bullet.active').index();
      $('.product-key-visual .swiper-wrapper .swiper-slide').attr('tabindex', '-1')
      $('.product-key-visual .swiper-wrapper .swiper-slide').eq(thisEl).attr('tabindex', '0');
			
			//[D] 슬라이드 작동 시 aria-hidden 값 세팅
			$(".swiper-slide", $(this.el)).attr("aria-hidden","true");
			$(".swiper-slide", $(this.el)).eq(this.realIndex).attr("aria-hidden","false");
    },
		init : function() {
			//[D] 슬라이드 최초 렌더 시 aria-hidden 값 세팅
			$(".swiper-slide", $(this.el)).attr("aria-hidden","true");
			$(".swiper-slide.swiper-slide-active", $(this.el)).eq(this.realIndex).attr("aria-hidden","false");
		}  
  }  
});
$('.product-key-visual .bullet:first-child').find('button').attr('aria-selected', true);
$('.product-key-visual .bullet:first-child').siblings().find('button').attr('aria-selected', false);

//twd2020 2020-07-07 구매조건비교하기 swiper
var swiperPlanSlider = new Swiper('.plan-slide-wrap .swiper-container', {
	slidesPerView: 'auto',
	spaceBetween: 12,
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},
});

//twd2020 오늘도착 전국배송 swiper
// var swiperDiscountSlider = new Swiper('.discount-panel .swiper-container', {
// 	slidesPerView: 'auto',
// 	spaceBetween: 100,
// 	pagination: {
// 		el: '.swiper-pagination',
// 		clickable: true
// 	},
// });

var swiperNewPlan = new Swiper('.new-plan-panel .swiper-container', {
	slidesPerView: 'auto',
	spaceBetween: 12,
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},
	observer: true
});

//공시지원금 변동 알림
var swiperDisclosure = new Swiper('.disclosure-notice-area .swiper-container', {
	slidesPerView: 'auto'
});

/*$('#_inquiryTextarea, #_reviewTextarea').on('focusout', function(){
	var length = $(this).val().length;
	if(length !=0){
		$(this).addClass('on');
	} else {
		$(this).removeClass('on');
	}
}).on('keyup input paste', function() {
	inputMaxlength($(this), $('#_charNum'));
});
function inputMaxlength($this, $num) {
	var limit = parseInt($this.attr('maxlength'));
	var text = $this.val();
	var chars = text.length;
	if(chars > limit){
		var new_text = text.substr(0, limit);
		$this.val(new_text);
	}
	if(!!$num) {
		$num.html(chars);
	}
}*/

//별점 주기
$('.btn-score1, .btn-score2, .btn-score3, .btn-score4, .btn-score5').on('click', function () {
	var idx = $(".score").data('idx');
	//console.log($(".score").attr("class"));
	if (idx != "") {
		$(".score").removeClass('score' + idx);
	}
	idx = $(this).attr("class").replace(/[^0-9]/g, '');
	$(".score").data('idx', idx);
	$(".score").addClass('score' + idx);
});


//구매프로세스 > T 기프트 배송정보 > 택배 : 수정시 편집영역 노출
$('#_tgiftPrclEdt').on('click', function () {
	$(this).closest('.delivery-info').hide();
	$(this).closest('.delivery-info').next('.delivery-edit').show();
});

//구매프로세스 > T 기프트 배송정보 > 찾아가는 개통 : 수정시 편집영역 노출
$('#_tgiftCmgEdt').on('click', function () {
	$(this).closest('.delivery-info').hide();
	$(this).closest('.delivery-info').next('.delivery-edit').show();
});

//구매프로세스 > T 기프트 배송정보 > 타이틀 뱃지 변경
$('#_tgiftComing1').closest('.c-ick').on('click', function () {
	$(this).closest('.tgift-panel-coming').find('.h-type .badge').replaceWith('<em class="badge">택배</em>');
	$('.tgift-detail').show();
});

$('#_tgiftComing2').closest('.c-ick').on('click', function () {
	$(this).closest('.tgift-panel-coming').find('.h-type .badge').replaceWith('<em class="badge clr3">직접 받기</em>');
	$('.tgift-detail').hide();
});

//상품패키지
$('.popup .join-type-area .tit').on('click', function () {
	$(this).siblings('.tit').removeClass('active');
	$(this).toggleClass('active');
});

//미성년자 첨부파일
$('#_attachedMinor1').on('change', function () {
	if (this.checked) {
		$('.expand-panel.v1').show();
		$('.expand-panel.v2').hide();
	}
});

$('#_attachedMinor2').on('change', function () {
	if (this.checked) {
		$('.expand-panel.v1').hide();
		$('.expand-panel.v2').show();
	}
});

//골드번호
var gold_ui = {
	init: function () {
		if ($('.gold-gate').length) {
			this.$step1__btn = $(".step1__btn").find(".selected-number");
			this.gnRadio();
			this.gnTab();
			this.gnList();
			this.gnMore();
			//this.gnWording();
		}
	},
	gnRadio: function () {
		var self = this;
		$('.gn_radio input[type=radio]').each(function () {
			var $wrap = $(this).closest(".gn_radio");
			$(this).off('change.gn_radio').on('change.gn_radio', function () {
				if ($(this).prop('checked')) {
					$wrap.closest('.gn_type').find(".gn_radio").removeClass('checked');
					$wrap.addClass('checked');
					self.$step1__btn.empty();

					if ($(this).parents('ul').is('.select-type-list') && $('.radio-type .no-data').css('display') == 'block') {
						$(".radio-type .no-data").hide();
						$(".radio-type .radio-type-inner").show();
					}
				}
			});
		});
	},
	gnTab: function () {
		$(".gold-gate .tab__item > a").on('click', function (e) {
			e.preventDefault();
			$(".gold-gate .sec01, .gold-gate .sec02").hide();
			$(this.hash).show();
			$(".gold-gate .tab__item > a").removeClass("on");
			$(this).addClass("on");
		});
	},
	gnList: function () {
		var self = this;
		$(".radio-type-list input[type='radio']").each(function () {
			$(this).off("change.radio-type-list").on("change.radio-type-list", function () {
				if ($(this).prop('checked')) {
					var $labelText = $(this).next().text().split('-').join(" - ");
					self.$step1__btn.html($('<strong>' + $labelText + '</strong>'));
				}
			});
		});
	},
	gnMore: function () {
		$(".select-type__btn").off('click.select-type__btn').on("click.select-type__btn", function () {
			$(".select-type .select-type-list").append('<li><label class="gn_radio"><input type="radio" name="gnNumber" value="5689">5689</label></li>');
			gold_ui.gnRadio();
		});
	},
	gnWording: function () {
		$('.gold-gate .notice-list').children('.dsc-item:first').after('<li class="c-red dsc-item">외국인 고객은 오프라인 대리점/지점에서 신청 가능합니다.</li>');
		$('.gold-gate .notice-list').children('.dsc-item:eq(1)').after('<li class="c-red dsc-item">번호 변경은 오프라인 대리점/지점을 통해서만 취득이 가능합니다.</li>');
		$('.gold-gate .notice-list').children('.dsc-item:eq(2)').after('<li class="c-red dsc-item">만 4세 미만 고객은 신청하실 수 없습니다.</li>');
		$('.gold-gate .notice-list').children('.dsc-item:eq(5)').text('T world 다이렉트를 통해 응모하신 경우 T world 다이렉트를 통해서만 당첨 여부 확인 가능하며, T world 공식인증 대리점 및 지점을 통해 응모하신 경우 T world 공식인증 대리점 및 지점을 통해서만 당첨 여부 확인 가능합니다.');
	}
};
gold_ui.init();

/* 2019-06-10 통합페이 수정 */
//t-pay
$(document).on("change", '.t-pay .pay-type-area .c-ick input[type="radio"]', function () {
	var $ft_btn = $('.t-pay .btn-area button');
	var $c_ick = $('.t-pay .agree-area .c-ick');
	if ($(this).parent().next().is('.agree-area')) {
		$c_ick.removeClass("no-active");
		$ft_btn.addClass("disabled");
		$c_ick.find('input[type="checkbox"]').prop("checked", false);
	} else {
		$c_ick.addClass("no-active");
		$(".t-pay .agree-item").removeClass("active");
		$ft_btn.removeClass("disabled");
	}
});

$(document).on('change', '.t-pay .agree-title .c-ick input[type="checkbox"]', function () {
	var $ft_btn = $('.t-pay .btn-area button');
	if (!$(this).parents(".agree-area").prev().find('input[type="radio"]').is(":checked")) {
		return;
	} else {
		if ($(this).is(":checked")) {
			$ft_btn.removeClass("disabled");
		} else {
			$ft_btn.addClass("disabled");
		}
	}
});
/* 2019-06-10 통합페이 수정 */

//보험 및 부가서비스
$(".recomm-add-srv__filter").on("click", function (e) {
	$(".recomm-srv-filter").show();
	$('body').addClass('js-noscroll');
	e.preventDefault();
});
$(".recomm-srv-filter__close").on("click", function () {
	$(".recomm-srv-filter").hide();
	$('body').removeClass('js-noscroll');
});
$(".recomm-srv-filter__item").find(':radio').on("change", function () {
	var $labelText = $(this).next('label').text();
	$(".recomm-add-srv__filter").text($labelText);
});

//구매팁 외부 링크에 따른 탭 활성화 처리
(function () {
	var url_hash = location.hash;
	var idx = url_hash.substr(url_hash.length - 1);
	if (url_hash.indexOf('qna_tab') != -1) {
		$(".list-icon-tab li").eq(idx - 1).find("a").trigger("click");
	}
})();

//우편번호 팝업 인앱 포커스 오류
$(document).on("blur", ".popup input", function () {
	var scTop = $(window).scrollTop();
	$(window).scrollTop(scTop);
});

$(document).ready(function () {
	if ($('.popup-zipcode').length) {
		var $addr_detail = $('.addr-detail');
		var $addr_tit = $addr_detail.find(".name");
		var $select = $(".c-select select");
		var $btn_more = $(".address-area").find(".btn-more");

		$addr_detail.off('click.addr-detail').on('click.addr-detail', '.name', function (e) {
			var siblingsItems = $(this).closest('li').siblings('li');

			if ($(this).hasClass("is-active")) {
				$(this).removeClass("is-active");
				siblingsItems.show();
			} else {
				$(this).addClass("is-active");
				siblingsItems.hide();
			}
			e.preventDefault();
		});

		$select.off("change.c-select").on("change.c-select", function () {
			$addr_tit.removeClass("is-active");
		});
	}
});

//airpod-coupon footer 
$(".airpod-coupon__b-info-btn").on("click", function () {
	$(this).toggleClass("active");
});

// 카카오채널 전용페이지 푸터영역 추가
$('.for-kakao .layer-pay .btn-toggle-pay').on('click', function () {
	$('.home-footer').css('margin-bottom', $(".layer-pay").outerHeight());
});

//twd2020 구매조건비교하기 고도화

$(function () {
	var comparePop = $('.popup.compare-wrap'); //팝업 공통 클래스 전역 변수
	var compare = $('.wrap.compare-wrap'); //페이지 공통 클래스 전역 변수
	var tdirect_compare = {
		init: function () {
			this.accodion(); //아코디언
			this.plan_accodion(); //요금제 리스트 아코디언
			this.plan_accodion2();
			this.switch_btn(); //스위치 푸시 버튼
			//this.min_height(); //슬라이드 > 혜택 확인하기 높이값 조정
			this.check_icon(); //추가 혜택 아이콘 체크
			//this.has_hr();
			//this.tab_target() //탭 포커스
			//this.check_radio() //체크박스 -> 라디오기능으로
		},
		// tab_target: function () {
		// 	function target_blank(){
		// 		var _offset = $(".compare-tab-wrap").offset();
		// 		$('.target').on('click',function() {
		// 			$('html, body').animate({scrollTop : _offset.top - 40}, 300);
		// 		});
		// 	}
		// 	target_blank();
		// },
		accodion: function () {
			comparePop.each(function () {
				$('.compare-accodion .label').on('click', function () {
					$(this).toggleClass('on');
					$('.push-list').toggleClass('on');
				});
				$('.paytab-list.depth2 button').on('click', function () {
					$('.push-list').addClass('on');
				});
			});
		},
		plan_accodion: function () {
			comparePop.each(function () {
				$(this).find('.cont-area .plan-item .inner').on('click', function () {
					$(this).parents('.plan-item').toggleClass('on');
					$(this).parents('.plan-item').siblings().removeClass('on');
					if ($(this).parents('.plan-item').hasClass('on')) {
						$(this).find('.plan-toggle.toggle').addClass('on');
						$(this).parents('.plan-item').siblings().find('.plan-toggle.toggle').removeClass('on');
						$(this).find('.plan-toggle').addClass('on');
						$(this).parents('.plan-item').siblings().find('.plan-toggle').removeClass('on');
					}
					if ($(this).parents('.plan-item').hasClass('on') == false) {
						$(this).find('.plan-toggle.toggle').addClass('on');
						$(this).find('.plan-toggle').removeClass('on');
					}
				});
			});
		},
		plan_accodion2: function () {
			compare.each(function () {
				$(this).find('.compare-item .plan-list .plan-item .inner').on('click', function () {
					$(this).closest('.plan-item').not('.none-benefits').toggleClass('on');
					$(this).find('.plan-toggle').toggleClass('on');
					$(this).find('.plan-toggle.no-toggle').toggleClass('on');
					if ($(this).closest('.plan-item').hasClass('on')) {
						$(this).parent('.plan-item').find('.btn-toggle').text('접기');
					} else {
						$(this).parent('.plan-item').find('.btn-toggle').text('혜택 자세히보기');
					}
				});
			});
		},
		switch_btn: function () {
			$('.btn-switch-toggle').not('.disabled').on('click', function () {
				$(this).toggleClass('on');
			});
		},
		check_icon: function () {
			$('.compare-item .select-box-item,.cont-area .select-box-item,.plan-box .select-box-item').each(function () {
				$(this).on('click', function () {
					$(this).siblings().removeClass('on');
					$(this).addClass('on');
				});
			});
		},
		// check_radio: function () {
		// 	$('input[type="checkbox"][name="_discountType10"]').click(function(){
		// 		if ($(this).prop('checked')) {
		// 			$('input[type="checkbox"][name="_discountType10"]').prop('checked', false);
		// 			$(this).prop('checked', true);
		// 		}
		// 	});
		// 	$('input[type="checkbox"][name="_discountType11"]').click(function(){
		// 		if ($(this).prop('checked')) {
		// 			$('input[type="checkbox"][name="_discountType10"]').prop('checked', false);
		// 			$(this).prop('checked', true);
		// 		}
		// 	});
		// 	$('input[type="checkbox"][name="_discountType12"]').click(function(){
		// 		if ($(this).prop('checked')) {
		// 			$('input[type="checkbox"][name="_discountType10"]').prop('checked', false);
		// 			$(this).prop('checked', true);
		// 		}
		// 	});
		// },
		// has_hr: function () {
		// 	$('.plan-item .inner').on('click', function () {
		// 		if($(this).find('.hr').hasClass('hide') && $(this).find().hasClass('.icon-list') == false ){
		// 			alert();
		// 			$(this).find('.hr').removeClass('hide');
		// 		}else {
		// 			$(this).find('.hr').addClass('hide');
		// 		}
		// 	});
		// }
	};
	tdirect_compare.init();
});

//twd2020 2020-07-09 다이렉트 호출 처리 
//2020-09-03 스크립트 수정
function min_height() { // 슬라이드 > 혜택 확인하기 높이값 조정
	var def = 0;
	$('.plan-box .info .info-benefits').each(function () {
		var thisHeight = $(this).height();
		if (thisHeight > def) {
			def = thisHeight;
		}
	});
	var topHeight = $('.plan-box').find('.tit').outerHeight() + $('.plan-box').find('.plan-item').outerHeight(true)
	$('.plan-box .info .info-benefits').height(def + 46);
	$('.plan-box.select .info .info-benefits').height(def + topHeight + 46);
}
min_height();

//twd2020 2020-09-23 포커스 스크롤 이동 함수 수정
function target_blank(targetElem) {
	var $target = $(targetElem);
	var $topMenuHeight = $('.header .top-menu').height();
	var SPEED = 300;
	$('html, body').animate({
		scrollTop: $target.offset().top - $topMenuHeight
	}, SPEED);
}

//twd2020 오늘도착 전국배송 고도화
$('.delivery-option-wrap').each(function () {
	var $this = $(this);
	var $tabTitle = $this.find('.tab-title > a');
	var $itemAccordion = $this.find('.item-accordion');
	var $openedArea = $this.find('.opened-area');
	var $btnTrigger = $this.find('.btn-trigger');
	var tabActivateState = false;

	function tabClose() {
		$tabTitle.removeClass('on');
		$openedArea.hide();
	}

	$tabTitle.on('click', function (e) {
		e.preventDefault();
		tabClose();
		$openedArea.filter(this.hash).show();
		$(this).addClass('on');
		$itemAccordion.addClass('opened');
		tabActivateState = true;
	});

	$btnTrigger.on('click', function () {
		if (tabActivateState) {
			tabClose();
			$itemAccordion.removeClass('opened');
			tabActivateState = false;
		} else {
			$tabTitle.eq(0).trigger('click');
			$itemAccordion.addClass('opened');
			tabActivateState = true;
		}
	});
});

$('.immediately-wrap .select-area-wrap select').change(function () {
	var current = $('.immediately-wrap .select-area-wrap select').val();
	if (current != 'null') {
		$('.immediately-wrap .select-area-wrap select').css('color', '#000');
	}
});

/* s: 01-15 수정  */
//seller module
UI.sellerFront = function () {
	var lastScrollTop = 0;
	var delta = 10;
	var throttleTIme = 250;
	var $sellerWrap = $('.seller-wrap');
	var $content = $sellerWrap.find('.content');
	var $stickyBar = $('.sticky-bar');
	var $layerBody = $stickyBar.find('.layer-body');
	var didScrolled = false;

	function throttle(fn, delay) {
		var timer
		return function () {
			if (!timer) {
				timer = setTimeout(function () {
					timer = null;
					fn.apply(this, arguments);
				}, delay)
			}
		}
	}

	function geStickyBarHeight(){
		var stickyHeight = $stickyBar.find('.layer-pay').outerHeight();
		return stickyHeight;
	} 

	function setPaddingBottom(){
		var stickyHeight = geStickyBarHeight();
		$content.css('padding-bottom', stickyHeight);
	}

	function defaultPaddingBottom(){
		$content.css('padding-bottom', 0);
	}

	function showStickyBar(){
		$stickyBar.removeClass('active');
	}

	function hideStickyBar(){
		$stickyBar.addClass('active');
	}

	function showStickyOption(){
		$layerBody.addClass('show');
	}

	function hideStickyOption(){
		$layerBody.removeClass('show');
	} 

	function onScroll() {
		$(window).on('scroll.seller', throttle(hasScrolled, throttleTIme));
		//console.log('on scroll');
	}

	function offScroll() {
		$(window).off('scroll.seller');
		//console.log('off scroll');
	}

	function hasScrolled() {
		var scrollTop = $(window).scrollTop();
		var distanceOffBottom = 50;
		//console.log(`현재 스크롤 탑 : ${scrollTop}` );
		//console.log(`delta 값 : ${delta}` );
		//console.log(`lastScrollTop 값 : ${lastScrollTop}` );
	
		hideStickyOption();

		if (Math.abs(lastScrollTop - scrollTop) <= delta) {
			//console.log('===============================');
			//console.log('스크롤 된 값이 delta 보다 작음');
			//console.log('===============================');
			return;
		}
		if (scrollTop > lastScrollTop) {
			// Scroll Down
			//console.log('===============================');
			//console.log('scroll down 발동!');
			//console.log('===============================');
			
			if (scrollTop + distanceOffBottom >= $(document).height() - $(window).height()) {
				//console.log('스크롤이 끝까지 왔을때');

				//offScroll();
				//showStickyBar();
				
				showStickyOption();
				setPaddingBottom();
				//setTimeout(onScroll, 500);
			}
		} else {
			// Scroll Up
			if (scrollTop + $(window).height() < $(document).height()) {
				//console.log('===============================');
				//console.log('scroll up 발동!');
				//console.log('===============================');
				
				//임시 수정 2022.08.17
				//개발 작업에 따라 수정될수 있음
				showStickyBar();
				//defaultPaddingBottom();
			}
		}
		lastScrollTop = scrollTop;
		didScrolled = true;
		
	}

	onScroll();
	var elmentHookArr = [
		'.seller-plan-item .inner',
		'.discount-types .c-ick-var label',
		'.type-pay-way .c-ick-var label'
	];

	$.each(elmentHookArr, function (idx, item) {
		$(item).each(function () {
			$(this).off('click.selectOpt').on('click.selectOpt', function () {
				$(this).attr('for') === '_payTypeSingle' ? hideStickyOption() : showStickyOption();  
				offScroll();
				setTimeout(function(){
					onScroll();
				}, 1000)
				setPaddingBottom();
			});
		});
	});
	
	$stickyBar.on('click', '.btn-toggle', function (e) {
		var $btnToggleText = $(this).find('.g-invisible');
		if ($layerBody.hasClass('on')) {
			$layerBody.removeClass('on');
      $layerBody.children('.btn-toggle').attr('aria-expanded', false);
			$btnToggleText.text('적용 가입조건 상세보기 열기');
		} else {
			$layerBody.addClass('on');
      $layerBody.children('.btn-toggle').attr('aria-expanded', true);
			$btnToggleText.text('적용 가입조건 상세보기 닫기');
		}
	});
};
$(".seller-wrap").length && UI.sellerFront(); 
/* e: 01-15 수정  */

/* 공통 : input : number only */
$("input:text[numberOnly]").on("keyup", function() {
	$(this).val($(this).val().replace(/[^0-9]/g,""));
});

/* 공통 : input focus scrollTop */
$("input[type='text'], textarea" , ".popup-body .c-input").on("focus", function () {
//alert();
		var $topHeadHeight = $('.header-sub').height();
		var $stickyHeight = $('.sticky-top').height();
		$('html, body').animate({
			scrollTop: $(this).offset().top - $topHeadHeight - $stickyHeight - 40
		}, 400);
	console.log($(this).offset())
	});

	/*공통 : 팝업페이지 나타날 시 일부 모바일 스크롤 이슈  */
	if ( $('.popup').css('display') === 'none') { 
		$('.sticky-bar').addClass('active'); 
	} 



	/* 스크롤시 메뉴 on 22.02.14*/
	var menu_offset = $('.anchor-menu').offset();
	$(window).scroll(function() {
			if ($(document).scrollTop() + 102 > menu_offset.top) {
					$('.anchor-menu').addClass('menu-fixed');			
			}else {
					$('.anchor-menu').removeClass('menu-fixed');
			}
				
			
			var currenScroll = $(document).scrollTop();
			var _con1 = $('.anchor-content1').offset().top;
			var _con2 = $('.anchor-content2').offset().top;       
			var _con3 = $('.anchor-content3').offset().top;
			var _con1H = $('.anchor-content1').height();
			var _con2H = $('.anchor-content2').height();
			var _con3H = $('.anchor-content3').height();
	
			if (currenScroll <= _con1 + _con1H - 45){
				$('.anchor-menu li').removeClass('on');
				$('.anchor-btn1').addClass('on');
			} else if (currenScroll <= _con1 + _con1H + _con2H){
				$('.anchor-menu li').removeClass('on');
				$('.anchor-btn2').addClass('on');
		
			} else if (currenScroll > _con1 + _con1H + _con2H ) {
				$('.anchor-menu li').removeClass('on');
				$('.anchor-btn3').addClass('on');
				
			}
	});

	
	/* 클릭시 해당영역으로 이동 22.02.11 */
	$('.anchor-menu .anchor-btn1').click(function(){
		var ancSpec = $('#anchor-spec').position(); 
		$('html, body').animate({scrollTop : ancSpec.top - 40}, 600);			
    $('.anchor-menu li a').attr('aria-selected', false);	
    $(this).find('a').attr('aria-selected', true);	
	});

	$('.anchor-menu .anchor-btn2').click(function(){
		var ancPoint = $('#anchor-point').position(); 
		$('html, body').animate({scrollTop : ancPoint.top - 40}, 600);
    $('.anchor-menu li a').attr('aria-selected', false);	
    $(this).find('a').attr('aria-selected', true);
	});

	$('.anchor-menu .anchor-btn3').click(function(){
		var ancReview = $('#anchor-review').position(); 
		$('html, body').animate({scrollTop : ancReview.top - 39}, 600);
    $('.anchor-menu li a').attr('aria-selected', false);	
    $(this).find('a').attr('aria-selected', true);
	});


	
	
	/*프로세서 2줄이상 세로 길이 조절 */	
function _txtHeight () {
	$('.processor-txt').each(function(){
		var procTxt = $(this).height();
		if (procTxt > 35) {
			$(this).parents('.fp-item-desc').addClass('long-desc');
			$(this).parents('.fp-item-group').css('position','relative');
		} else {
			$(this).parents('.fp-item-desc').removeClass('long-desc');
		}
	});
}
_txtHeight();
