let cart  = {};


function reload_localStorage()
	{
		localStorage.setItem('cart', JSON.stringify(cart));
	}




			$.getJSON('../json/Ollgoods.json', function(data)
				{
					let goods = data;
					check_cart();		
					show_cart();
					count_price();

					
					function show_cart() 
						{

							let out = '';
							for (var key in cart)
								{
									out+=          '<div class="child_shopping">';
										out+=          '<div style="position: relative;">';
											out+=          '<div class="dalete_doods_from_basket" data-art="'+key+'">';
												out+=          '<img src="../media/img/waste_basket.png" alt="" class="basket" onclick="">';
											out+=          '</div>';
											out+=          '<div class="name_item first_crutch">';
												out+=          goods[key].description;
											out+=          '</div>';
											out+=          '<div class="div_minus" data-art="'+key+'">';
												out+=          '<img src="../media/img/minus_litle.png" alt="" class="minus">';
											out+=          '</div>';
											out+=          '<div class="number_item first_Ñrutch" id="seÑond_Ñrutch">';
												out+=          cart[key];
											out+=          '</div>';          
											out+=          '<div class="div_plus" data-art="'+key+'">';
												out+=          '<img src="../media/img/plus_litle.png" alt="" class="plus">';
											out+=          '</div>';
											out+=          '<div class="price first_Ñrutch" id="third_Ñrutch">';
											out+=          		cart[key]*goods[key].cost;
											out+=          '</div>';
										out+=          '</div>';
									out+=          '</div>';						
							}
						$('.shopping-cart').html(out);
						$('.div_plus').on('click', add_goods);
						$('.div_minus').on('click', minus_goods);
						$('.dalete_doods_from_basket').on('click', dalete_goods);
						$('.clear_all').on('click', clear_cart);
					}
					function add_goods()
						{
							let articul = $(this).attr('data-art');
							cart[articul]++;
							reload_localStorage();
							show_cart();
							count_price();
						}
					function minus_goods()
						{
							let articul = $(this).attr('data-art');
								if(cart[articul]>1)
									{
										cart[articul]--;
									}
								else
									{
										delete cart[articul];
									}				
							reload_localStorage();
							show_cart();
							count_price();
						}
					function dalete_goods()
						{
							let articul = $(this).attr('data-art');
							delete cart[articul];
							reload_localStorage();
							show_cart();
							count_price();
						}	
					function clear_cart()
						{				
							cart  = {};
							reload_localStorage();
							show_cart();
							count_price();
						}
					function count_price() 
						{
							// count summ in cart;
							let out_price = 0;
							for (var key in cart)
								{
									out_price+= cart[key]*goods[key].cost;			
								}
							$('#summ_price').html('$ '+out_price);										
						}
			})





function check_cart()
	{
		if(localStorage.getItem('cart') != null)
			{
				cart = JSON.parse(localStorage.getItem('cart')); 
			}
	}