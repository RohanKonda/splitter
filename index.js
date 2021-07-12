$(document).ready(function() {
  var amount = 0;
  var tip_percent = 0;
  var previous_tip_btn = "";
  var people = 0;

  $( "#five-percent" ).on( "click", function() {

    setTipPercent(5,this.id);

  });

  $( "#ten-percent" ).on( "click", function() {
    setTipPercent(10,this.id);

  });

  $( "#fifteen-percent" ).on( "click", function() {
    setTipPercent(15,this.id);
  });

  $( "#twentyfive-percent" ).on( "click", function() {
    setTipPercent(25,this.id);
  });

  $( "#fifty-percent" ).on( "click", function() {
    setTipPercent(50,this.id);

  });

  $( "#custom-percent" ).keyup(function() {
    setTipPercent($( "#custom-percent" ).val());
    calculateTip();

  });


  $( "#people-count" ).keyup(function() {
      people = $( "#people-count" ).val();
    if(people != null && people > 0 ){
      $("#validation-msg").hide();
      toggleResetBtn(false);
      calculateTip();

    }else{
      $("#validation-msg").show();
      if(tip_percent === 0)
      toggleResetBtn(true);
    }

  });

  $( "#bill-amount" ).keyup(function() {
    amount = $( "#bill-amount" ).val();
console.log(amount);
    if(amount > 0 || amount === null){
      toggleResetBtn(false);
      calculateTip();
    }else{
        if(tip_percent === 0)
      toggleResetBtn(true);
    }


  });

  function setTipPercent(percent,buttonId){

    tip_percent = parseInt(percent);

    if(previous_tip_btn===""){
    $("#"+buttonId).toggleClass("btn-light-pressed");
    previous_tip_btn = buttonId;
  }else{
    $("#"+previous_tip_btn).toggleClass("btn-light-pressed");
    $("#"+buttonId).toggleClass("btn-light-pressed");
    previous_tip_btn = buttonId;
  }

    if(tip_percent > 0){
      toggleResetBtn(false);
      calculateTip();
    }else{
      toggleResetBtn(true);
    }

  }

  function toggleResetBtn(value){
if(value)
    $("#resetBtn").attr("disabled", true);
    else
    $("#resetBtn").removeAttr("disabled");
  }


  function calculateTip(){

let total = 0.00;
let tip_per_person = 0.00;
    if(amount > 0 && people >0 && tip_percent === 0){

      total = amount/people;


    }else if(amount > 0 && people >0 && tip_percent > 0){
      let tip_amount = 0.00;
      tip_amount = (tip_percent * amount * 0.01);
      console.log(tip_amount);
      tip_per_person = tip_amount / people;


      total = ((parseInt(amount)+parseInt(tip_amount)) / people);

    }else if(amount > 0 && people === 0 && tip_percent > 0){
        total = 0;
        tip_per_person = 0;
    }
total = total.toFixed(2);
tip_per_person = tip_per_person.toFixed(2);
    $("#total-amount").text("$"+total);
    $("#tip-amount").text("$"+tip_per_person);

  }

  $( "#resetBtn" ).on( "click", function() {
    $( "#bill-amount" ).val("");
      $( "#people-count" ).val("");
      $( "#custom-percent" ).val("");
      $("#"+previous_tip_btn).toggleClass("btn-light-pressed");
      previous_tip_btn = "";
      amount = 0;
      tip_percent = 0;
      people = 0;
      $("#total-amount").text("$0.00");
      $("#tip-amount").text("$0.00");
     toggleResetBtn(true);

  });

});
