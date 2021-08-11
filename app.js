function checkPal(){
  const bday = document.querySelector('.birth-day').value;
  if(bday == ''){
    document.querySelector('.result').innerHTML='Please enter date';
    return 1;
  }
  var bdayarr = bday.split('-'); 
  var bdayobj = { 'year':bdayarr[0], 'month':bdayarr[1], 'day':bdayarr[2]};
  var months= ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  
  var bdaycomb = getDates(bdayobj);

  if(palindrome(bdaycomb) == 1){
    
    document.querySelector('.result').innerHTML='Yay! your birthday is a palindrome!!';
  }
  else{
    var nextDate = bdayobj;
    var cnt=0
    while(1){
      nextDate = getnextDate(nextDate);
      bdaycomb = getDates(nextDate);
      cnt+=1;
      if(palindrome(bdaycomb) == 1){
        break;
      }
    }
    document.querySelector('.result').innerHTML='Nearest palindrome date is '+ nextDate.day+' '+months[parseInt(nextDate.month)-1]+' '+nextDate.year+'<br>You missed it by '+cnt+' days.';
  }
}


function palindrome(bdaycomb){
  for(dateStr in bdaycomb){
    if (bdaycomb[dateStr] == bdaycomb[dateStr].split('').reverse().join('')){
      return 1
    }
  }
  return 0 
}


function getDates(bdayobj){
  var bdaycomb =[ bdayobj['year']+bdayobj['month']+bdayobj['day'], 
                  bdayobj['day']+bdayobj['month']+bdayobj['year'],
                  bdayobj['month']+bdayobj['day']+bdayobj['year'],
                  bdayobj['year'][2]+bdayobj['year'][3]+bdayobj['month']+bdayobj['day'],
                  bdayobj['day']+bdayobj['month']+bdayobj['year'][2]+bdayobj['year'][3],
                  bdayobj['month']+bdayobj['day']+bdayobj['year'][2]+bdayobj['year'][3]
                ];
  return bdaycomb;
}


function getnextDate(nextDate){
  var monthDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 30];

  //leap year
  if((parseInt(nextDate.year)%4==0 || parseInt(nextDate.year)%400==0) && parseInt(nextDate.year)%100!=0){
    monthDays[1] = 29;
  }
  
  nextDate.day = String(parseInt(nextDate.day)+1);

  if (parseInt(nextDate.day) > monthDays[parseInt(nextDate.month - 1)]){
    nextDate.day='1'
    nextDate.month = String(parseInt(nextDate.month)+1);
    

    if(parseInt(nextDate.month) > 12){
      nextDate.year = String(parseInt(nextDate.year)+1)
      nextDate.month = '1'
    }
  }
  
  if(parseInt(nextDate.day) <= 9){
    nextDate.day = '0' + nextDate.day;
  }
  if(parseInt(nextDate.month) <= 9){
    nextDate.month = '0' + nextDate.month;
  }
  if(parseInt(nextDate.year) <= 9){
    nextDate.year = '0' + nextDate.year;
  }

  return nextDate;
}