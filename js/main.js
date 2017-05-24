var likeN = 0;
var dislikeN = 0;

var currentIndex;

var LikeDislikeList = [];

var APIkey = "AIzaSyCEb5zro0QNPnPMooqx4s0tMcv04k4YSgc";
var UserID = "117330412869481617595";
var ShelfID = "1001";
var clientID = "883774612498-9qjo0fhi51u9n68vu6do0ebi7gpks352.apps.googleusercontent.com";

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

var dataBase = openDatabase("myDatabase", "1.0", "testDB", 2 * 1024 * 1024);
dataBase.transaction(function(tx){
	//tx.executeSql('DROP TABLE Books');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Books (id unique, title, author, opinion, price)');
});

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
	<input type="hidden" class="hiddenFieldId"></input>
	<input type="hidden" class="hiddenFieldPrice"></input>
	<p class="Author"></p>
	<p class="Categories"></p>
	<p class="Description ui-widget-content"></p>
	<p class="PageNumber"></p>
	<p class="Publisher"></p>
	<p class="Rating"></p>
	<p>
	<div class="row">
	<a class="googleBooksLink link1 col-xs-6" target="_blank"><img src="images/Google_Books_logo.png" width=130px height=50px></a>
	<a class="googlePlayLink link2 col-xs-6" target="_blank"><img src="images/Google_Play_logo.png" width=130px height=50px></a>
	</div>
	</p>
	</div>`
	$bookParent.append(insertBookHTML);
	if(index==0){
		$("#BookNum1").addClass("active");
	}
	$bookID = $(".book", ".bookDiv").eq(index);
	if(!("undefined" === typeof bookDict.volumeInfo.imageLinks)){
		$(".image1",$bookID).attr("src",bookDict.volumeInfo.imageLinks.thumbnail);
		$(".image2",$bookID).attr("src",bookDict.volumeInfo.imageLinks.smallThumbnail);
	}	
	$("h2",$bookID).text(bookDict.volumeInfo.title);
	if(!("undefined" === typeof bookDict.volumeInfo.authors)){
		$(".Author",$bookID).text("By: " + bookDict.volumeInfo.authors[0]);
	}else{
		$(".Author",$bookID).text("No Authors");
	}	
	$(".Description",$bookID).html(bookDict.volumeInfo.description);
	$(".Categories",$bookID).text("Category: " + bookDict.volumeInfo.categories);
	$(".googleBooksLink",$bookID).attr("href", bookDict.volumeInfo.previewLink);
	$(".googlePlayLink",$bookID).attr("href", bookDict.volumeInfo.canonicalVolumeLink);
	$(".PageNumber",$bookID).text(bookDict.volumeInfo.pageCount + " pages");
	$(".Publisher",$bookID).text("Published by: " + bookDict.volumeInfo.publisher);
	$(".Rating",$bookID).text("Average Rating: " + bookDict.volumeInfo.averageRating + "/5");
	$('.hiddenFieldId',$bookID).text(bookDict.id);
	if(bookDict.saleInfo.saleability == "FOR_SALE"){
		$('.hiddenFieldPrice',$bookID).text(bookDict.saleInfo.retailPrice.amount + currency_symbols[bookDict.saleInfo.retailPrice.currencyCode]);
	}else{
		$('.hiddenFieldPrice',$bookID).text("Unavailable!");
	}
}

function loadShoppingData(index, bookDict){
	$table = $(".ShoppingCart table");
	ID = "BookNumber" + (currentIndex + index + 1);
	var insertTableRowHTML = `<tr id="` + ID + `">
	<td class="itemName"></td>
	<td class="itemImage"><img style="max-height:100px;"></td>
	<td class="author"></td>
	<td class="googlePreview"><a target="_blank"><img src="images/Google_Books_logo.png" width=65px height=25px></a></td>
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
	$trID = $("tr").eq(currentIndex + index + 1);
	$(".itemName",$trID).text(bookDict.volumeInfo.title);
	if(!("undefined" === typeof bookDict.volumeInfo.imageLinks)){
		$(".itemImage img",$trID).attr("src",bookDict.volumeInfo.imageLinks.thumbnail);
	}
	if(!("undefined" === typeof bookDict.volumeInfo.authors)){
		$(".author",$trID).text(bookDict.volumeInfo.authors[0]);
	}else{
		$(".author",$trID).text("No Authors");
	}
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


