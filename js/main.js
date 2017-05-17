var likeN = 0;
var dislikeN = 0;

// var likeBooks = [];
// var dislikeBooks = [];

var LikeDislikeList = [];

var d = new Date();
document.getElementById("Date").innerHTML = d.toDateString();

var inAnimation = false;

var currency_symbols = {
    'USD': '$', // US Dollar
    'EUR': '€', // Euro
    'CRC': '₡', // Costa Rican Colón
    'GBP': '£', // British Pound Sterling
    'ILS': '₪', // Israeli New Sheqel
    'INR': '₹', // Indian Rupee
    'JPY': '¥', // Japanese Yen
    'KRW': '₩', // South Korean Won
    'NGN': '₦', // Nigerian Naira
    'PHP': '₱', // Philippine Peso
    'PLN': 'zł', // Polish Zloty
    'PYG': '₲', // Paraguayan Guarani
    'THB': '฿', // Thai Baht
    'UAH': '₴', // Ukrainian Hryvnia
    'VND': '₫', // Vietnamese Dong
};

function loadData(index, bookDict){
	$bookParent = $(".bookDiv");
	ID = "BookNum" + (index+1);
	var insertBookHTML = `<div class="book col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3" id="` + ID + `">
	<div class="parent">
	<img class="image1 active">					
	<img class="image2 absent">
	<button class="switchImage"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button>
	</div>
	<h2></h2>
	<p class="Author"></p>
	<p class="Description ui-widget-content"></p>
	<p>
	<div class="row">
	<a class="googleBooksLink link1 col-xs-6" target="_blank"><img src="Google_Books_logo.png" width=130px height=50px></a>
	<a class="googlePlayLink link2 col-xs-6" target="_blank"><img src="Google_Play_logo.png" width=130px height=50px></a>
	</div>
	</p>
	</div>`
	$bookParent.append(insertBookHTML);
	if(index==0){
		$("#BookNum1").addClass("active");
	}
	$bookID = $(".book").eq(index);
	if(!("undefined" === typeof bookDict.volumeInfo.imageLinks)){
		$(".image1",$bookID).attr("src",bookDict.volumeInfo.imageLinks.thumbnail);
		$(".image2",$bookID).attr("src",bookDict.volumeInfo.imageLinks.smallThumbnail);
	}	
	$("h2",$bookID).text(bookDict.volumeInfo.title);
	$(".Author",$bookID).text("By: " + bookDict.volumeInfo.authors[0]);
	$(".Description",$bookID).html(bookDict.volumeInfo.description);
	$(".googleBooksLink",$bookID).attr("href", bookDict.volumeInfo.previewLink);
	$(".googlePlayLink",$bookID).attr("href", bookDict.volumeInfo.canonicalVolumeLink);
}

function loadShoppingData(index, bookDict){
	$table = $(".ShoppingCart table");
	ID = "BookNumber" + (index+1);
	var insertTableRowHTML = `<tr id="` + ID + `">
	<td class="itemName"></td>
	<td class="itemImage"><img style="max-height:100px;"></td>
	<td class="author"></td>
	<td class="googlePreview"><a target="_blank"><img src="Google_Books_logo.png" width=65px height=25px></a></td>
	<td class="googlePrice"><label class="unitaryPrice"></label><label class="currency"></label></td>
	<td class="quantity">
	<button class="plus-btn" type="button" name="button">
	<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
	</button>
	<input type="text" name="name" value="0">
	<button class="minus-btn" type="button" name="button">
	<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>
	</button></td>
	<td class="price"><label class="totalBookPrice">0</label><label class="currency"></label></td>
	</tr>`
	$table.append(insertTableRowHTML);
	$trID = $("tr").eq(index+1);
	$(".itemName",$trID).text(bookDict.volumeInfo.title);
	if(!("undefined" === typeof bookDict.volumeInfo.imageLinks)){
		$(".itemImage img",$trID).attr("src",bookDict.volumeInfo.imageLinks.thumbnail);
	}
	$(".author",$trID).text(bookDict.volumeInfo.authors[0]);
	$(".googlePreview a",$trID).attr("href", bookDict.volumeInfo.previewLink);
	if(bookDict.saleInfo.saleability == "FOR_SALE"){
		$(".googlePrice .unitaryPrice",$trID).text(bookDict.saleInfo.retailPrice.amount);
		$(".currency",$trID).text(currency_symbols[bookDict.saleInfo.retailPrice.currencyCode]);
	}else{
		$(".googlePrice .unitaryPrice",$trID).text("Unavailable!");
		$(".quantity",$trID).addClass("hide");
		$(".price",$trID).addClass("hide");
	}	
	
}

