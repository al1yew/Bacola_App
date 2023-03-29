// #region bag_diva click olunmasin

let bag_div112345 = document.querySelector('.bag_div');

bag_div112345.onclick = function (e) {
    e.preventDefault()
}

//#endregion bag_div1 click olunmasin

//#region shopping cartin ustundeki span

//isteyirem ki shop cartin ustundeki span regemi deyishsin, ozumuzden funksiya yazirig ve ozumuz cagiririg ki melumati ozu otursun, ve her deyishiklikden sonra bunu cagiriram ki yoxlasin, mehsul eynididse spani artirmasin

$(document).ready(function () {

    function CountBasketLength() {
        let shopcart = JSON.parse(localStorage.getItem('shopcart'));
        let cartcount = shopcart.length;

        for (let cart_in of document.querySelectorAll('.cartcount')) {
            cart_in.innerHTML = cartcount
        }

    }

    CountBasketLength();

});



//cagiriram mutleq metodu cunki ozu ozune ishlemir, ve butun etodlarda cagiracam onu ki reload-suz ishlesin

//#endregion shopping cartin ustundeki span




// let shopcart = JSON.parse(localStorage.getItem('shopcart'));




//#region yoxlayirig basket boshdu ya yox ve yigirig baskete

$(document).ready(function () {

    let shopcart = JSON.parse(localStorage.getItem('shopcart'));
    let empty_basket = document.querySelector('#contentbasket');
    let filled_basket = document.querySelector('#prod_in_cart');
    let little_filled_basket = document.querySelector('#polniy_basket')
    let little_empty_basket = document.querySelector('#pustoy_basket')
    let subtotal_bag_div = document.querySelector('#subtotal_bag_div');

    //basketimizi cagirdig, parse eledik
    // bosh olanda yaradilan sectionu basket boshdursa gostereceyik

    if (shopcart.length != 0) {

        empty_basket.classList.add('d-none');
        filled_basket.classList.remove('d-none');
        little_empty_basket.classList.add('d-none');
        little_filled_basket.classList.remove('d-none');


        let pr_big = '';
        let pr_small = '';
        let small_basket_inner = document.querySelector('#small_basket_innner');
        let big_basket_inner_tbody = document.querySelector('#tbody_basket');

        for (let product of shopcart) {
            pr_big +=
                `
                <tr class="basket_item" id= "${product.Id}">
                    <td class="col-lg-1 col-4">
                        <img class="img-fluid" src="${product.Src}">
                    </td>
                    <td class="col-lg-6 col-4-2">
                        <span>
                            ${product.Name}
                        </span>
                    </td>
                    <td class="col-lg-1">
                        ${product.Price}$
                    </td>
                    <td class="col-lg-2 col-3">
                        <div class="top_counter col-lg-12">
                            <button id="decrease">
                                -
                            </button>

                            <span id="result_count">
                                ${product.Count}
                            </span>

                            <button id="increase">
                                +
                            </button>
                        </div>

                        <div class="bottom_counter">
                            <span id="max10">You can add max 10</span>
                        </div>
                    </td>
                    <td class="col-lg-1">
                        ${Math.round((product.Price * product.Count) * 100) / 100}$
                    </td>
                    <td id="remove_prod_basket" class="col-lg-0-5 col-0-8 remove_prod_basket">
                        <span>
                            X
                        </span>
                    </td>
                </tr>
            `

            pr_small +=
                `
                <div class="product_bag_div" id="${product.Id}">

                    <div class="left col-lg-3">
                        <img src="${product.Src}">
                        <span id="remove_prod_basket" class="remove_x_small_basket remove_prod_basket">
                            x
                        </span>
                    </div>

                    <div class="right col-lg-9">

                        <div class="top">
                            ${product.Name}
                        </div>

                        <div class="bottom">
                            <span>${product.Count} pcs.</span>
                            <span>x</span>
                            <span>${product.Price}$</span>
                        </div>

                    </div>

                </div>
            `
            small_basket_inner.innerHTML = pr_small;
            big_basket_inner_tbody.innerHTML = pr_big;
        }

    }
    else {

        empty_basket.classList.remove('d-none');
        filled_basket.classList.add('d-none');
        little_empty_basket.classList.remove('d-none');
        little_filled_basket.classList.add('d-none');
    }



});


//#endregion yoxlayirig basket boshdu ya yox



