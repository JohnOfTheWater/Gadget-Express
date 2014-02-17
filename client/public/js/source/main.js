(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#callUserOut').hide();
    $('#callUserOut').click(hideUser);
    $('#callGadgetOut').click(hideGadget);
    $('#callGadgetOut').hide();
    $('#callUser').click(showUser);
    $('#callGadget').click(showGadget);
    $('#createUser').click(saveUser);
    $('#createGadget').click(saveGadget);
    $('#users').on('click', '.delete', deleteUser);
    $('#gadgetList').on('click', '.purchase', buyGadget);
    $('#gadgetList').on('click', '.buy', finalizePurchase);
    //$('#users').on('click', '.user', updateUser);
    getUsers();
    getGadgets();
  }

  var gadgetsArray = [];
  var usersArray = [];

  function showUser(){
    $('#callUser').hide();
    $('#callUserOut').show();
    $('#user').animate({margin:'+0px +0 +0 -10'});
    $('#name').focus();
  }

  function showGadget(){
    $('#callGadget').hide();
    $('#callGadgetOut').show();
    $('#gadget').animate({margin:'+50px +0 +0 -10'});
    $('#gName').focus();
  }

  function hideUser(){
    $('#callUser').show();
    $('#callUserOut').hide();
    $('#user').animate({margin:'+0px +0 +0 -332'});
  }

  function hideGadget(){
    $('#callGadget').show();
    $('#callGadgetOut').hide();
    $('#gadget').animate({margin:'+50px +0 +0 -332'});
  }

  function finalizePurchase(){
    debugger;
    var id = $(this).data('id');
    var user = $('.select[data-id="'+id+'"]').val();
    var userId = findUserId(user);
    var balance = $('.balance[data-id="'+userId+'"]').text();
    var amount = $('.select1[data-id="'+id+'"]').val();
    var subTotal = $('.cost[data-id="'+id+'"]').text();
    var total = amount*subTotal;
    var inStock = $('.quantita[data-id="'+id+'"]').text();
    balance = balance-total;
    amount = inStock-amount;
    if(balance >=0){
      updateUser(userId, user, balance, id);
      updateGadget(id, amount);
    }else{
      console.log('nice try!');
    }
    $('.select[data-id="'+id+'"]').hide();
    $('.select1[data-id="'+id+'"]').hide();
    $('.buy[data-id="'+id+'"]').hide();
    $('.purchase').show();

  }

  function updateGadget(id,amount){
    debugger;
    console.log(id);
    console.log(amount);
    var name = $('.gadget[data-id="'+id+'"]').text();
    var cost = $('.cost[data-id="'+id+'"]').text();
    var inStock = amount;
    var k = {name:name, cost:cost, inStock:inStock};
    var data = k;
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/gadgets/'+id;
    var type = 'PUT';
    var success = function(){
      $('.gadget').remove();
      $('.purchase').remove();
      $('.cost').remove();
      $('.quantita').remove();
      $('.select').remove();
      $('.select1').remove();
      $('.buy').remove();
      getGadgets();
    };
    $.ajax({url:url, type:type, data:data, success:success});

  }

  function findUserId(user){
    debugger;
    for(var i = 0; i < usersArray.length; i++){
      if(usersArray[i].name === user){
        return usersArray[i]._id;
      }
    }
  }

  function buyGadget(){
    var id = $(this).data('id');
    $('.purchase').hide();
    $('.gadget[data-id="'+id+'"]').css('font-size', '30px').css('background-color', 'red');
    $('.select[data-id="'+id+'"]').show();
    $('.select1[data-id="'+id+'"]').show();
    $('.buy[data-id="'+id+'"]').show();
    for(var i = 0; i < usersArray.length; i++){
      var $option = $('<option>');
      $option.text(usersArray[i].name);
      $('.select[data-id="'+id+'"]').append($option);
    }
    var quantita = $('.quantita[data-id="'+id+'"]').text();
    quantita = quantita*1;
    var sum = 1;
    for(var k = 0; k < quantita; k++){
      var $option1 = $('<option>');
      $option1.text(sum);
      $('.select1[data-id="'+id+'"]').append($option1);
      sum += 1;
    }

  }

  function saveGadget(){
    var name = $('#gName').val();
    var cost = $('#cost').val();
    var inStock = $('#amount').val();
    var z = {name:name, cost:cost, inStock:inStock};
    var data = z;
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/gadgets';
    var type = 'POST';
    var success = newGadget;

    $.ajax({url:url, type:type, data:data, success:success});

  }


  function updateUser(x,y,z,pid){
    debugger;
    var name = y;
    var balance = z;
    var products = $('.products[data-id="'+x+'"]').text();
    var currentProduct = $('.gadget[data-id="'+pid+'"]').text();
    var comma = ',';
    products = products.concat(comma,currentProduct);
    var k = {name:name, balance:balance, products:products};
    var data = k;
    var id = x;
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/users/'+id;
    var type = 'PUT';
    var success = function(){
      usersArray = [];
      $('.user').remove();
      $('.balance').remove();
      $('.products').remove();
      $('.delete').remove();
      getUsers();
    };
    $.ajax({url:url, type:type, data:data, success:success});

  }

  function deleteUser(){
    var id = $(this).data('id');
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/users/' + id;
    var type = 'DELETE';
    var success = removeUser;

    $.ajax({url:url, type:type, success:success});

  }

  function removeUser(data){
    if(data.deleted === 1){
      $('.user[data-id="'+data.id+'"]').remove();
      $('.balance[data-id="'+data.id+'"]').remove();
      $('.products[data-id="'+data.id+'"]').remove();
    }
  }

  function saveUser(){
    var name = $('#name').val();
    var balance = $('#deposit').val();
    //var userImage = $('#userImage').val();
    var z = {name:name, balance:balance};
    var data = z;
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/users';
    var type = 'POST';
    var success = newUser;

    $.ajax({url:url, type:type, data:data, success:success});

  }

  function newUser(user){
    $('#name').val('');
    $('#deposit').val('');
    //$('#userImage').val('');
    displayUser(user);
  }

  function newGadget(gadget){
    $('#gName').val('');
    $('#cost').val('');
    $('#amount').val('');
    displayGadget(gadget);
  }


  function getUsers(){
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/users';
    $.getJSON(url, displayUsers);
  }

  function getGadgets(){
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/gadgets';
    $.getJSON(url, displayGadgets);
  }

  function displayUsers(data){
    //$('#users').empty();

    for(var i = 0; i < data.users.length; i++){
      displayUser(data.users[i]);
    }
  }

  function displayGadgets(data){

    for(var i = 0; i < data.gadgets.length; i++){
      displayGadget(data.gadgets[i]);
    }
  }
