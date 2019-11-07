$(function(){
  const HOST = "http://127.0.0.1:8000/",
  API = HOST + "demo3/search",
  IMAGEPATH = HOST + "images/",
  NOIMG = HOST + "public/img/no-img.png";
  var searchStatus = {
    municipality: '',
    free_word: ''
  };

  ajaxRender(1);
  $('form').submit(function(){
    searchStatus.municipality =$('#municipality').val();
    searchStatus.free_word = $('#freeWord').val();
    ajaxRender(1);
    return false;
  });

  $('ajaxkicker').click(function(e){
    e.preventDefault();
    ajaxRender($(this).attr('title'));
  });

  function ajaxRender(page){
    $.ajax({
      url: API,
      type: 'POST',
      data: {
        "municipality": searchStatus.municipality,
        "free_word": searchStatus.free_word,
        "page": page
      }
    }).done(function(data){
      render(data);
    }).fail(function(data){
      console.log(data);
    });
  }

  function render(data){
    $("#fullCount").html(data.fullCount);
    let lastUpdated = new Date(data.lastUpdated);
    $("#lastUpdated").html(lastUpdated.toLocaleDateString() + "現在");
    $("#hitCount").html(data['hitCount'] + '件');
    renderItems(data['records']);
    pagination(data['page'],data['endPage']);
  }

  function pagination(page,end){
    var ul = $('<ul>'),
    first = parseInt(page) - 2,
    last = parseInt(page) + 2;
    if(first < 1){
      first = 1;
    }
    if(last > end) {
      last = parseInt(end);
    }
    ul.append(renderPager(page - 1, page, end, 'pre'));
    for(var i = first; i <= last; i++){
      ul.append(renderPager(i,page,end));
    }
    ul.append(renderPager(parseInt(page)+1, page, end,'next'));
    $('.pager').empty();
    $('.pager').html(ul);
    $('.ajaxkicker').click(function(e){
      e.preventDefault();
      ajaxRender($(this).attr('title'));
    });
  }

  function renderPager(number, current, end, type){
    var element = $('<li>'),
    link = $('<a>').attr({
      class: 'ajaxkicker',
      href: '#',
    });
    if(type == 'pre'){
      if(number !== 0){
        link.attr('title', number);
        link.html('&lt; 前へ');
        element.append(link);
      }
    }else if(type=='next'){
      if(current != end && current < end){
        link.attr('title', number);
        link.html('次へ &gt;');
        element.append(link);
      }
    }else{
      if(number == current){
        element.attr('class', 'current');
        element.html('<span>' + number + '</span>');
      }else{
        link.attr('title',number);
        link.html(number);
        element.append(link);
      }
    }
    return element;
  }

  function renderItems(list){
    let result = $('div.result-display');
    result.empty();
    if(list.length == 0){
      result.append('<p style="width:100%;text-align:center;font-size:20px;">検索条件に一致する団体が存在しません。</p>');
    }else{
      list.forEach(function(value){
        let card = $('<div>', {"class": "card mb-4 shadow-sm","data-name": value.name,"data-municipality": value.municipality,"data-deputy": value.deputy_name,"data-contact": value.contact,"data-outline": value.outline,"data-expense": value.expense,"data-image_path": value.image_path});
        result.append($('<div class="col-md-4">').append(card.append(renderImage(value),renderBody(value))));
      });
      $(".modal-kicker").on("click", (event) => {
        const card = event.target.closest(".card");
        $("#groupImage").attr("src","/images/" + card.dataset.image_path);
        $("#groupName").text(card.dataset.name);
        $("#modalText1").text(card.dataset.deputy);
        $("#modalText2").text(card.dataset.municipality);
        $("#modalText3").text(card.dataset.contact);
        $("#modalText4").text(card.dataset.outline);
        $("#modalText5").text("￥" + parseInt(card.dataset.expense).toLocaleString());
        $("#detailModal").modal();
      });
    }
  }

  function renderBody(value){
    let p = '<p class="card-text">' + value["name"] + '</p>', buttonDiv = $('<div class="d-flex justify-content-between align-items-center"></div>');
    buttonDiv.append('<button type="button" class="btn btn-sm btn-outline-secondary modal-kicker">詳細</button>');
    return $('<div class="card-body"></div>').append(p,buttonDiv);
  }

  function renderImage(value){
    let link = $('<a class="modal-kicker">');
    return $('<div class="card-image"></div>').append(
      link.append(
        '<img src="' + IMAGEPATH + value["image_path"] + '" alt="group-image">',
        '<div class="card-image-hover-text">詳しく見る</div>'
      )
    );
  }
});

