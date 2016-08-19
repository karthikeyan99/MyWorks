'user scrict';
var totalRecords = 0;
$(function(){
    $.ajax({
        type:'GET',
        url:'http://localhost:8080/customers/',
        success:function(item){
            totalRecords=item.length;
            console.log(totalRecords);
        },
        error:function(){
            alert('Error Occurred');
        }

    });
});
$('#heading').hide();
$('#previous').hide();
$('#next').hide();
$('#next1').hide();
$('#butt').hide();
var template = $('#temp').html();

function addCustomer(newCustomer) {

    $('#table').append(Mustache.render(template,newCustomer));
}

function viewAll(records) {
    $('#heading').show();
    $('#previous').show();
    $('#next').show();
    $('#butt').show();

    $('#table').append(Mustache.render(template,records));
}

function search(records) {
    $('#heading').show();   
    $('#table').append(Mustache.render(template,records));
}

$('#forming').submit(function(event) {
    event.preventDefault();

    $('#table').empty();
    var name = $('#name').val(),
    phoneNo = $('#phoneNo').val(),

    gender = $('#gender').val(),
    accountType = $('#accountType').val(),
    balance = $('#balance').val();
    isActive=$('#status').val();
    $('#heading').show();
    $('#register').modal('toggle');






    
    var customers={
        name : name,
        phone_no: phoneNo,
        gender : gender,
        account_type : accountType,
        balance : balance,
        isActive: isActive
    };
    $.ajax({
        type:'POST',
        url:'http://localhost:8080/customers',
        data:customers,
        success:function(newCustomer){
            addCustomer(newCustomer);
        },
        error:function(){
            alert('Error Adding Customer');
        }
    });
});


// $('#search').on('click'(function(){
//     $('#table').empty();
//     $('#previous').prop('disabled',true);
//     var input=$('#search').val();
//     $('#previous').toggle();
//     $('#next').toggle();
//     $.ajax({

//         type:'GET',

//         url:'http://localhost:8080/customers/?name='+input+'&page=1&_limit=10',
//         success:function(item){

//             $.each(item,function(i,records){
//                 search(records);
//             });

//         },
//         error:function(){
//             alert('ERROR on loading Server');
//         }
//     });
// });





var page=1;
$('#viewAll').on('click',function() {
    $('#table').empty();
    $('#previous').prop('disabled',true);
    $.ajax({
        type:'GET',
        url:'http://localhost:8080/customers/?&_page=1&_limit=50',
        success:function(item) {
                
              $.each(item,function(i,records) {
                viewAll(records); 
                console.log(page);
            });           
        },
        error:function() {
            alert('ERROR on loading Server');
        }
    });          
    
             
                
});


    $('#gs').on('click',function() {
        $('#table').empty();
        $('#previous').prop('disabled',true);
        $.ajax({
            type:'GET',
            url:'http://localhost:8080/customers/?&_sort=name&_page=1&_limit=50',
            success:function(item) {
            // totalRecords=item.length;
            $.each(item,function(i,records) {
                viewAll(records); 
                console.log(page);
            });           
        },
        error:function() {
            alert('ERROR on loading Server');
        }
    });             
    });

















// $('mybutton').on('click',function())
$('#search').keyup(function() {

    $('#table').empty();
    var input=$('#search').val();

    $('#previous').toggle();
    $('#next').toggle();
    $.ajax({

        type:'GET',
        
        url:'http://localhost:8080/customers/?name='+input+'&page=1&_limit=10',
        success:function(item){

            $.each(item,function(i,records){
                search(records);
            });
        },
        error:function(){
            alert('ERROR on loading Server');
        }
    });
});

$('#phones').keyup(function() {

    $('#table').empty();
    var input=$('#phones').val();

    $('#previous').toggle();
    $('#next').toggle();
    $.ajax({

        type:'GET',
        
        url:'http://localhost:8080/customers/?phone_no='+input+'&page=1&_limit=10',
        success:function(item){

            $.each(item,function(i,records){
                search(records);
            });
        },
        error:function(){
            alert('ERROR on loading Server');
        }
    });
});
$('#option1').on('click',function() {

    $('#table').empty();
    $('#previous').toggle();
    $('#next').toggle();
    $.ajax({

        type:'GET',
        
        url:'http://localhost:8080/customers/?account_type=Postpaid',
        success:function(item){

            $.each(item,function(i,records){
                search(records);
            });
        },
        error:function(){
            alert('ERROR on loading Server');
        }
    });
});

$('#option2').on('click',function() {

    $('#table').empty();
    
    
    $('#previous').toggle();
    $('#next').toggle();
    $.ajax({

        type:'GET',
        
        url:'http://localhost:8080/customers/?account_type=Prepaid',
        success:function(item){

            $.each(item,function(i,records){
                search(records);
            });
        },
        error:function(){
            alert('ERROR on loading Server');
        }
    });
});


