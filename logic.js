
var startWord = ['자몽', '원두', '커피', '피아노', '여행', '기러기', '컴퓨터'];
var inputArray = [];
var timeKey;
var setTime = 10;
var cnt = 0;
var target;

var isExist = function(str){
	if( inputArray.indexOf(str) !== -1 ){
		var temp = setInterval(function(){
				$('.word').toggle();
			},500);

			setTimeout(function(){
				clearInterval(temp);
			},2400);

		return true;
	}else{
		inputArray.push(str);
		return false;
	}
}

var randomIdx = function(arr){
	return parseInt(Math.random()*(arr.length));
}


var initGame = function(target){
	
	cnt = 0;
	setTime = 10;
	inputArray = [];

	$('.word_space').html('');
	$('.cnt').text('Count Word : ' + cnt);
	$('.timer').text('START');
	var $space = $('<div></div>').addClass('word').text(target);

	$('.word_space').text('');
	$space.appendTo($('.word_space'));
	$('#main, #end').hide();
	
}

var confirmWord = function(tar, input){
	if( tar[tar.length-1] === input[0] && input.length !== 1 ){
		return true;
	} else {

		var temp = setInterval(function(){
				$('.word').toggle();
			},500);

			setTimeout(function(){
				clearInterval(temp);
			},2400);

		return false;
	}
}


var timer = function(){
	
	if( setTime === 0 ){
		console.log("time over");
		clearInterval(timeKey);

		$('#main, #end').toggle();
		$('.status').text("연결한 단어 : " + cnt + " 개");			
	}

	$('.timer').text("남은시간 : " + setTime);
	setTime--;
}

var changeWord = function(input){
	cnt++;
	target = input;
	setTime = 10;

	$('.word').text(input);
	$('.cnt').text('Count Word : ' + cnt);
}

var makeRequest = function(tar){
	var httpRequest = new XMLHttpRequest();
	var result;
	var trueOrFalse = false;

	if( !httpRequest ){
		alert("instance error");
		return false;
	}

	httpRequest.onreadystatechange = function(){
		if( httpRequest.readyState === XMLHttpRequest.DONE ){
			if( httpRequest.status === 200 ) {
				result = httpRequest.responseXML;
				result = result.getElementsByTagName("word")[0];
				if( result !== undefined ){
					trueOrFalse =  true;
				} else {
					trueOrFalse =  false;
				}
				
			} else {
				alert("request error");
			}
		}
	}
	httpRequest.open('POST', 'https://opendict.korean.go.kr/api/search',false);
	httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	var data = '';
	data += 'key=3D4054A465206913B9C5C48C7FCC453D';
	data += '&q=' + tar;
	data += '&type1=word';
	data += '&pos=1';
	httpRequest.send(data);

	if( trueOrFalse ){
		return true;
	}else{
		return false;
	}
}

$(document).ready(function(){
	
	target = startWord[randomIdx(startWord)];
	initGame(target);
	
	$('#introBtn').click(function(){
		$('#intro,#main').toggle();
		timeKey = setInterval(timer,1000);
	});

	$('#mainBtn').click(function(){
		var inputWord = $('.textbox').val();
		
		if( confirmWord(target,inputWord) && !isExist(inputWord) ){
			changeWord(inputWord);
		} else {
			console.log("틀렸어");
		}

		$('.textbox').val('');

	});


	$('.textbox').on('keypress',function(event){
		if(event.keyCode === 13){
			var inputWord = $('.textbox').val();

			if( makeRequest(inputWord) && confirmWord(target,inputWord) && !isExist(inputWord)){
				changeWord(inputWord);	
			} else {
				var temp = setInterval(function(){
						$('.word').toggle();
					},500);

				setTimeout(function(){
						clearInterval(temp);
					},2400);
			}

			$('.textbox').val('');
		}
	});

	$('#endBtn').click(function(){
		target = startWord[randomIdx(startWord)];
		initGame(target);
		$('#main').show();
		$('.textbox').val('');
		timeKey = setInterval(timer,1000);

	})

})