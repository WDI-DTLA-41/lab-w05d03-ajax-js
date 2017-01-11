console.log("May the odds be ever in your favor");

var $readyBtn = $('#ready');
var $challengeDiv = $('#challenges');
var $nextBtn = $('<button>').attr('id','next').text('Next');
var $moarDiv = $('<div>').attr('id', 'moar');

$readyBtn.on('click', function(evt){
  $.get('/challenges', function(page, status){
    var html = '<ol>';
    page.forEach(function(ind){
      html += '<li>' + ind.body + '</li>';
    })
    html += '</ol>';
    $challengeDiv.html(html);
    $challengeDiv.append($nextBtn);
    $challengeDiv.append($moarDiv);
  })
})

$nextBtn.on('click', function(evt){
  $.get('/challenges?next=true', function(page, status){
      var html = '<ol>';
      $moarDiv.append(html);
      page.forEach(function(ind){
        html += '<li>' + ind.body + '</li>';
      })
      html += '</ol>';
      $moarDiv.append(html);
  })
})
