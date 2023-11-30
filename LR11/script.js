$(document).ready(function() {
    var words = [
      { foreign: 'Water', translation: 'Вода' },
      { foreign: 'Work', translation: 'Працювати' },
      { foreign: 'Dance', translation: 'Танцювати' },
      { foreign: 'Fish', translation: 'Риба' },
      { foreign: 'Room', translation: 'Кімната' },
      { foreign: 'Language', translation: 'Мова' },
      { foreign: 'School', translation: 'Школа' },
      { foreign: 'Student', translation: 'Студент' },
      { foreign: 'Life', translation: 'Життя' },
      { foreign: 'Face', translation: 'Обличчя' },
      { foreign: 'Challenge', translation: 'Виклик' },
      { foreign: 'Team', translation: 'Команда' },
      { foreign: 'Skip', translation: 'Пропустити' },
      { foreign: 'Fall', translation: 'Падати' },
      { foreign: 'Basic', translation: 'Основний' },
      { foreign: 'Motivation', translation: 'Мотивація' },
      { foreign: 'Charge', translation: 'Заряджати' },
      { foreign: 'Careful', translation: 'Обережний' },
      { foreign: 'Exercise', translation: 'Вправа' },
      { foreign: 'Reason', translation: 'Причина' },
      { foreign: 'Decision', translation: 'Рішення' },
      { foreign: 'Quality', translation: 'Якість' },
      { foreign: 'Experience', translation: 'Досвід' },
      { foreign: 'Steal', translation: 'Красти' },
      { foreign: 'Success', translation: 'Успіх' }
    ];
  
    $('.start-btn').click(function() {
      var selectedDifficulty = $('#difficulty-select').val();
      var filteredWords = [];
  
      // Фільтрація слів за обраним рівнем складності
      if (selectedDifficulty === 'easy') {
          filteredWords = words.slice(0, 10);
      } else if (selectedDifficulty === 'medium') {
          filteredWords = words.slice(10, 15); 
      } else if (selectedDifficulty === 'hard') {
          filteredWords = words.slice(5);
      }
  
      words = filteredWords;
  
      $('.difficulty').hide();
      $('.flashcard').show();
      $('.progress').show();
  
      displayWord();
  });

    var currentStep = 0;
    var correctCount = 0;
    var incorrectCount = 0;
  
    function getRandomWord() {
      return words[Math.floor(Math.random() * words.length)];
    }
  
    function displayWord() {
      var word = getRandomWord();
      $('.front p').text(word.foreign);
      $('.back input').val('');
    }
  
    function updateProgress() {
      $('.current-step').text(currentStep);
      $('.correct-count').text(correctCount);
      $('.incorrect-count').text(incorrectCount);
    }
  
    function showModal(level) {
      $('.level').text(level);
      $('.modal').css('display', 'block');
    }
  
    $('.check-btn').click(function() {
        var userInput = $('.back input').val().trim().toLowerCase();
        var currentWord = $('.front p').text().trim().toLowerCase();
        var currentTranslation = words.find(word => word.foreign.toLowerCase() === currentWord);
    
        console.log('User input:', userInput);
        console.log('Current word:', currentTranslation.translation.toLowerCase());
    
        if (userInput === currentTranslation.translation.toLowerCase()) {
            correctCount++;
        } else {
            incorrectCount++;
        }
    
        currentStep++;
        updateProgress();
    
        if (currentStep < 10) {
            displayWord();
        } else {
            var level = ''; // Calculate the level based on correctCount, incorrectCount, etc.
            if (correctCount < 5) {
                level = 'A2';
            } else if (correctCount < 8) {
                level = 'B1';
            } else if (correctCount > 8) {
                level = 'C1';
            }
            showModal(level);
            $('.check-btn').prop('disabled', true); // Заблокувати кнопку "перевірити"
            $('.refresh-btn').show(); // Показати кнопку оновлення
        }
    });

    $('.refresh-btn').click(function() {
        currentStep = 0;
        correctCount = 0;
        incorrectCount = 0;
        updateProgress();
        displayWord();
        $('.modal').css('display', 'none');
        $('.check-btn').prop('disabled', false); // Розблокувати кнопку "перевірити"
        $('.refresh-btn').hide(); // Сховати кнопку оновлення
    });

    $('.close-btn').click(function() {
      $('.modal').css('display', 'none');
    });
  
    displayWord();
});