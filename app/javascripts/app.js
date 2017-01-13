var account;
var greeter;

function initGreeter() {
  console.log("initGreeter:+");
  if (!greeter) {
    try {
      greeter = Greeter.deployed();
    } catch (err) {
      alert("initGreeter: unable to init greeter, err=" + err);
      return;
    }

    var greeter_events = greeter.GreeterLog();
    greeter_events.watch(function(error, result) {
      if (!error) {
        console.log("GreeterLog: key=" + result.args.key + " data=" + result.args.data);
      } else {
        console.log("GreeterLog: error=" + error);
      }
    });
    console.log("initGreeter:- greeter initialized");
  }
}

function refreshGreeting() {
  console.log("refreshGreeting:+");

  greeter.getGreeting({from: account}).then(function(value) {
    console.log("getGreeting cb: value=" + value);
    var greeting_element = document.getElementById("greeting");
    greeting_element.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
  });

  console.log("refreshGreeting:-");
};

function setGreeting() {
  console.log("setGreeting:+");

  var new_greeting = document.getElementById("new_greeting");
  var greeting = new_greeting.value;
  console.log("setGreeting: greeting=" + greeting);

  // OK
  greeter.setGreeting.sendTransaction(greeting, {from: account}).then(function() {
  //Does nothing if .call is invoked the greeting is not changed but no error occurs
  //greeter.setGreeting.call(greeting, {from: account}).then(function() {
    console.log("setGreeting: successfully set to '" + greeting + "'");
    new_greeting.value = "";
  }).catch(function(e) {
    console.log("setGreeting: e=" + e);
    new_greeting.innerHTML = "Unable to set new greeting";
  })

  console.log("setGreeting:-");
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    account = accs[0];

    initGreeter();
    
    refreshGreeting();
  });
}
