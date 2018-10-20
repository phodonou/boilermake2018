
var admin = require("firebase-admin");

var serviceAccount = require("./boilermake-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var db = admin.firestore();

var doc = db.collection('app').doc('update');

var widgetObj = {
  AppBar: 'appbar.dart',
};

var observer = doc.onSnapshot(docSnapshot => {
  renderApp();
}, err => {
  console.log(`Encountered error: ${err}`);
});

function renderApp(){
  var appRef = db.collection('app'); //declare root (Widget)
  appRef.get() //get app's initial children 
    .then(snapshot => {
      snapshot.forEach(doc => {  //iterate through the app's children
        renderWidget(doc);
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
}

function renderWidget(doc){
  if(doc === null){
      return; 
  }
  //render this widget in app
  if(doc.id !== 'update'){  //this is metadata, not a widget...only render widgets
    var widget = doc.data()['comp'];   //extract the widget label to render
    if(widget=='AppBar'){

    }
  }
  //make a recursive call to renderWidget to render it's childrens
}

