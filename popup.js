$(function () {  
    $("#contactForm").submit(function(){
        var form = $(this);
        var id = form.attr('id');
        var data = form.serialize();
        var actionsTemp = data.replace("=", "");
        actionsTemp = actionsTemp.replace("=", "");
        var actions = actionsTemp.split("&");
               
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: actions });
        });
      });

      $("#reset").on('click', function(){
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "reset" });
        });
      });

      $("#sendMail").on('click', function(e){
          e.preventDefault();
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "sendMail" });
        });
      });
});