/*
  function addGadget(){
    var $purchase = $('<div>');
    var $gadget = $('<div>');
    var $cost = $('<div>');
    var $inStock = $('<div>');

    var gadget = $('#gName').val();
    var cost = $('#cost').val();
    var inStock = $('#amount').val();

    $purchase.text('Purchase');
    $gadget.text(gadget);
    $cost.text(cost);
    $inStock.text(inStock);

    $('#purchase').append($purchase);
    $('#gadget-name').append($gadget);
    $('#gadgetCost').append($cost);
    $('#inStock').append($inStock);

    $('#gName').val('');
    $('#cost').val('');
    $('#amount').val('');
  }
*/
  function displayGadget(gadget){
    gadgetsArray.push(gadget);
    debugger;
    var $purchase = $('<div>');
    var $gadget = $('<div>');
    var $cost = $('<div>');
    var $inStock = $('<div>');
    var $select = $('<select>');
    var $select1 = $('<select>');
    var $button = $('<div>');

    $purchase.text('Purchase').attr('data-id', gadget._id).addClass('purchase');
    $gadget.text(gadget.name).attr('data-id', gadget._id).addClass('gadget');
    $cost.text(gadget.cost).attr('data-id', gadget._id).addClass('cost');
    $inStock.text(gadget.inStock).attr('data-id', gadget._id).addClass('quantita');
    $select.val('user').addClass('select').attr('data-id', gadget._id).hide();
    $select1.val('quantity').addClass('select1').attr('data-id', gadget._id).hide();
    $button.text('buy').addClass('buy').attr('data-id', gadget._id).hide();

    $('#purchase').append($purchase);
    $('#gadget-name').append($gadget);
    $('#gadgetCost').append($cost);
    $('#inStock').append($inStock);
    $('#who').append($select);
    $('#quantity').append($select1);
    $('#buy').append($button);
    var pippo = $('.quantita[data-id="'+gadget._id+'"]').text();
    if(pippo*1 === 0){
      $('.purchase[data-id="'+gadget._id+'"]').remove();
      $('.gadget[data-id="'+gadget._id+'"]').remove();
      $('.cost[data-id="'+gadget._id+'"]').remove();
      $('.quantita[data-id="'+gadget._id+'"]').remove();
      $('.select[data-id="'+gadget._id+'"]').remove();
      $('.select1[data-id="'+gadget._id+'"]').remove();
      $('.button[data-id="'+gadget._id+'"]').remove();
    }
  }

  function displayUser(user){
    usersArray.push(user);

    var $name = $('<div>');
    var $balance = $('<div>');
    var $product = $('<div>');
    var $x = $('<div>');

    $name.text(user.name).attr('data-id', user._id).addClass('user');
    $balance.text(user.balance).attr('data-id', user._id).addClass('balance');
    $product.text(user.products).attr('data-id', user._id).addClass('products');
    $x.attr('data-id', user._id).addClass('delete').text('x');

    $name.prepend($x);
    $('#userName').append($name);
    $('#balance').append($balance);
    $('#products').append($product);

  }

})();