//#region totali hesablayirig



$(document).ready(function () {

    let shopcart = JSON.parse(localStorage.getItem('shopcart'));
    let total = 0;
    let subtotal_inner = document.querySelector('#subtotal_right_countprice');
    let subtotal_inner_big_basket = document.querySelector('#subtotal_right_countprice1');
    let basket_result_cost = document.querySelector('#basket_result_cost');
    let total_header_cost = document.querySelector('#total_header_cost');

    for (let product of shopcart) {
        total += product.Price * product.Count
    }

    subtotal_inner.innerHTML = Math.round(total * 100) / 100;

    total_header_cost.innerHTML = `$${Math.round(total * 100) / 100}`;

    basket_result_cost.innerHTML = `$${Math.round(total * 100) / 100 + 5}`;

    subtotal_inner_big_basket.innerHTML = `$${Math.round(total * 100) / 100}`;

    if (total == 0) {
        document.getElementById('subtotal_right_countprice').innerHTML = '$0.00';
        document.getElementById('total_header_cost').innerHTML = '$0.00';
        document.getElementById('subtotal_right_countprice1').innerHTML = '$0.00';
        document.querySelector('#basket_result_cost'), innerHTML = '$0.00';
    }
});








//#endregion totali hesablayirig


let shopcart1 = JSON.parse(localStorage.getItem('shopcart'));


//#region delete item 




$(document).ready(function () {

    let delete_btns = document.querySelectorAll('.remove_prod_basket');

    for (let d_btn of delete_btns) {
        d_btn.onclick = function (e) {

            for (let i = 0; i < shopcart1.length; i++) {
                if (e.target.parentElement.parentElement.children[1].children[0].innerText.trim() == shopcart[i].Name.trim()) {
                    shopcart1.splice(i, 1);
                    localStorage.setItem('shopcart', JSON.stringify(shopcart1));
                    setTimeout(() => {

                        location.reload();
                        reload_.classList.remove('d-none');
                        return false;

                    }, 500);

                    reload_.classList.add('d-none');
                }
            }
        }
    }
})



//#endregion delete item





//#region counter

$(document).ready(function () {

    let basket_items = document.querySelectorAll('.basket_item')

    for (let m = 0; m < shopcart1.length; m++) {

        for (let k = 0; k < basket_items.length; k++) {

            if (shopcart1[m].Id == basket_items[k].id) {

                //console.log(basket_items[k].children[3].children[0].children[0]);
                basket_items[k].children[3].children[0].children[0].onclick = function () {

                    shopcart1[m].Count--;

                    basket_items[k].children[3].children[0].children[1].innerHTML = `${shopcart1.Count}`;

                    setTimeout(() => {

                        location.reload();
                        reload_.classList.remove('d-none');
                        return false;

                    }, 500);

                    reload_.classList.add('d-none');

                    if (shopcart1[m].Count < 1) {
                        shopcart1.splice(m, 1);
                        localStorage.setItem('shopcart', JSON.stringify(shopcart1));

                        setTimeout(() => {

                            location.reload();
                            reload_.classList.remove('d-none');
                            return false;

                        }, 500);

                        reload_.classList.add('d-none');
                    }

                    localStorage.setItem('shopcart', JSON.stringify(shopcart1));
                }

                basket_items[k].children[3].children[0].children[2].onclick = function () {

                    shopcart1[m].Count++;

                    localStorage.setItem('shopcart', JSON.stringify(shopcart1));
                    basket_items[k].children[3].children[0].children[1].innerHTML = `${shopcart1.Count}`;

                    setTimeout(() => {

                        location.reload();
                        reload_.classList.remove('d-none');
                        return false;

                    }, 500);

                    reload_.classList.add('d-none');


                }
            }
        }
    }
})

//#endregion counter








//#region clear all

$('#clearall').click(function () {

    localStorage.setItem('shopcart', JSON.stringify([]))
    setTimeout(() => {

        location.reload();
        reload_.classList.remove('d-none');
        return false;

    }, 500);

    reload_.classList.add('d-none');

})

//#endregion refresh page


//#region clear all

$('#refresh').click(function () {

    setTimeout(() => {

        location.reload();
        reload_.classList.remove('d-none');
        return false;

    }, 500);

    reload_.classList.add('d-none');

})

  //#endregion refresh page