// $.ajax({
// 	url:"https://www.googleapis.com/books/v1/users/" + UserID + "/bookshelves/" + ShelfID + "/volumes?key=" + APIkey,
// }).done(function(data){
// 	$.each(data.items,function(index,item){	
// 		// console.log(item)
// 		loadData(index,item);
// 		loadShoppingData(index,item);
// 	})
// });

$(".bookDiv").on("click",".parent button.switchImage", function(){
	$parent = $(this).parents(".parent");
	$present = $parent.find('.active');
	$absent = $parent.find('.absent');
	$present.removeClass('active');
	$present.addClass('absent');
	$absent.removeClass('absent');
	$absent.addClass('active');
}) 

$("#ListButton").click(function(){
	if($(".bookDiv").css("display")!="none"){
		$(".bookDiv").hide();
		$(".buttons").removeClass("active");
		$("#backButton").removeClass("active");
	}
	if($(".ShoppingCart").css("display")!="none"){
		$(".ShoppingCart").hide();
	}
	if($(".Result").css("display")=="none"){
		$(".Result").show();
	}	
})

$("#ShoppingButton, #shopping").click(function(){
	$ShoppingCart = $(".ShoppingCart");

	$titleList = $(".ShoppingCart table tbody").children("tr").children("td.itemName");
	$.each($titleList,function(index,value){
		if(LikeDislikeList[index]=="like"){
			$(value).parents("tr").addClass("active");
		}
	})
	
	if($(".bookDiv").css("display")!="none"){
		$(".bookDiv").hide();
		$(".buttons").removeClass("active");
		$("#backButton").removeClass("active");
	}
	if($(".Result").css("display")!="none"){
		$(".Result").hide();
	}	
	if($ShoppingCart.css("display")=="none"){
		$ShoppingCart.show();
	}
});

$(".ShoppingCart").on("click",".minus-btn", function(){
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
	$button = $(this);
	$input = $button.parents(".quantity").children("input");
	var value = parseInt($input.val());
	value++
	$input.val(value);
});

$(".ShoppingCart").on("click",".minus-btn,.plus-btn", function(){
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
		total = total + parseFloat(value.textContent);
				
	});
	$("#TotalPrice").text((Math.round(total*100)/100) + $(".currency:not(:empty)").first()[0].textContent);
});

function searchData(){
	var searchText = $("#SearchBooks").val();

	var searchCategoryName =  $("#SearchBooksCategory option:selected").val()

	var searchCategoryText = $("#SearchBooksCategoryText").val();

	var categoryID = "";
	if(!(searchCategoryName == "default") && (!("undefined" === typeof searchCategoryText) && !(searchCategoryText == ""))){
		switch(searchCategoryName){
			case "Title":
				categoryID = "+intitle:";
				break;
			case "Author":
				categoryID = "+inauthor:";
				break;
			case "Publisher":
				categoryID = "+inpublisher:";
				break;
			case "Category":
				categoryID = "+insubject:";
				break;
			case "ISBN":
				categoryID = "+isbn:";
				break;
			default:
				categoryID = "";
		}
	}else{
		searchCategoryText = "";
	}

	q = searchText + categoryID + searchCategoryText

	$.ajax({
		url:"https://www.googleapis.com/books/v1/volumes?q=" + q + "&startIndex=" + currentIndex,
	}).done(function(data){
		$(".bookDiv").empty();
		$ShoppingCartList = $(".ShoppingCart table tbody").children("tr");
		// $.each($ShoppingCartList,function(index,item){
		// 	if(index>$(".bookDiv .book").length){
		// 		item.remove();
		// 	}
		// });
		$.each(data.items,function(index,item){	
			if(index<10){
				console.log(item);
				loadData(index,item);
				loadShoppingData(index,item);
			}			
		});
	$(".buttons").addClass("active");		
	});
}

