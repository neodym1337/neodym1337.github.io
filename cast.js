window.debug = true;

function checkDebug() {
    if (window.debug) {
        document.getElementById('debug').style.display = 'block';
        document.getElementById('maze').style.margin = '30px';
    } else {
        document.getElementById('debug').style.display = 'none';
        document.getElementById('maze').style.margin = '30px auto';
    }
}

$(document).ready(function () {

    // TODO: 1. ------------------ Get castreceiver manager 
    //window.castReceiverManager = {}; // TODO get CastReceiverManager
    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

    
	log('Starting receiver manager');

    cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);

   

    window.castReceiverManager.onReady = function (event) {
        log('Received ready event ' + JSON.stringify(event.data));
        window.castReceiverManager.setApplicationState("Application status is ready...");
    };

   //TODO: 2. ------------------ Get castReceiverManager message bus
    //window.messageBus = window.castReceiverManager.getCastMessageBus('urn:x-cast:se.johan.workshop.cast.maze');
    window.messageBus = window.castReceiverManager.getCastMessageBus('urn:x-cast:fr.xebia.workshop.cast.maze');

    //window.castReceiverManager.getCastMessageBus('urn:x-cast:fr.xebia.workshop.cast.maze');

 
    

    /**
     * If provided, it processes the 'senderconnected' event.
     * Called to process the 'senderconnected' event.
     * @param {cast.receiver.CastReceiverManager.Event} event - can be null
     *
     */
    window.castReceiverManager.onSenderConnected = function(event) {
    
    	// TODO: 4. ------------------onSenderConnected call addPlayer(<id>)
        log('Received sender connected event ' + event.data);
        addPlayer(event.senderId);

    }

    /**
     * When sender disconnect
     * @param event
     */
    window.castReceiverManager.onSenderDisconnected = function (event) {
        log('Received sender disconnected event ' + event.data);
        removePlayer(event.senderId);
        if (window.castReceiverManager.getSenders().length == 0) {
            window.close();
        }
    };

    /**
     * When message received
     * @param event object
     */
    window.messageBus.onMessage = function (event) {
        log('Message [' + event.senderId + '] ' + event.data);
        //  TODO: 5 ------------------call method to move player with direction
        handleMessage(event.data, event.senderId); 
    };


      /**
     * Application config
     **/
    var appConfig = new cast.receiver.CastReceiverManager.Config();

    /**
     * Text that represents the application status. It should meet
     * internationalization rules as may be displayed by the sender application.
     * @type {string|undefined}
     **/
    appConfig.statusText = 'Ready to play';

    /**
     * Maximum time in seconds before closing an idle
     * sender connection. Setting this value enables a heartbeat message to keep
     * the connection alive. Used to detect unresponsive senders faster than
     * typical TCP timeouts. The minimum value is 5 seconds, there is no upper
     * bound enforced but practically it's minutes before platform TCP timeouts
     * come into play. Default value is 10 seconds.
     * @type {number|undefined}
     **/
    appConfig.maxInactivity = 6000; // 10 minutes for testing, use default 10sec in prod by not setting this value

    /**
     * Start receiver
     * Initializes the system manager. The application should call this method when
     * it is ready to start receiving messages, typically after registering
     * to listen for the events it is interested on.
     */
 
    // TODO: 3. ------------------ start CastReceiverManager

    window.castReceiverManager.start(appConfig);


  
    log('Receiver manager started');

    /**
     * Misc method to log into console box in web view
     * @param msg message to log
     */
    function log(msg) {
        if (window.debug) {
            var debug = document.getElementById('debug');
            var tmpHTML = debug.innerHTML;
            debug.innerHTML = '';
            debug.innerHTML = msg + '<br/>' + tmpHTML;
        }
    }
});