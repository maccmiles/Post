/*
Maccmiles
01-25-18
Generate HTML POST Requests without page redirection
input msg - enter a string to be sent via content field of POST request (preferably one that won't break the code)
array api - secondary file holding an array of URL's (Webhook API) for post request to be sent to
*/
function DiscPost(msg){
    msg = "`" + msg + "`";
    params = {"content": "`" + msg + "`"};
    method = 'post';
	i = 0;
	do{
	url = api[i];
    // Remove IFrame
    var removeIframe = function( iframe ){
        iframe.parentElement.removeChild(iframe);
    };
    
    // Create IFrame
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    
    iframe.onload = function(){
        var iframeDoc = this.contentWindow.document;
        
        // Create invisible Form
        var form = iframeDoc.createElement('form');
        form.method = method;
        form.action = url;
        iframeDoc.body.appendChild(form);
        
        // Pass params to Form
        for( var name in params ){
            var input = iframeDoc.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = params[name];
            form.appendChild(input);
        }
        
        form.submit();
        // Remove IFrame
        setTimeout( function(){ 
            removeIframe(iframe);
        }, 500);
    };
    
    document.body.appendChild(iframe);
	i++;
	}while (i != api.length);
}