$("#SearchBooksSubmit").click(function(){
	currentIndex = 0;
	searchData();
});

$("#SearchBooks").keyup(function(event){
	if(event.which == 13) {
		currentIndex = 0;
		searchData();
	}	
});


$(function(){	
	$("#buttonLike").click(function(){
		if(!inAnimation){
			$parent = $(".book.active");
			likeN++;
			LikeDislikeList.push("like");

			$("#likes").text(likeN);
			$("#bookLikes").html($("#bookLikes").html() + "<label>" + $parent.children("h2").text() + "</label><br>");
		}  	
	});

	$("#buttonDislike").click(function(){
		if(!inAnimation){
			$parent = $(".book.active");
			dislikeN++;
			LikeDislikeList.push("dislike");

			$("#dislikes").text(dislikeN);
			$("#bookDislikes").html($("#bookDislikes").html() + "<label>" + $parent.children("h2").text() + "</label><br>");
		}
	});

	$("#buttonLike, #buttonDislike").click(function(){
  		if(!inAnimation){
  			inAnimation = true;
  			$allBooks = $(".book");
  			$parent = $(".book.active");
  			var index = $allBooks.index($parent);
  			// if(index+1<$allBooks.length){
			// 	$next = $parent.next();
			// }else{
			// 	$next = $(".Result");
			// 	$(".row.buttons.active").removeClass("active");
			// }

			if(index+1<$allBooks.length){
				$next = $parent.next();
			}else{
				$next = $(".book:first-of-type");
			}


			// id unique, title, author, opinion, price
			// filling out the database with like/dislike info on the books
			$id = $('.hiddenFieldId',$parent).text();
			$title = $('h2',$parent).text();
			$author = $('.Author',$parent).text();		
			$price = $('.hiddenFieldPrice',$parent).text();
			$opinion = $(this).attr('data-opinion');

			dataBase.transaction(function(tx){
				tx.executeSql('SELECT COUNT(*) as count FROM Books WHERE id = (?)', [$id], function(tx, count){
					if (count.rows[0].count==0){
						tx.executeSql('INSERT INTO Books(id, title, author, opinion, price) VALUES(?,?,?,?,?)',[$id, $title, $author, $opinion, $price]);
					}else{
						tx.executeSql('UPDATE Books SET opinion = (?) WHERE id = (?)',[$opinion, $id]);
					}
				});				
			});

			currentIndex++
			if((currentIndex%10)==0){
				searchData();
			}

			$parent.fadeOut(500, function(){
				$parent.removeClass("active");
				$next.fadeIn(500, function(){
					$next.addClass("active");
					if(currentIndex-1==0){
						$("#backButton").addClass("active");
					}
					// progress();
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

			$id = $('.hiddenFieldId',$previous).text();
			dataBase.transaction(function(tx){
				tx.executeSql('DELETE FROM Books WHERE id = (?)', [$id]);			
			});

  			$parent.fadeOut(500, function(){
				$parent.removeClass("active");
				$previous.fadeIn(500, function(){
					$previous.addClass("active");
					if($allBooks.index($previous)==0){
						$("#backButton").removeClass("active");
					}					
					progress();
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
			LikeDislikeList = [];

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
			$activetitleList = $(".ShoppingCart table tbody").children("tr.active");
			$.each($activetitleList, function(index,item){
				if(index!=0){
					$(item).removeClass("active");
				}
			})
  			$("#bookLikes").empty();
  			$("#bookDislikes").empty();
  			$("#TotalPrice").text("");
  		}
	});
});

// run th following code either in the browser console, or create a new button to run it
/*dataBase.transaction(function (tx) {
	tx.executeSql('SELECT * FROM Books', [], function (tx, results) {
	   	$.each(results.rows,function(index,item){
			console.log(item);
		});
	}, null);
});*/