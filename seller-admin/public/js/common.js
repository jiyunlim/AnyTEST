;(function($){
	$(function () {
		formAct();
		tabFixedAct();
		tabMenu();
		toggleTable();
		toggleMenu();
		agreeToggle();
		tooltipToggle();
		moreAct();
		layerAct();
		$('input, textarea').placeholder(); 
		$('[data-model]').keydown(function(key){
			 if(key.keyCode == 13){
	            $(this).addClass('current');
	        }
		});//딤처리레이어팝업 키보드이동
		$('.js-select-layer').keydown(function(key){
			 if(key.keyCode == 13){
		            $(this).addClass('current');
		        }
		});//레이어팝업 키보드이동

		var $fileBox = null;
		fileUpload();
		lnbAct();
		treeAct();
	});
})(jQuery);

/* tab fixed */
function tabFixedAct (){
	$('.js-tab-fixed li a').click(function() {
		$(this).parent().parent().addClass('fixed');
		var top = $($.attr(this, 'href')).length ? $($.attr(this, 'href') ).offset().top : 70;
		$('html, body').animate({
		scrollTop: top - 70
		}, 150);
		if (!$(this).hasClass('on')) {
			$(this).addClass('on').parent('li').siblings('li').find('.on').removeClass('on');
		}
		return false;
	});
	$(window).scroll(function() {
		var scroll = $(window).scrollTop();
		if (scroll >= 50) {
			$('.js-tab-fixed').addClass('fixed');
		} else {
			$('.js-tab-fixed').removeClass('fixed');
		}
	});
}

/* tab toggle */
function tabMenu() {
	$(".tab-con").css("display","none");
	$('.tab-con:first').show();
	$('ul.js-tab-toggle li a' ).click(function() {
		if (!$(this).hasClass('on')) {
			$(this).addClass('on').parent('li').siblings('li').find('a.on').removeClass('on');
			$($(this).attr('href')).show().siblings('.tab-con').hide();
		}
		this.blur();
		return false;
	});
}

/* toggle table */
function toggleTable() {
	var toggleBtn = $('.js-table-toggle .btn-view');
	var toggleTableCon = $('.js-table-toggle .hide-con');
	
	toggleTableCon.hide();
	toggleBtn.click(function(){
		$(this).toggleClass('open');
		$(this).parent().parent().next('.hide-con').toggle();
		if( $(this).text() == '보기' ) {
			$(this).text('닫힘');
			//$(this).addClass('btn-fold').removeClass('btn-unfold');
		} else {
			if ($(this).text() == '닫힘') {
				$(this).text('보기');
				//$(this).addClass('btn-unfold').removeClass('btn-fold');
			}
		}
		return false;
	});
}

/* radio check form */
function formAct() {
	var radioButton = 'input[type=radio]';
	var checkBox = 'input[type=checkbox]';

	/*라디오버튼 클릭시 컨텐츠 활성화*/
	$('.form-group > .c-rdo').each(function(){
		var radioNum = $(this).index();
		$(this).find('>input').click(function(){
			$(this).parent().parent().find('.tab-radio-con').removeClass('open').eq(radioNum).addClass('open');
		});
	});
}

