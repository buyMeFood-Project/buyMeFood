// function to set alert message inside alert modal
export function alertModalControl(message){
    event.preventDefault();
    $('#alertContent').html(message);
    $('#alertModal').css('display', 'block');

    $('#alertConfirm').click(function(){
        $('#alertModal').css('display', 'none');
    })
};

// function to set alert message inside alert modal
export function confirmModalControl(message, nextPage, callback){
    event.preventDefault();
    $('#confirmContent').html(message);
    $('#confirmModal').css('display', 'block');

    $('#confirm').click(function(){
        $('#confirmModal').css('display', 'none');
        callback(true);
        window.location.href = nextPage;
    });
    $('#cancel').click(function(){
        $('#confirmModal').css('display', 'none');
        callback(false);
    });
};