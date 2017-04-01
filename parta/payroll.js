(function payCalc()
{    
	var hours = parseInt(window.prompt("How many hours did this employee works? \n"  +  "Enter '-1' to exit.")); 
	var employee_number = 0;
	var overtime = 40;               
	var pay = 0;                         
	var total = 0;
    	while (hours >=0){
		employee_number += 1;	
		if (hours > overtime) 
			pay = (overtime * 15) + 1.5 * (hours - overtime) * 15;
		else
			pay = 15 * hours;

		document.write("<tr><td>" + employee_number + "</td><td>" + hours + "</td><td> $" + pay + "</td></tr>");
		total += pay;
		
		hours = parseInt(window.prompt("How many hours did this employee work?\n"  +  "Enter '-1' to exit.")); 	
	}
	document.write("</tbody>");
	document.write("</table>");
    document.write("<font color='red' size=5 face='arial'>");
	document.write("<p> <center> The total pay of all the employees: $" + total + "." +" </center></p> </font>");
	if (employee_number == 0 && hours == -1)	
	 {
	   document.write("<font color='red' size=5 face='arial' font-weight: 'bold'>");
	   document.write("<p> <center> You have not entered any employee information </center></p> </font>");
	 }
}());
