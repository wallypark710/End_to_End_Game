
var startWord = ['자몽', '원두', '커피', '피아노', '여행'];

var randomIdx = function(arr){
	return parseInt(Math.random()*(arr.length));
}


var initGame = function(target){
	var $space = $('<div></div>').addClass('word').text(target);

	$('.word_space').text('');
	$space.appendTo($('.word_space'));

	// 시간초기화.
}

var confirmWord = function(target, input){
	if( target[target.length-1] === input[0] ){
		return true;
	} else {
		return false;
	}
}



$(document).ready(function(){
	
	var target = startWord[randomIdx(startWord)];
	var cnt = 0;

	initGame(target);
	

	$('.btn').click(function(){
		var inputWord = $('.textbox').val();
		if( confirmWord(target,inputWord) ){
			$('.word').text(inputWord);
			target = inputWord;
		} else {
			console.log("틀렸어");
		}

	});




})