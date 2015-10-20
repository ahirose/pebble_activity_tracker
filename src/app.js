var UI = require('ui');
var Accel = require('ui/accel');
var ajax = require('ajax');

//consts
var DATABINID = '4Mqw7Z4_'; //Input your databinID
var INTERVALSEC = 1;
var DATADROPURL = 'https://datadrop.wolframcloud.com/api/v1.0/Add?bin=';

var i = 1;

//Initialize
var main = new UI.Card({
  title: 'Initializing...',
});
main.show();

Accel.init();
main.title('accel data');
main.on('accelData', function(e) {
  main.subtitle( parseInt(Math.pow( (Math.pow(e.accel.x, 2) + Math.pow(e.accel.y,2) + Math.pow(e.accel.z, 2)),0.5 ) ));
  main.body('x=' + e.accel.x + '\n' 
              + 'y=' + e.accel.y + '\n' 
              + 'z=' + e.accel.z + '\n'
              + 'vibe=' + e.accel.vibe + '\n'
              + 'time=' +   e.accel.time + '\n'
             );
  
  if( 0 === i % (INTERVALSEC * 4) ){ 
    i=0;
    ajax(
      {
        url: DATADROPURL + DATABINID +    
          '&x='+e.accel.x+
          '&y='+e.accel.y+
          '&z='+e.accel.z+
          '&vibe='+e.accel.vibe+
          '&time='+e.accel.time,
          type:'json'
      },
      function(data){
        console.log('Succeeded: ' + data);
      },
      function(error) {
        console.log('Download failed: ' + error);
      }
    );}
  i++;
  });