$('#opt1').on('click',function() {

    $('#table').empty();
    
    
    $('#previous').toggle();
    $('#next').toggle();
    $.ajax({

        type:'GET',
        
        url:'http://localhost:8080/customers/?isActive=Activated',
        success:function(item){

            $.each(item,function(i,records){
                search(records);
            });
        },
        error:function(){
            alert('ERROR on loading Server');
        }
    });
});



$('#opt2').on('click',function() {

    $('#table').empty();
    
    
    $('#previous').toggle();
    $('#next').toggle();
    $.ajax({

        type:'GET',
        
        url:'http://localhost:8080/customers/?isActive=Deactivated',
        success:function(item){

            $.each(item,function(i,records){
                search(records);
            });
        },
        error:function(){
            alert('ERROR on loading Server');
        }
    });
});



$('#table').delegate('#delete','click',function() {
    var $tr=$(this).closest('tr');
    $.ajax({
        type:'DELETE',
        url:'http://localhost:8080/customers/'+$(this).attr('data-id'),
        success:function() {
            $tr.fadeOut(300,function() {
                $(this).remove();   
            });
        },
        error:function(){
            alert('ERROR on delete');
        }
    });
});


$('#table').delegate('#update','click',function() {
    var $tr = $(this).closest('tr');
    console.log("Clicked");
    $tr.find('input.pno').val($tr.find('span.pno').html() );
    $tr.find('input.name').val($tr.find('span.name').html() );
    $tr.find('select.gender').val($tr.find('span.gender').html() );
    $tr.find('select.account_type').val($tr.find('span.account_type').html() );
    $tr.find('input.balance').val($tr.find('span.balance').html() );
    $tr.find('select.isActive').val($tr.find('span.isActive').html() );
    $tr.find('td').addClass('edit');
});

$('#table').delegate('.cancelCustomer','click',function() {
    $(this).closest('tr').find('td').removeClass('edit');

});


$('#table').delegate('#save','click',function() {
    console.log("Clicked");
    var $tr = $(this).closest('tr');
    var updateCustomer = {
        phone_no : $tr.find('input.pno').val(),
        name         : $tr.find('input.name').val(),
        gender       : $tr.find('select.gender').val(),
        account_type : $tr.find('select.account_type').val(),
        balance      : $tr.find('input.balance').val(),
        isActive     : $tr.find('select.isActive').val(),
    };
    $.ajax({

        type:'PUT',
        url:'http://localhost:8080/customers/'+$tr.attr('data-id'),
        data:updateCustomer,
        success:function(newCustomer){
            $tr.find('span.pno').html(updateCustomer.phone_no);
            $tr.find('span.name').html(updateCustomer.name);
            $tr.find('span.gender').html(updateCustomer.gender);
            $tr.find('span.account_type').html(updateCustomer.account_type);
            $tr.find('span.balance').html(updateCustomer.balance);
            $tr.find('span.isActive').html(updateCustomer.is);
            $tr.find('td').removeClass('edit');
            console.log("Right");

        },
        error:function(){
            alert('Error Adding Customer');
        }
    });

});

$('#previous').on('click',function(){
    $('#table').empty();
    if(page<=totalRecords)
    {
        page = page-1;
        $('#next').prop("disabled",false);
        
        $.ajax({

            type:'GET',
        // http://localhost:8080/customers/?&_page=2&_limit=10
        url:'http://localhost:8080/customers/?&_page='+page+'&_limit=50', 
        success:function(item) {
            $.each(item,function(i,records){
                viewAll(records);
            });
            
        },
        error:function() {
            alert('ERROR on loading Server');
        }
    });
    }
    if(page==1){
        $('#previous').prop("disabled",true);
    }

});

// $('#delet').on('click',function()){
// }
$('#next').on('click',function() {
    $('#table').empty();
    if(page<totalRecords)
    {        
        page=page+1;
        $('#previous').prop("disabled",false);
        $.ajax({

            type:'GET',
        // http://localhost:8080/customers/?&_page=2&_limit=10
        url:'http://localhost:8080/customers/?&_page='+page+'&_limit=50', 
        success:function(item) {
            $.each(item,function(i,records){
                viewAll(records);
            });         
        },
        error:function() {
            alert('ERROR on loading Server');
        }
    });
    }

    if(page==totalRecords)
    {
        $('#next').prop("disabled",true);
    }
});





$('#next1').on('click',function() {
    $('#table').empty();
    if(page<totalRecords)
    {        
        page=page+1;
        $('#previous').prop("disabled",false);
        $.ajax({

            type:'GET',
        // http://localhost:8080/customers/?&_page=2&_limit=10
        url:'http://localhost:8080/customers/?&_page='+page+'&_limit=50', 
        success:function(item) {
            $.each(item,function(i,records){
                viewAll(records);
            });         
        },
        error:function() {
            alert('ERROR on loading Server');
        }
    });
    }

    if(page==totalRecords)
    {
        $('#next1').prop("disabled",true);
    }
});






