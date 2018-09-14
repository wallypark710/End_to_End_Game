
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
			},2200);

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

var confirmWord = function(target, input){
	if( target[target.length-1] === input[0] && input.length !== 1 ){
		return true;
	} else {

		var temp = setInterval(function(){
				$('.word').toggle();
			},500);

			setTimeout(function(){
				clearInterval(temp);
			},2200);

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
			
			if( confirmWord(target,inputWord) && !isExist(inputWord) ){
				changeWord(inputWord);
			} else {
				console.log("틀렸어");
			}

			$('.textbox').val('');
		}
	});

	$('#endBtn').click(function(){
		target = startWord[randomIdx(startWord)];
		initGame(target);
		$('#main').show();
		timeKey = setInterval(timer,1000);

	})

})