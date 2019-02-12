let cart  = {};

check_cart();
//start count in cart
show_price();
function show_price()
	{
		$.getJSON('src/json/Ollgoods.json', function show_price(data)
		{
			let goods = data;
			check_cart();		
			count_price();

			function count_price() 
				{
					let out_price = 0;
					for (var key in cart)
						{
							out_price+= cart[key]*goods[key].cost;						
						}
					$('#summ_price').html('$ '+out_price);	
								
				}
		})
	}
function check_cart()
		{
			if(localStorage.getItem('cart') != null)
				{
					cart = JSON.parse(localStorage.getItem('cart'));
					console.log(cart);
				}
		}