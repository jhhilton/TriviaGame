(function() {

  var questions = [{
    question: "What is the name of &quot;Team Fortress 2&quot; update, in which it became Free-to-play?",
          choices: ["Pyromania Update",
                    "Mann-Conomy Update",
                    "Engineer Update", "&Uuml;ber Update"],
    correctAnswer: 3
  }, {
    question: "Which of these bones is hardest to break?",
    choices: ["Cranium",
"Humerus",
"Tibia", "Femur"],
    correctAnswer: 3
  }, {
    question: "Which internet company began life as an online bookstore called &#039;Cadabra&#039;?",
    choices: ["Amazon", "eBay",
              "Overstock",
              "Shopify"],
    correctAnswer: 0
  }, {
    question: "Which of these is NOT a province in China?",
    choices: ["Fujian",
              "Sichuan", "Yangtze",
              "Guangdong"],
    correctAnswer: 2
  }, {
    question: "Which company designed the &quot;Betamax&quot; video cassette format?",
    choices: ["Panasonic",
"LG", "Sony",
"Fujitsu"],
    correctAnswer: 2
  }];
  
  var questionCounter = 0; 
  var selections = []; 
  var quiz = $('#quiz'); 
  
  displayNext();
  
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    choose();
    
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  $('#prev').on('click', function (e) {
    e.preventDefault();
  
    choose();
    questionCounter--;
    displayNext();
  });

  $('#start').on('click', function (e) {
    e.preventDefault();
    
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

    function fetch(smth) {
         console.log(smth.results[0].question);
    }
    $(function () {
        $.ajax({
            url: 'https://opentdb.com/api.php?amount=10&type=multiple',
            method: "GET",
            success: function (getResults) {
                fetch(getResults);
            }
        });
    });

  
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] == questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!');
    return score;
  }
})();