var APIkey = "AIzaSyCEb5zro0QNPnPMooqx4s0tMcv04k4YSgc";
var UserID = "117330412869481617595";
var ShelfID = "1001";
var clientID = "883774612498-9qjo0fhi51u9n68vu6do0ebi7gpks352.apps.googleusercontent.com"

$.ajax({
	url:"https://www.googleapis.com/books/v1/users/" + UserID + "/bookshelves/" + ShelfID + "/volumes?key=" + APIkey,
}).done(function(data){
	$.each(data.items,function(index,item){	
		// console.log(item)
		loadData(index,item);
		loadShoppingData(index,item);
	})
});

$(".bookDiv").on("click",".parent button.switchImage", function(){
	$parent = $(this).parents(".parent");
	$present = $parent.find('.active');
	$absent = $parent.find('.absent');
	$present.removeClass('active');
	$present.addClass('absent');
	$absent.removeClass('absent');
	$absent.addClass('active');
}) // this function had to be modified because otherwise it would be called before the switch image button was created in the html element, this way it will still recognize the button even if it is created later

$("#shopping").click(function(){
	if(!inAnimation){
		inAnimation = true;
		$ShoppingCart = $(".ShoppingCart");
		$parent = $(this).parents(".Result");

		$titleList = $(".ShoppingCart table tbody").children("tr").children("td.itemName");
		$.each($titleList,function(index,value){
			// if(likeBooks.indexOf($(value).text())>-1){
			// 	$(value).parents("tr").addClass("active");
			// }
			if(LikeDislikeList[index]=="like"){
				$(value).parents("tr").addClass("active");
			}
		})

		$parent.fadeOut(500, function(){
			$parent.removeClass("active");
			$ShoppingCart.fadeIn(500, function(){
				$ShoppingCart.addClass("active");
				inAnimation = false;
			})	
		})
	}		
});

$(".ShoppingCart").on("click",".minus-btn", function(){
// $(".minus-btn").click(function(e){
	$button = $(this);
	$input = $button.parents(".quantity").children("input");
	var value = parseInt($input.val());
	if(value == 0){ //if quantity is 0, nothing should happen, so the default function shown some lines below will not run
		e.preventDefault();
		return;		
	}
	else{
		value--;
		$input.val(value);		
	}
});

$(".ShoppingCart").on("click",".plus-btn", function(){
// $(".plus-btn").click(function(){
	$button = $(this);
	$input = $button.parents(".quantity").children("input");
	var value = parseInt($input.val());
	value++
	$input.val(value);
});

$(".ShoppingCart").on("click",".minus-btn,.plus-btn", function(){
// $(".plus-btn, .minus-btn").click(function(){
	$button = $(this);
	$input = $button.parents(".quantity").children("input");
	var value = parseInt($input.val());

	$unitaryPrice = $(".unitaryPrice",$button.parent().parent());
	var individualPrice = parseFloat($unitaryPrice.text());
	$price = $button.parent().next().children(".totalBookPrice");
	$price.text(Math.round(value*individualPrice*100)/100);
});

$("#calculateTotal").click(function(){
	$individualPriceArray = $("tr.active td.price .totalBookPrice");
	var total = 0;
	$individualPriceArray.each(function(index,value){
		// console.log(value.textContent)
		total = total + parseFloat(value.textContent);
				
	});
	$("#TotalPrice").text((Math.round(total*100)/100) + $(".currency")[0].textContent);
});

