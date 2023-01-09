function showForm(){

	document.getElementById('hide1').setAttribute("style", "display: none;");
	document.getElementById('initialForm').removeAttribute("style");
}

var propertyPrice;
var deposit;
var interest = 0.03;
var years = 25;
var durationMonths = years*12;

var curretPosition="right";
function animateEscape(){
	if (curretPosition == "right"){
		document.getElementById("animationPlugIn").setAttribute("href", "moveLeft.css");
		curretPosition = "left";
	}
	else if(curretPosition == "left"){
		document.getElementById("animationPlugIn").setAttribute("href", "moveBack.css");
		curretPosition="right";
	}
}
function calculateMorgage(increase=false){
	// formula optained from https://calculator.mga.edu/1001_mortgage/monthly_payment.html
	// last opened on 7th January 2023 at 22:30 
	if(increase){interest+=0.03;}
	var nominator = (propertyPrice-deposit)*(interest/12);
	var denominator = 1-Math.pow((1+(interest/12)), -durationMonths);
	var monthlyPayment = nominator/denominator;
	monthlyPayment = Math.round(monthlyPayment * 100) / 100;
	if(increase){interest-=0.03;}
	return monthlyPayment;
}
function setInitialSliders(){
	document.getElementById("alterPropertyPrice").setAttribute("value", propertyPrice);
	document.getElementById("alterPropertyPriceSlider").setAttribute("value", propertyPrice);
	document.getElementById("alterPropertyPriceSlider").setAttribute("min", propertyPrice/2);
	document.getElementById("alterPropertyPriceSlider").setAttribute("max", propertyPrice*2);

	document.getElementById("alterDeposit").setAttribute("value", deposit);
	document.getElementById("alterDepositSlider").setAttribute("value", deposit);
	document.getElementById("alterDepositSlider").setAttribute("min", deposit/2);
	document.getElementById("alterDepositSlider").setAttribute("max", deposit*2);

	document.getElementById("alterYear").setAttribute("value", years);
	document.getElementById("alterYearSlider").setAttribute("value", years);
	document.getElementById("alterYearSlider").setAttribute("min", 5);
	document.getElementById("alterYearSlider").setAttribute("max", 55);

	document.getElementById("alterInterest").setAttribute("value", interest*100);
	document.getElementById("alterInterestSlider").setAttribute("value", interest*100);
	document.getElementById("alterInterestSlider").setAttribute("min", 1);
	document.getElementById("alterInterestSlider").setAttribute("max", 25);

}

function propertyPriceUpdate(){
	var newValue = document.getElementById("alterPropertyPriceSlider").value;
	propertyPrice = newValue;
	document.getElementById("alterPropertyPrice").setAttribute("value", propertyPrice);
	document.getElementById("monthlyPaymentResult").innerHTML = "£"+calculateMorgage();
	document.getElementById("warningRate").innerHTML = "£"+calculateMorgage(true);
}

function depositUpdate(){
	var newValue = document.getElementById("alterDepositSlider").value;
	deposit = newValue;
	document.getElementById("alterDeposit").setAttribute("value", deposit);
	document.getElementById("monthlyPaymentResult").innerHTML = "£"+calculateMorgage();
	document.getElementById("warningRate").innerHTML = "£"+calculateMorgage(true);	
}

function yearsUpdate(){
	var newValue = document.getElementById("alterYearSlider").value;
	years = newValue;
	durationMonths = years*12;
	document.getElementById("alterYear").setAttribute("value", years);
	document.getElementById("monthlyPaymentResult").innerHTML = "£"+calculateMorgage();
	document.getElementById("warningRate").innerHTML = "£"+calculateMorgage(true);		
}

function interestUpdate(){
	var newValue = document.getElementById("alterInterestSlider").value;
	interest = newValue/100;
	document.getElementById("alterInterest").setAttribute("value", interest*100);
	document.getElementById("monthlyPaymentResult").innerHTML = "£"+calculateMorgage();
	document.getElementById("warningRate").innerHTML = "£"+calculateMorgage(true);		
}
function validateInitialButton(continueToForm=false){
	var valid = true;
	var inputValue = document.getElementById('propertyPrice').value;
	if((inputValue == null) || inputValue == ""){
		valid=false;
		document.getElementById('propertyPrice').setAttribute("class", "form-control invalidField");
		}
	else{
		document.getElementById('propertyPrice').setAttribute("class", "form-control");
	}
	inputValue = document.getElementById('deposit').value;
	if((inputValue == null) || inputValue == ""){
		valid=false;
		document.getElementById('deposit').setAttribute("class", "form-control invalidField");
	}
	else{
		document.getElementById('deposit').setAttribute("class", "form-control");
	}
	if(valid && continueToForm){
		propertyPrice = document.getElementById('propertyPrice').value;
		deposit = document.getElementById('deposit').value;
		document.getElementById("initialForm").setAttribute("style", "display: none;");
		document.getElementById("cheekyQuote").setAttribute("style", "display: none;");

		document.getElementById("monthlyPaymentResult").innerHTML = "£"+calculateMorgage();
		interest = 0.06;
		document.getElementById("warningRate").innerHTML = "£"+calculateMorgage();
		document.getElementById("results").removeAttribute("style");
		interest = 0.03;
		setInitialSliders();

	}
	if(!valid){animateEscape();}

}
function changeFontSize(){
	var newFontSize = document.getElementById("fontSelect").value;
	document.getElementById("fontSizeVar").setAttribute("style", "font-size: "+newFontSize+"px;");
}

var currentState = "day";
function nightDay(){
	if(currentState == "day"){
		document.getElementById("nightDayBtn").innerHTML = "Switch Back to Light Mode";
		document.getElementById("plugNightMode").setAttribute("href", "nightmode.css");
		currentState = "night";
	}
	else{
		document.getElementById("nightDayBtn").innerHTML = "Enable Night Mode";
		document.getElementById("plugNightMode").removeAttribute("href");
		currentState = "day";
	}
}
