$(function(){
  const HOST = 'http://127.0.0.1:8000/',
  READER = ["1281b6","12cee7","12cee6","12cee4","12cee3","12ce3e","12ce99","12ceb2","12cead","12cee5"],
  TAG = "C94AEC052";
  let socket = io();
  for(var i=0;i<3;i++){
    $.ajax({
      url: HOST + 'demo2/insert',
      type: 'POST',
      data: {
        "set_time": moment().format("YYYY-MM-DD HH:mm:ss"),
        "epc": 'E' + ('0000000' +  Math.floor(Math.random() * 10000000)).slice(-7),
        "tag": ('0000000' +  Math.floor(Math.random() * 10000000)).slice(-7) + TAG,
        "reader": READER[Math.floor(Math.random() * 10)],
      }
    }).done(function(data, textStatus, jqXHR){
      console.log(jqXHR.status);
    }).fail(function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR.status);
    });
  }
  $(document).on('click', (event) =>{
    if(event.target.className.match(/kicker/)){
      socket.emit('update',{
        id: event.target.name,
        size:event.target.value
      });
      $("#row" + event.target.name).remove();
    }
  });

  socket.on('delete row', (data) => {
    $("#row" + data.id).remove();
  });
  socket.on('insert row', (data) => {
    let sizeLabel = ["大型","中型","小型"],
    content = '<tr id="row' + data.id + '">';
    content += '<td>' + data.id + '</td>';
    content += '<td data-label="通過時刻">' + data.set_time + '</td>';
    content += '<td data-label="RFID">' + data.tag + '</td>';
    content += '<td data-label="リーダー">' + data.reader + '</td>';
    content += '<td data-label="サイズ"><div class="btn-group btn-group-sm">';
    for(let i = 0;i < 3;i++){
      content += '<button class="btn btn-outline-secondary kicker" name="' + data.id + '" type="button" value="' + (i + 1) + '">' + sizeLabel[i] + '</button>';
    }
    content += '</div></td></tr>';
    $("#recordTable").append(content);
  });
});

