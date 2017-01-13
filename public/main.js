console.log("May the odds be ever in your favor");

var $readyBtn = $('#ready');
var $challengeDiv = $('#challenges');
var $nextBtn = $('<button>').attr('id','next').text('Next');
var $moarDiv = $('<div>').attr('id', 'moar');
var $secretBtn = $('<button>').attr('id', 'secret').text('Secret');



$readyBtn.on('click', function(evt){
  $.get('/challenges', function(page, status){
    var html = '<ol>';
    page.forEach(function(ind){
      html += '<li>' + ind.body + '</li>';
    })
    html += '</ol>';
    $challengeDiv.append(html);
    $challengeDiv.append($nextBtn);
    $challengeDiv.append($moarDiv);
  })
})

$nextBtn.on('click', function(evt){
  $.get('/challenges?next=true', function(page, status){
      var html = '<ol>';
      page.forEach(function(ind){
        html += '<li>' + ind.body + '</li>';
      })
      html += '</ol>';
      $moarDiv.append(html);
      $moarDiv.append($secretBtn);
  })
})

      //$.ajax({
      //  headers: {
       //   'x-secret': 'shh'
      //  }
      //});

$secretBtn.on('click', function(evt){
  $.ajax({
    url: 'https://mighty-caverns-93139.herokuapp.com/help',
    type: 'GET',
    dataType: 'json',
    beforeSend: function(xlr){xlr.setRequestHeader('x-secret', 'shh');}
  })
  $.ajax({
      url: 'https://mighty-caverns-93139.herokuapp.com/solution',
      type: 'POST',
      dataType: 'json',
      data: {answer: 'cors'},
      beforeSend: function(xlr){xlr.setRequestHeader('x-secret', 'shh');}
  })
})

// $.ajax({
//     url: 'YourRestEndPoint',
//     headers: {
//         'Authorization':'Basic xxxxxxxxxxxxx',
//         'X_CSRF_TOKEN':'xxxxxxxxxxxxxxxxxxxx',
//         'Content-Type':'application/json'
//     },
//     method: 'POST',
//     dataType: 'json',
//     data: YourData,
//     success: function(data){
//       console.log('succes: '+data);
//     }
//   });
