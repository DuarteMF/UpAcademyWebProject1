<?php require_once("header.html"); ?>


	<div class="container-fluid">
		<div class="row">
			<div class="bookDiv">
			<!--This is where the books will be added-->
			</div>
			
			<div class="row buttons active col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
				<button id="buttonDislike" class="Dislike col-xs-4 col-xs-offset-1 btn btn-danger"><span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span></button>
				<button id="buttonLike" class="col-xs-4 col-xs-offset-2 btn btn-success"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span></button>
			</div>
			<div class="row backButton col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
				<button id="backButton" ><span class="glyphicon glyphicon-backward" aria-hidden="true"></span></button>
			</div>

			<div class="Result col-xs-10 col-xs-offset-1 col-md-4 col-md-offset-4 AfterBooks">
				<h3>Results</h3>
				<div class="row">
					<p class="col-xs-6" id="likesText">Likes</p>
					<p class="col-xs-6" id="dislikesText">Dislikes</p>
				</div>
				<div class="row">
					<p class="col-xs-6" id="likes">0</p>
					<p class="col-xs-6" id="dislikes">0</p>
				</div>
				<div class="row">
					<p class="col-xs-6" id="bookLikesText">Books</p>
					<p class="col-xs-6" id="bookDislikesText">Books</p>
				</div>
				<div class="row">
					<p class="col-xs-4 col-xs-offset-1" id="bookLikes"></p>
					<p class="col-xs-4 col-xs-offset-2" id="bookDislikes"></p>
				</div>
				<br>
				<br>
				<button class="backToStart">Restart</button>
				<br>
				<br>
				<button id="shopping">Shopping</button>
			</div>


			<div class="ShoppingCart col-xs-10 col-xs-offset-1 AfterBooks"> 
			<table>
				<tr id="TableHeader" class="active">
					<th class="itemName">Book Name</th>
					<th class="itemImage">Cover</th>
					<th class="author">Author</th>
					<th class="googlePreview">Preview</th>
					<th class="googlePrice"><img src="images/Google_Play_logo.png" width=75px height=32px></th>
					<th class="quantity">Quantity</th>
			        <th class="price">Price</th>
				</tr>
				<!--This is where the book rows will show up-->
			</table>
			<br>
			<br>
			<button id="calculateTotal">Calculate Total</button>
			<h1 id="TotalPrice"></h1>
			<button class="backToStart">Restart</button>
			</div>

		</div>
	</div>
	<div id="progressbar"><div class="progress-label">Loading...</div></div>


<?php require_once("footer.html"); ?>