/* layerpopup */
function modalCon(el, a, p, callback, m) {
	var cont = $('#' + el);
	var b = $(window).scrollTop();
	cont.addClass('open');
	cont.attr("tabindex", 0).focus();//접근성포커스
	cont.append('<a href="#none" class="layer-last-focus"></a>');//레이어팝업안에서만 focus 이동하도록하기위함
	
	$('a.layer-last-focus').on('focus', function(){
		setTimeout(function(){cont.focus();}, 10); /*모바일을위한 트릭 시간차를 위해 스크린리더가 캐치할 수 잇도록*/
	});
	$('html, body').addClass('js-noscroll');//부모창스크롤막기
	var layNum = $('.pop-layer.open, .pop-layer.small.open').length;
	if (!a) {
		var btnTop = b;
			cont.attr('data-layer-index',layNum);
		if($('.modal-overlay').length < 1) {
			$('#wrap').append($('<div class="modal-overlay" />'));
		}
		modalPosition(el,p,btnTop,m);
	}
	cont.find('.layer-close, .btn-layer-close').off("click").on("click", function (){
		cont.find('a.layer-last-focus').remove();
		modalClose(el, btnTop, callback, m);
		$('html, body').removeClass('js-noscroll');//부모창스크롤해제
		return false;
	});
}
function modalPosition(el,p,a,m) {
	var cont = $('#' + el);
	var browser_width = $(window).width();
	var browser_height = $(window).height();
	var layer_height = cont.outerHeight();
	var position_top = browser_height / 2;
	var margin_top = layer_height / 2;
	var top = 0;
	cont.css({top: position_top, 'margin-top': -margin_top});
	$(window).scrollTop(top)
}
function modalClose(el, btn, callback,m) {
	$(".current").focus();
	$(".current").removeClass('current');
	var cont = $('#' + el);
	var layNum = $('.pop-layer.open, .pop-layer.small.open').length;
	
	if (typeof callback === 'function') {
		callback.call(cont);
	};
	if(layNum == 1){
		$(".modal-overlay").remove();
	}
	cont.removeAttr('style').removeClass('open');
	if(m === true) $(window).scrollTop(btn)
	
};

/* toggle */
function toggleMenu() {
	$('.toggle-con').hide();
	$('.js-toggle').click(function(){
		$(this).toggleClass('open');
		$($(this).attr('href')).toggle();
		/*$(this).attr('href').find('.layer-close').click(function(){
			$(this).attr('href').css('display','none');
		});
		
		if( $(this).text() == '펼치기' ) {
			$(this).text('접기');
			$(this).addClass('btn-fold').removeClass('btn-unfold');
		} else {
			if ($(this).text() == '접기') {
				$(this).text('펼치기');
				$(this).addClass('btn-unfold').removeClass('btn-fold');
			}
		} 추후사용예정 */
		//return false;
	});
}

/* more */
function moreAct() {
	$('.js-more').click(function(){
		$(this).toggleClass('open');
		$($(this).attr('href')).toggleClass('open');
		return false;
	});
}

