let count_element = 0; 
let get_name_page = "";

let left_scrol = 0; 
let different_scrol = 0;
let start = 0;

let cart  = {};
let string_num_goods  = {};



//start count in cart

function show_price()
	{
		$.getJSON('../json/Ollgoods.json', function show_price(data)
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
//finish count cart
$('document') .ready(function(){
	name_html();
	load_goods();
	check_cart();
	show_price();
	add_title_page();
})
//start create page fron json
function name_html()
	{
 		 get_name_page = $('#name_page').text();
    }
function load_goods() {
	// download goods on page
	$.getJSON('../json/goods_'+get_name_page+'.json', function(data){
		let out = '';
		for (var key in data)

			{
				let name_class = '.'+key+'';
				count_element++;
				out+=                  '<div class="goods_elem_block">';
					out+=                  '<div class="img_block">';
						out+=                  '<img src="../media/img/'+get_name_page+'/'+ data[key]['image'] + '" alt="">';
						out+=                  '<div class="name_gods_block">';
							out+=                  '<p>' + data[key]['description'] + '</p>';
							out+=                  '<p>$ ' + data[key]['cost'] + '</p>';
						out+=                  '</div>';
					out+=                  '</div>';
					out+=                  '<div class ="secror_buy">';
						out+=                  '<img src="../media/img/-.png" alt="minus minus_from_cart" class="minus" data-art="' + key + '">';
						out+=                  '<p>amount</p>';
						out+=                  '<p class ="'+key+'">0</p>';
						out+=                  '<img src="../media/img/+.png" alt="plus" class="plus plus_to_cart" data-art="' + key + '">';
					out+=                  '</div>';
				out+=                  '</div>';
				$(name_class).html(cart[key]);
			}		
		$('#scrol_box').html(out);	
		$('.minus').on('click', minus_from_count);
		$('.plus_to_cart').on('click', add_to_cart);
		for (var key in data)

			{
				let name_class = '.'+key+'';				
				$(name_class).html(cart[key]);
			}		
	})
}
function add_title_page()
	{
		$('.title_page').html(get_name_page);
	}
//end create page fron json

//start add and minus to cart
	function minus_from_count() 
		{ 
			let articul = $(this).attr('data-art');	
			let name_class = '.'+articul+'';		
			if(cart[articul]!=undefined || cart[articul] < 1)
				{
					cart[articul]--;
					$(name_class).html(cart[articul]);					

				}
			else if (cart[articul] == 1)
				{
					delete cart[articul];
					$(name_class).html('0');										
				}	
			localStorage.setItem('cart', JSON.stringify(cart));
			show_price();
			
		}
	function add_to_cart() 
		{ 
			let articul = $(this).attr('data-art');
			let name_class = '.'+articul+'';
			if(cart[articul]!=undefined)
				{
					cart[articul]++;
					$(name_class).html(cart[articul]);
				}
			else
				{
					cart[articul] = 1;
					$(name_class).html(cart[articul]);

				}	
			localStorage.setItem('cart', JSON.stringify(cart));
			show_price();
			
		}
	function refresh_amount() 
		{ 
			let articul = $(this).attr('data-art');
			let name_class = '.'+articul+'';
			if(cart[articul]!=undefined)
				{
					cart[articul]++;
					$(name_class).html(cart[articul]);
				}
			else
				{
					cart[articul] = 1;
					$(name_class).html(cart[articul]);

				}	
			localStorage.setItem('cart', JSON.stringify(cart));
			show_price();
			
		}
	function check_cart()
		{
			if(localStorage.getItem('cart') != null)
				{
					cart = JSON.parse(localStorage.getItem('cart'));
				}
		}
//end add to cart

//start scrol
document.getElementById('slider-left').onclick = slider_left;
 function slider_left()
 { 	
 	different_scroll = (count_element * 370) - (left_scrol+(370*3.5));
 	let scrol_box = document.getElementById('scrol_box');  	

	if(start===1 && count_element===4)
 		{
 			left_scrol = 0;
 			start = 0;
 		}
	 else if(start===0 && count_element===4)
 		{
 			left_scrol = 185;
 			start ++;
 		}
 	else if(start===0)
 		{
 			left_scrol = 370;
 			start ++;
 		}
 	else if(different_scrol>=370)
		{
			left_scrol+= 370;
		}	
	else if(different_scrol<370&&different_scrol>0)
		{
			left_scrol+= (different_scrol);
		}
	else if(different_scrol===0)
		{
			left_scrol=0
		}
	else{}
	
 	if(left_scrol === 0)
	 	{
	 		scrol_box.style.left = left_scrol;
	 	}
 	else
	 	{
	 		scrol_box.style.left = (left_scrol*(-1))+ 'px';	
	 	} 	
 	different_scrol = (count_element * 370) - (left_scrol+(370*3.5)); 	
 }
//end scrol