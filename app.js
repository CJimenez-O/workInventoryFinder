//sudo npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth puppeteer-extra-plugin-adblocker readline
var headless_mode = process.argv[2]

const readline = require('readline');
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const { ifError } = require('assert');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))


runS();


async function run () {
  const browser = await puppeteer.launch({
    headless:(headless_mode !== 'true')? false : true,
    ignoreHTTPSErrors: true,
    slowMo: 0,
    args: ['--window-size=1400,900',
    '--disable-gpu', "--disable-features=IsolateOrigins,site-per-process", '--blink-settings=imagesEnabled=true'
    ]})

  const page = await browser.newPage();


  console.log(`Loading page...`);
  await goto_Page('https://cpr-900226.repairq.io/site/login');

  await page.focus('#UserLoginForm_username')
  await page.keyboard.type('');
  await page.keyboard.press("Tab");
  await page.keyboard.type('');
  await page.keyboard.press("Enter");
  
  await page.waitFor(2000);

  page.waitForSelector('.trigger-note-add');
  const elements = await page.$x('/html/body/div[1]/div/div/ul[2]/li[1]/a');
  await elements[0].click();


  await page.waitFor(3000);

  const fil = await page.$x('/html/body/div[4]/div[2]/div/div/div[2]/div[6]/div[2]/div/form/div/a');
  await fil[0].click();


  await page.waitFor(1000);

  await page.keyboard.type(`status`);
  await page.keyboard.press("Enter");

  
  
  await page.waitFor(1000);
  const stat = await page.$x('/html/body/span/span/div/button[1]');
  await stat[0].click();

  const ap = await page.$x('/html/body/div[4]/div[2]/div/div/div[2]/div[5]/button');
  await ap[0].click();


  await page.waitFor(3000);
  
  const btn = await page.$x('/html/body/div[4]/div[2]/div/div/div[2]/div[6]/div[1]/div[2]/span/span[1]/span/span[2]');
  await btn[0].click();

  await page.waitFor(1000);

  const opt = await page.$x('/html/body/span/span/span[2]/ul/li[3]');
  await opt[0].click();


await page.waitFor(8000);

const time = await page.$x('/html/body/div[4]/div[2]/div/div/div[2]/div[9]/table[2]/thead/tr/th[10]/a');
  await time[0].click();

  await page.waitFor(5000);

  var scan1 = await page.evaluate(() => {
    var buttons = document.querySelectorAll(".wrap-text");
    var btn = [...buttons];
    var btnTxt = btn.map(h => h.textContent.trim().slice(0,15));
        
        const indexesOf = (arr, item) => 
        arr.reduce(
            (acc, v, i) => (v === item && acc.push(i), acc),
            []);
        // name of phone    
        var list = indexesOf(btnTxt, 'Apple iPhone X ');
        
        return list;

    })

    var scan2 = await page.evaluate(() => {
        var buttons = document.querySelectorAll(".wrap-text");
        var btn = [...buttons];
        var btnTxt = btn.map(h => h.innerText);
            
        const indexesOf = (arr, item) => 
        arr.reduce(
            (acc, v, i) => (v === item && acc.push(i), acc),
            []);
        //Name of phone
        var list = indexesOf(btnTxt, 'Apple iPhone X');
            
        return list;
    
        })



var scanT = scan1.concat(scan2);


var tktNum1 = await page.evaluate((scanT) => {
    var buttons = document.querySelectorAll(".wrap-text");
    var tkt = [];
    for (var i = 0; i < scanT.length; i++){
        tkt.push(buttons[scanT[i]].parentNode.innerText.slice(0,7))
    }

    return tkt;

},scanT)


console.log(`${tktNum1.length} repairs in page 1`);


    for(let i = 0; i < tktNum1.length; i++){
        await page.goto(`https://cpr-900226.repairq.io/ticket/${tktNum1[i]}`);
        console.log(`https://cpr-900226.repairq.io/ticket/${tktNum1[i]}`);

        const [el] = await page.$x('/html/body/div[4]/div[2]/div[3]/div[3]/div[2]/div[4]/span');
        const src = await el.getProperty('innerText');
        const txt = await src.jsonValue();

        const [bl] = await page.$x('/html/body/div[4]/div[2]/div[3]/div[3]/div[2]/div[7]/span');
        const src2 = await bl.getProperty('innerText');
        const txt2 = await src2.jsonValue();
        
        console.log(`price: ${txt} balance: ${txt2}`);
     

    } 



  await page.goto(`https://cpr-900226.repairq.io/ticket?Ticket_page=2}`);

  
  await page.waitFor(3000);

  var scan1 = await page.evaluate(() => {
    var buttons = document.querySelectorAll(".wrap-text");
    var btn = [...buttons];
    var btnTxt = btn.map(h => h.textContent.trim().slice(0,15));
        
        const indexesOf = (arr, item) => 
        arr.reduce(
            (acc, v, i) => (v === item && acc.push(i), acc),
            []);
        var list = indexesOf(btnTxt, 'Apple iPhone X ');
        
        return list;

    })

    var scan2 = await page.evaluate(() => {
        var buttons = document.querySelectorAll(".wrap-text");
        var btn = [...buttons];
        var btnTxt = btn.map(h => h.innerText);
            
        const indexesOf = (arr, item) => 
        arr.reduce(
            (acc, v, i) => (v === item && acc.push(i), acc),
            []);
        var list = indexesOf(btnTxt, 'Apple iPhone X');
            
        return list;
    
        })



var scanT = scan1.concat(scan2);





var tktNum1 = await page.evaluate((scanT) => {
    var buttons = document.querySelectorAll(".wrap-text");
    var tkt = [];
    for (var i = 0; i < scanT.length; i++){
        tkt.push(buttons[scanT[i]].parentNode.innerText.slice(0,7))
    }

    return tkt;

},scanT)


console.log(`${tktNum1.length} repairs in page 2`);


    for(let i = 0; i < tktNum1.length; i++){
        await page.goto(`https://cpr-900226.repairq.io/ticket/${tktNum1[i]}`);
        console.log(`https://cpr-900226.repairq.io/ticket/${tktNum1[i]}`);

        const [el] = await page.$x('/html/body/div[4]/div[2]/div[3]/div[3]/div[2]/div[4]/span');
        const src = await el.getProperty('innerText');
        const txt = await src.jsonValue();

        const [bl] = await page.$x('/html/body/div[4]/div[2]/div[3]/div[3]/div[2]/div[7]/span');
        const src2 = await bl.getProperty('innerText');
        const txt2 = await src2.jsonValue();
        console.log(`price: ${txt} balance: ${txt2}`);

    } 


    //////////////////// page 3 ///////////////////////


  await page.goto(`https://cpr-900226.repairq.io/ticket?Ticket_page=3}`);

  
  await page.waitFor(3000);

  var scan1 = await page.evaluate(() => {
    var buttons = document.querySelectorAll(".wrap-text");
    var btn = [...buttons];
    var btnTxt = btn.map(h => h.textContent.trim().slice(0,15));
        
        const indexesOf = (arr, item) => 
        arr.reduce(
            (acc, v, i) => (v === item && acc.push(i), acc),
            []);
        var list = indexesOf(btnTxt, 'Apple iPhone X ');
        
        return list;

    })

    var scan2 = await page.evaluate(() => {
        var buttons = document.querySelectorAll(".wrap-text");
        var btn = [...buttons];
        var btnTxt = btn.map(h => h.innerText);
            
        const indexesOf = (arr, item) => 
        arr.reduce(
            (acc, v, i) => (v === item && acc.push(i), acc),
            []);
        var list = indexesOf(btnTxt, 'Apple iPhone X');
            
        return list;
    
        })



var scanT = scan1.concat(scan2);




var tktNum1 = await page.evaluate((scanT) => {
    var buttons = document.querySelectorAll(".wrap-text");
    var tkt = [];
    for (var i = 0; i < scanT.length; i++){
        tkt.push(buttons[scanT[i]].parentNode.innerText.slice(0,7))
    }

    return tkt;

},scanT)


console.log(`${tktNum1.length} repairs in page 3`);


    for(let i = 0; i < tktNum1.length; i++){
        await page.goto(`https://cpr-900226.repairq.io/ticket/${tktNum1[i]}`);
        console.log(`https://cpr-900226.repairq.io/ticket/${tktNum1[i]}`);

        const [el] = await page.$x('/html/body/div[4]/div[2]/div[3]/div[3]/div[2]/div[4]/span');
        const src = await el.getProperty('innerText');
        const txt = await src.jsonValue();


        const [bl] = await page.$x('/html/body/div[4]/div[2]/div[3]/div[3]/div[2]/div[7]/span');
        const src2 = await bl.getProperty('innerText');
        const txt2 = await src2.jsonValue();
        console.log(`price: ${txt} balance: ${txt2}`);

    } 




    //////////////////// page 4 ///////////////////////


  await page.goto(`https://cpr-900226.repairq.io/ticket?Ticket_page=4}`);

  
  await page.waitFor(3000);

  var scan1 = await page.evaluate(() => {
    var buttons = document.querySelectorAll(".wrap-text");
    var btn = [...buttons];
    var btnTxt = btn.map(h => h.textContent.trim().slice(0,15));
        
        const indexesOf = (arr, item) => 
        arr.reduce(
            (acc, v, i) => (v === item && acc.push(i), acc),
            []);
        var list = indexesOf(btnTxt, 'Apple iPhone X ');
        
        return list;

    })

    var scan2 = await page.evaluate(() => {
        var buttons = document.querySelectorAll(".wrap-text");
        var btn = [...buttons];
        var btnTxt = btn.map(h => h.innerText);
            
        const indexesOf = (arr, item) => 
        arr.reduce(
            (acc, v, i) => (v === item && acc.push(i), acc),
            []);
        var list = indexesOf(btnTxt, 'Apple iPhone X');
            
        return list;
    
        })



var scanT = scan1.concat(scan2);




var tktNum1 = await page.evaluate((scanT) => {
    var buttons = document.querySelectorAll(".wrap-text");
    var tkt = [];
    for (var i = 0; i < scanT.length; i++){
        tkt.push(buttons[scanT[i]].parentNode.innerText.slice(0,7))
    }

    return tkt;

},scanT)


console.log(`${tktNum1.length} repairs in page 4`);


    for(let i = 0; i < tktNum1.length; i++){
        await page.goto(`https://cpr-900226.repairq.io/ticket/${tktNum1[i]}`);
        console.log(`https://cpr-900226.repairq.io/ticket/${tktNum1[i]}`);

        const [el] = await page.$x('/html/body/div[4]/div[2]/div[3]/div[3]/div[2]/div[4]/span');
        const src = await el.getProperty('innerText');
        const txt = await src.jsonValue();


        const [bl] = await page.$x('/html/body/div[4]/div[2]/div[3]/div[3]/div[2]/div[7]/span');
        const src2 = await bl.getProperty('innerText');
        const txt2 = await src2.jsonValue();
        console.log(`price: ${txt} balance: ${txt2}`);

    } 











  async function goto_Page(page_URL){
    try{
      await page.goto(page_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    } catch {
      console.log(`Error in loading page, re-trying...`)
      await goto_Page(page_URL)
    }
  }

  await browser.close()
}






///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// SAMSUNG NOTE 10 //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


async function runS () {
    const browser = await puppeteer.launch({
      headless:(headless_mode !== 'true')? false : true,
      ignoreHTTPSErrors: true,
      slowMo: 0,
      args: ['--window-size=1400,900',
      '--disable-gpu', "--disable-features=IsolateOrigins,site-per-process", '--blink-settings=imagesEnabled=true'
      ]})
  
    const page = await browser.newPage();
  
  
    console.log(`Loading page...`);
    await goto_Page('https://cpr-900226.repairq.io/site/login');
  
    await page.focus('#UserLoginForm_username')
    await page.keyboard.type('');
    await page.keyboard.press("Tab");
    await page.keyboard.type('');
    await page.keyboard.press("Enter");
    
    await page.waitFor(2000);
  
    page.waitForSelector('.trigger-note-add');
    const elements = await page.$x('/html/body/div[1]/div/div/ul[2]/li[1]/a');
    await elements[0].click();
  
  
    await page.waitFor(3000);
  
    const fil = await page.$x('/html/body/div[4]/div[2]/div/div/div[2]/div[6]/div[2]/div/form/div/a');
    await fil[0].click();
  
  
    await page.waitFor(1000);
  
    await page.keyboard.type(`status`);
    await page.keyboard.press("Enter");
  
    
    
    await page.waitFor(1000);
    const stat = await page.$x('/html/body/span/span/div/button[1]');
    await stat[0].click();
  
    const ap = await page.$x('/html/body/div[4]/div[2]/div/div/div[2]/div[5]/button');
    await ap[0].click();
  
  
    await page.waitFor(3000);
    
    const btn = await page.$x('/html/body/div[4]/div[2]/div/div/div[2]/div[6]/div[1]/div[2]/span/span[1]/span/span[2]');
    await btn[0].click();
  
    await page.waitFor(1000);
  
    const opt = await page.$x('/html/body/span/span/span[2]/ul/li[3]');
    await opt[0].click();
  
  
  await page.waitFor(8000);
  
  const time = await page.$x('/html/body/div[4]/div[2]/div/div/div[2]/div[9]/table[2]/thead/tr/th[10]/a');
    await time[0].click();
  
    await page.waitFor(5000);
  
    var scan1 = await page.evaluate(() => {
      var buttons = document.querySelectorAll(".wrap-text");
      var btn = [...buttons];
      var btnTxt = btn.map(h => h.textContent.trim().slice(15,27));
          
          const indexesOf = (arr, item) => 
          arr.reduce(
              (acc, v, i) => (v === item && acc.push(i), acc),
              []);
          // name of phone    
          var list = indexesOf(btnTxt, 'Note 10 Plus ');
          
          return list;
  
      })
  
      var scan2 = await page.evaluate(() => {
          var buttons = document.querySelectorAll(".wrap-text");
          var btn = [...buttons];
          var btnTxt = btn.map(h => h.innerText);
              
          const indexesOf = (arr, item) => 
          arr.reduce(
              (acc, v, i) => (v === item && acc.push(i), acc),
              []);
          //Name of phone
          var list = indexesOf(btnTxt, 'Note 10 Plus');
              
          return list;
      
          })
  
  
  
  var scanT = scan1.concat(scan2);
  
  
  var tktNum1 = await page.evaluate((scanT) => {
      var buttons = document.querySelectorAll(".wrap-text");
      var tkt = [];
      for (var i = 0; i < scanT.length; i++){
          tkt.push(buttons[scanT[i]].parentNode.innerText.slice(0,7))
      }
  
      return tkt;
  
  },scanT)
  
  
  console.log(`${tktNum1.length} repairs in page 1`);
  
  
      for(let i = 0; i < tktNum1.length; i++){
          await page.goto(`https://cpr-900226.repairq.io/ticket/${tktNum1[i]}`);
          console.log(`https://cpr-900226.repairq.io/ticket/${tktNum1[i]}`);
  
          const [el] = await page.$x('/html/body/div[4]/div[2]/div[3]/div[3]/div[2]/div[4]/span');
          const src = await el.getProperty('innerText');
          const txt = await src.jsonValue();
  
          const [bl] = await page.$x('/html/body/div[4]/div[2]/div[3]/div[3]/div[2]/div[7]/span');
          const src2 = await bl.getProperty('innerText');
          const txt2 = await src2.jsonValue();
          
          console.log(`price: ${txt} balance: ${txt2}`);
       
  
      } 
  
  
  
    await page.goto(`https://cpr-900226.repairq.io/ticket?Ticket_page=2}`);
  
    
    await page.waitFor(3000);
  
    var scan1 = await page.evaluate(() => {
      var buttons = document.querySelectorAll(".wrap-text");
      var btn = [...buttons];
      var btnTxt = btn.map(h => h.textContent.trim().slice(0,15));
          
          const indexesOf = (arr, item) => 
          arr.reduce(
              (acc, v, i) => (v === item && acc.push(i), acc),
              []);
          var list = indexesOf(btnTxt, 'Note 10 Plus ');
          
          return list;
  
      })
  
      var scan2 = await page.evaluate(() => {
          var buttons = document.querySelectorAll(".wrap-text");
          var btn = [...buttons];
          var btnTxt = btn.map(h => h.innerText);
              
          const indexesOf = (arr, item) => 
          arr.reduce(
              (acc, v, i) => (v === item && acc.push(i), acc),
              []);
          var list = indexesOf(btnTxt, 'Note 10 Plus');
              
          return list;
      
          })
  
  
  
  var scanT = scan1.concat(scan2);
  
  
  
  
  
  var tktNum1 = await page.evaluate((scanT) => {
      var buttons = document.querySelectorAll(".wrap-text");
      var tkt = [];
      for (var i = 0; i < scanT.length; i++){
          tkt.push(buttons[scanT[i]].parentNode.innerText.slice(0,7))
      }
  
      return tkt;
  
  },scanT)
  
  
  console.log(`${tktNum1.length} repairs in page 2`);
  
  
      for(let i = 0; i < tktNum1.length; i++){
          await page.goto(`https://cpr-900226.repairq.io/ticket/${tktNum1[i]}`);
          console.log(`https://cpr-900226.repairq.io/ticket/${tktNum1[i]}`);
  
          const [el] = await page.$x('/html/body/div[4]/div[2]/div[3]/div[3]/div[2]/div[4]/span');
          const src = await el.getProperty('innerText');
          const txt = await src.jsonValue();
  
          const [bl] = await page.$x('/html/body/div[4]/div[2]/div[3]/div[3]/div[2]/div[7]/span');
          const src2 = await bl.getProperty('innerText');
          const txt2 = await src2.jsonValue();
          console.log(`price: ${txt} balance: ${txt2}`);
  
      } 
  
  
      //////////////////// page 3 ///////////////////////
  
  
    await page.goto(`https://cpr-900226.repairq.io/ticket?Ticket_page=3}`);
  
    
    await page.waitFor(3000);
  
    var scan1 = await page.evaluate(() => {
      var buttons = document.querySelectorAll(".wrap-text");
      var btn = [...buttons];
      var btnTxt = btn.map(h => h.textContent.trim().slice(0,15));
          
          const indexesOf = (arr, item) => 
          arr.reduce(
              (acc, v, i) => (v === item && acc.push(i), acc),
              []);
          var list = indexesOf(btnTxt, 'Note 10 Plus ');
          
          return list;
  
      })
  
      var scan2 = await page.evaluate(() => {
          var buttons = document.querySelectorAll(".wrap-text");
          var btn = [...buttons];
          var btnTxt = btn.map(h => h.innerText);
              
          const indexesOf = (arr, item) => 
          arr.reduce(
              (acc, v, i) => (v === item && acc.push(i), acc),
              []);
          var list = indexesOf(btnTxt, 'Note 10 Plus');
              
          return list;
      
          })
  
  
  
  var scanT = scan1.concat(scan2);
  
  
  
  
  var tktNum1 = await page.evaluate((scanT) => {
      var buttons = document.querySelectorAll(".wrap-text");
      var tkt = [];
      for (var i = 0; i < scanT.length; i++){
          tkt.push(buttons[scanT[i]].parentNode.innerText.slice(0,7))
      }
  
      return tkt;
  
  },scanT)
  
  
  console.log(`${tktNum1.length} repairs in page 3`);
  
  
      for(let i = 0; i < tktNum1.length; i++){
          await page.goto(`https://cpr-900226.repairq.io/ticket/${tktNum1[i]}`);
          console.log(`https://cpr-900226.repairq.io/ticket/${tktNum1[i]}`);
  
          const [el] = await page.$x('/html/body/div[4]/div[2]/div[3]/div[3]/div[2]/div[4]/span');
          const src = await el.getProperty('innerText');
          const txt = await src.jsonValue();
  
  
          const [bl] = await page.$x('/html/body/div[4]/div[2]/div[3]/div[3]/div[2]/div[7]/span');
          const src2 = await bl.getProperty('innerText');
          const txt2 = await src2.jsonValue();
          console.log(`price: ${txt} balance: ${txt2}`);
  
      } 
  
  
  
  
      //////////////////// page 4 ///////////////////////
  
  
    await page.goto(`https://cpr-900226.repairq.io/ticket?Ticket_page=4}`);
  
    
    await page.waitFor(3000);
  
    var scan1 = await page.evaluate(() => {
      var buttons = document.querySelectorAll(".wrap-text");
      var btn = [...buttons];
      var btnTxt = btn.map(h => h.textContent.trim().slice(0,15));
          
          const indexesOf = (arr, item) => 
          arr.reduce(
              (acc, v, i) => (v === item && acc.push(i), acc),
              []);
          var list = indexesOf(btnTxt, 'Note 10 Plus ');
          
          return list;
  
      })
  
      var scan2 = await page.evaluate(() => {
          var buttons = document.querySelectorAll(".wrap-text");
          var btn = [...buttons];
          var btnTxt = btn.map(h => h.innerText);
              
          const indexesOf = (arr, item) => 
          arr.reduce(
              (acc, v, i) => (v === item && acc.push(i), acc),
              []);
          var list = indexesOf(btnTxt, 'Note 10 Plus');
              
          return list;
      
          })
  
  
  
  var scanT = scan1.concat(scan2);
  
  
  
  
  var tktNum1 = await page.evaluate((scanT) => {
      var buttons = document.querySelectorAll(".wrap-text");
      var tkt = [];
      for (var i = 0; i < scanT.length; i++){
          tkt.push(buttons[scanT[i]].parentNode.innerText.slice(0,7))
      }
  
      return tkt;
  
  },scanT)
  
  
  console.log(`${tktNum1.length} repairs in page 4`);
  
  
      for(let i = 0; i < tktNum1.length; i++){
          await page.goto(`https://cpr-900226.repairq.io/ticket/${tktNum1[i]}`);
          console.log(`https://cpr-900226.repairq.io/ticket/${tktNum1[i]}`);
  
          const [el] = await page.$x('/html/body/div[4]/div[2]/div[3]/div[3]/div[2]/div[4]/span');
          const src = await el.getProperty('innerText');
          const txt = await src.jsonValue();
  
  
          const [bl] = await page.$x('/html/body/div[4]/div[2]/div[3]/div[3]/div[2]/div[7]/span');
          const src2 = await bl.getProperty('innerText');
          const txt2 = await src2.jsonValue();
          console.log(`price: ${txt} balance: ${txt2}`);
  
      } 
  
  
  
  
  
  
  
  
  
  
  
    async function goto_Page(page_URL){
      try{
        await page.goto(page_URL, { waitUntil: 'networkidle2', timeout: 30000 });
      } catch {
        console.log(`Error in loading page, re-trying...`)
        await goto_Page(page_URL)
      }
    }
  
    await browser.close()
  }