/* 셀렉트 레이어팝업 */
function layerAct() {
	var index;
	$('.js-select-layer').click(function(){
		$('.select-layer-area .pop-layer').hide();
		var popCon = $(this).next('.pop-layer');
		index = $('.select-layer-area .pop-layer').index(popCon);
		
		popCon.show();
		popCon.append('<a href="#none" class="layer-last-focus"></a>');
		//$('a.layer-last-focus').on('focus', function(){
		popCon.find('a.layer-last-focus').on('focus', function(){
			setTimeout(function(){popCon.focus();}, 10);//모바일을위한 트릭 시간차를 위해 스크린리더가 캐치할 수 잇도록
		});
		popCon.attr("tabindex", 0).focus();
		popCon.find('.layer-close').click(function(){
			popCon.find('a.layer-last-focus').remove();
			$(".current").focus();
			$(".current").removeClass('current');
			popCon.hide(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
			return false;
		});
		return false;
	});
	/*$('body').click(function(){
		$('.select-layer-area .pop-layer').hide();
		
	});
	$('body .select-layer-area').click(function(){
		$('.select-layer-area .pop-layer').show();
	});*/

	$("body").click(function(e) { 
		var $layer = $(".select-layer-area .pop-layer").eq(index);
		//console.log($layer.has(e.target).length);
		 if($layer.css("display") == "block") {
			  if(!$layer.has(e.target).length) { 
				   $(".select-layer-area .pop-layer").eq(index).hide();
			  } 
		 }
	});
	
	$('.select-layer-area .btn-chk').click(function(){
		$(this).parents('.select-layer-area').find('input[type=checkbox]').prop('checked',true);
	});
	$('.select-layer-area .btn-unchk').click(function(){
		$(this).parents('.select-layer-area').find('input[type=checkbox]').prop('checked',false);
	});
	
}

/* 파일업로드 */
function fileUpload() { 
	$fileBox = $('.c-input-file'); 
	fileLoad(); 
}
function fileLoad() { 
	$.each($fileBox, function(idx){ 
		var $this = $fileBox.eq(idx),
			$btnUpload = $this.find('[type="file"]'),
			$label = $this.find('.file-label'); 
		
		$btnUpload.on('change', function() { 
			var $target = $(this), 
				fileName = $target.val(), 
				$fileText = $target.siblings('.file-name'); 
			$fileText.val(fileName); 
		}) 
		
		$btnUpload.on('focusin focusout', function(e) { 
			e.type == 'focusin' ? 
				$label.addClass('file-focus') : $label.removeClass('file-focus'); 
		}) 
	}) 
}

/* agree */
function agreeToggle() {
	var action = 'click';
	$('.agree-tit-area .agree-tit').on(action, function(){
		var listCon = $(this).parent().next();
		$(this).toggleClass('on');
		listCon.toggle().siblings('.agree-con').hide();
	});
	$('.agree-tit-area-card .agree-tit-card').on(action, function(){
		var listCon = $(this).parent().next();
		$(this).toggleClass('on');
		listCon.toggle().siblings('.agree-con').hide();
	});
}

/* tooltip */
function tooltipToggle() {
	$('.tooltip-con').hide();
	$('.tooltip-area .ico-tooltip').click(function(){
		$(this).next('.tooltip-con').show();
		
	});
	$('.tooltip-close').click(function(){
		$(this).parent('.tooltip-con').hide();
	});
}


/* lnb */
function lnbAct() {
	$('.lnb-nav-area .title').click(function(){
		$(this).next().slideToggle('300').parent().siblings().children('ul').hide();
		$(this).toggleClass('open').toggleClass('close');
	});
	var lnbTit = $('ul.lnb-nav1 > li > a, ul.lnb-nav2 > li > a');
	lnbTit.each(function(){
		if($(this).next('ul').is('.lnb-sub')){
			$(this).addClass('close');
		};
	});
	$(document).on('click', 'ul.lnb-nav1 > li > a, ul.lnb-nav2 > li > a', function(e){
		e.preventDefault();
		//$(this).toggleClass("open").parent().siblings().children('a').removeClass('open');
		var hasSub = $(this).next('ul').is('.lnb-sub');
		//console.log(hasSub);
		if(hasSub){
			$(this).toggleClass('open').toggleClass('close');
			$(this).parent('li').siblings().has('.lnb-sub').children('a').removeClass('open').addClass('close');
			$(this).next().slideToggle('300').parent().siblings().children('ul').hide();
		}else{
			top.location.href = $(this).attr('href');
		}
	});
}

function treeAct() {
	$('ul.display-lnb-nav > li').each(function() {
		if ( $('ul', this).length > 0 ) {
			$(this).addClass('sub');
		}
	});

	var treeMenuOnly = $('ul.display-lnb-nav > li > a:only-child');
	var treeSubMenu = $('ul.display-lnb-nav > li.sub > ul > li > a');
	var treeMenu = $('ul.display-lnb-nav > li.sub > a');

	treeMenuOnly.click(function(){
		$(this).toggleClass("active").parent().siblings().children('a').removeClass('active');
		treeSubMenu.removeClass('active');
	});

	treeSubMenu.click(function(){
		$(this).toggleClass("active").parent().siblings().children('a').removeClass('active');
		$(this).parent().parent().parent().siblings().children('ul').children('li').children('a').removeClass('active');
		treeMenuOnly.removeClass('active');
	});

	treeMenu.click(function(){
		$(this).toggleClass("open");
		$(this).next().slideToggle('300');
	});
}