$(function() {
	

	var progressbar = $( "#progressbar" ),
	progressLabel = $( ".progress-label" );

	progressbar.progressbar({
		value: false,
		change: function() {
			progressLabel.text( progressbar.progressbar( "value" ) + "%" );
		},
		complete: function() {
			progressLabel.text( "Complete!" );
		}
	});

	function progress() {
		$allBooks = $(".book");
		$current = $allBooks.parent().find('.book.active');
		var index = $allBooks.index($current);

      if(index == -1){//index não existe na lista
      	progressCount = 100;
      } 
      else{
      	progressCount = ((index)/$allBooks.length)*100;
      }

      progressbar.progressbar( "value", Math.round(progressCount*10)/10 );
  }

  setTimeout( progress, 2000 );


	$("#buttonLike").click(function(){
		if(!inAnimation){
			$parent = $(".book.active");
			likeN++;
			LikeDislikeList.push("like");
			// likeBooks.push($parent.find('h2').text());

			$("#likes").text(likeN);
			// $("#bookLikes").html(likeBooks.join("<br><br>"));
			$("#bookLikes").html($("#bookLikes").html() + "<label>" + $parent.children("h2").text() + "</label><br>");
		}  	
	});

	$("#buttonDislike").click(function(){
		if(!inAnimation){
			$parent = $(".book.active");
			dislikeN++;
			LikeDislikeList.push("dislike");
			// dislikeBooks.push($parent.find('h2').text());

			$("#dislikes").text(dislikeN);
			// $("#bookDislikes").html(dislikeBooks.join("<br><br>"));
			$("#bookDislikes").html($("#bookDislikes").html() + "<label>" + $parent.children("h2").text() + "</label><br>");
		}
	});

	$("#buttonLike, #buttonDislike").click(function(){
  		if(!inAnimation){
  			inAnimation = true;
  			$allBooks = $(".book");
  			$parent = $(".book.active");
  			var index = $allBooks.index($parent);
  			if(index+1<$allBooks.length){
				$next = $parent.next();// I don't use next(".book"), because after my final book I have a tally
			}else{
				$next = $(".Result");
				$(".row.buttons.active").removeClass("active");
			}
			$parent.fadeOut(500, function(){
				$parent.removeClass("active");
				$next.fadeIn(500, function(){
					$next.addClass("active");
					progress();
					if($allBooks.index($parent)==0){
						$("#backButton").addClass("active");
					}
					inAnimation = false;
				})	
			})
		}
	});

	$("#backButton").click(function(){
		if(!inAnimation){
  			inAnimation = true;
			$allBooks = $(".book");
  			$parent = $(".book.active");
  			$previous = $parent.prev();
			
  			if(LikeDislikeList[LikeDislikeList.length - 1] == "like"){
  				likeN--;
  				$("label:last-of-type","#bookLikes").remove();
  				$("br:last-of-type","#bookLikes").remove();
			}else{
				dislikeN--;
				$("label:last-of-type","#bookDislikes").remove();
				$("br:last-of-type","#bookDislikes").remove();
			}
			LikeDislikeList.pop();

  			$parent.fadeOut(500, function(){
				$parent.removeClass("active");
				$previous.fadeIn(500, function(){
					$previous.addClass("active");
					inAnimation = false;
				})
			})
  		}
	})

	$("p.Description").resizable({
		containment: ".book"
	})

	$(".backToStart").click(function(){
		if(!inAnimation){
				inAnimation = true;
		likeN = 0;
		dislikeN = 0;
		likeBooks = [];
		dislikeBooks = [];

		$start = $(".book:first-of-type");
		$parent = $(this).parents(".AfterBooks");
		$parent.fadeOut(500, function(){
			$parent.removeClass("active");
			$start.fadeIn(500, function(){
				$(".row.buttons").addClass("active");
				$start.addClass("active");
				progress();
				inAnimation = false;
			})	
		})
	}
	});
});