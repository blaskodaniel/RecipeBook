export class Helper {
  constructor() {  }
  
  getDateTime() {
    let date =  new Date();
    let aktdate = date.getFullYear()+"."
    +(date.getMonth()+1)+"."
    +date.getDate()+" "
    +date.getHours()+":"
    +date.getMinutes()+":"
    +date.getSeconds()+":"
    +date.getMilliseconds();

    console.log(aktdate);
    return aktdate;
  }

}
