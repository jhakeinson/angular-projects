angular.module('chadikzApp')
    .controller('TestCtrl', function(ChatEngine) {
        ChatEngine.init({
            publishKey: 'pub-c-c278930d-0f17-4363-ae41-172d6cffc989',
            subscribeKey: 'sub-c-7eb2a6aa-2a14-11e8-8305-f27a6a4e1feb'
        });
        CE = ChatEngine.instance;

        CE.connect('Jhake' + Math.floor(Math.random() * 1000));
        
        CE.on('$.ready', (data) => {
            Me = data.me;

            chat = new CE.Chat('Lobby');

            chat.connect();

            console.log(chat.users);
        });
    });

