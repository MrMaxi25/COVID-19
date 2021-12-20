const incubationPeriod = 10;
const quarantinePeriod = 10;

let ifPossible;
let writeIfPossible;
let endOfIsolation;
let toEnd;

let infectedPersonData = {
    contactDate,
    symptomsOccuredDate,
    testDate,
    actualDate
}

function setData()
{
    infectedPersonData.contactDate = document.getElementById("contactDate").value;
    infectedPersonData.symptomsOccuredDate = document.getElementById("symptomsOccuredDate").value;
    infectedPersonData.testDate =  document.getElementById("testDate").value;
    infectedPersonData.actualDate = document.getElementById("actualDate").value;
}

function callFunctions()
{
    if (infectedPersonData.contactDate != '' && infectedPersonData.symptomsOccuredDate != ''
    && infectedPersonData.testDate != '' && infectedPersonData.actualDate != '')
    {
        if (infectedPersonData.contactDate > infectedPersonData.symptomsOccuredDate)
        {
            alert('Data kontaktu musi być wcześniejsza od daty wystąpienia pierwszych objawów!');
        }
        else if (infectedPersonData.symptomsOccuredDate > infectedPersonData.testDate)
        {
            alert('Data wystąpienia pierwszych objawów musi być wcześniejsza od daty testu!');
        }
        else if (infectedPersonData.actualDate < infectedPersonData.contactDate
            || infectedPersonData.actualDate < infectedPersonData.symptomsOccuredDate
            || infectedPersonData.actualDate < infectedPersonData.testDate)
        {
            alert('Aktualna data musi być najpóźniejszą datą!');
        }
        else
        {
            howLong(infectedPersonData.testDate, quarantinePeriod);      
            calculateTimeToEnd(infectedPersonData.actualDate, infectedPersonData.testDate);
            checkIfPossible(infectedPersonData.symptomsOccuredDate, infectedPersonData.contactDate);           
            window.open("raport.html", "_self");  
        }       
    }
}

function passData()
{
    if (ifPossible == true)
    {
        writeIfPossible = "Osoba mogła się zarazić!";
    }
    else
    {
        writeIfPossible = "Osoba nie mogła się zarazić!";
    }

    alert(writeIfPossible);
    alert("Koniec izolacji: " + endOfIsolation);
    alert("Do końca izolacji pozostało " + toEnd + " dni");

    document.getElementById("writeIfPossible").innerHTML = writeIfPossible;
    document.getElementById("endOfIsolation").innerHTML = endOfIsolation;
    document.getElementById("toEnd").innerHTML = toEnd;
    
}

function calculateTimeToEnd(actualDate, testDate)
{
    actualDate = new Date(actualDate);
    testDate = new Date(testDate);
    var diffTime = actualDate.getTime() - testDate.getTime();
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    toEnd = quarantinePeriod - diffDays;
    return toEnd;
}

function addDays(date, days)
{
    var sumResult = new Date(date);
    sumResult.setDate(sumResult.getDate() + days);
    return sumResult;
}

function checkIfPossible(symptomsOccuredDate, contactDate)
{
    symptomsOccuredDate = new Date(symptomsOccuredDate);
    contactDate = new Date(contactDate);
    var diffTime = symptomsOccuredDate.getTime() - contactDate.getTime();
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 10)
    {        
        ifPossible = true;  
    }
    else
    {  
        ifPossible = false;      
    }  
    passData();   
    return ifPossible;
}

function howLong(testDate, quarantinePeriod)
{
    endOfIsolation = addDays(testDate, quarantinePeriod);
    return endOfIsolation;
}

