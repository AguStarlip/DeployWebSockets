var socket = io();

socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(message, data){
        return (`
            <div class="message">
                <strong>${specialString(message.nickname)}</strong> dice:
                <p>${specialString(message.text)}</p>
            </div>
        `);
    }).join(' ');
    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    scrollAuto(div_msgs);
    
}

function scrollAuto(div_msgs) {
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e){
    var message = {
        nickname: $("#nickname").val().trim(),
        text: $("#text").val().trim()
    };

    document.getElementById('nickname').style.display = 'none';
    if(message.nickname.length > 0 && message.text.length > 0){
        socket.emit('add-message', message);
        $("#text").val("").focus();
    }
    return false;
}

function specialString(str){
    str = str.replace(/</gi, '&lt;');
    str = str.replace(/</gi, '&gt;');
    return str;
}